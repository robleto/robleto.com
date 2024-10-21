import { Client } from "@notionhq/client"; // Import the Notion client
import fs from "fs";
import path from "path";
import https from "https";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

console.log("Script started");
console.log("Notion API Key:", process.env.NOTION_API_KEY);
console.log("Notion Database ID:", process.env.NOTION_TRAVEL_DB_ID);

const notion = new Client({ auth: process.env.NOTION_API_KEY }); // Define the Notion client

async function getAllTravelImages() {
	console.log("Fetching images from Notion...");
	const databaseId = process.env.NOTION_TRAVEL_DB_ID!;
	let results: any[] = [];
	let hasMore = true;
	let nextCursor: string | null = null;

	while (hasMore) {
		const response: {
			results: any[];
			has_more: boolean;
			next_cursor: string | null;
		} = await notion.databases.query({
			database_id: databaseId,
			start_cursor: nextCursor || undefined, // Pagination cursor
		});
		results = results.concat(response.results);
		hasMore = response.has_more;
		nextCursor = response.next_cursor;
	}

	console.log("Received all pages from Notion.");

	return results
		.filter((entry: any) => entry.properties.Image?.files?.length)
		.map((entry: any) => {
			const file = entry.properties.Image.files[0];
			const slug =
				entry.properties.Slug?.rich_text?.[0]?.plain_text || "untitled"; // Using slug for image name
			const slugFormatted = slug
				.toLowerCase()
				.replace(/\s+/g, "-")
				.replace(/[\/\\?%*:|"<>]/g, "-");

			if (file.type === "file") {
				return { url: file.file.url, slug: slugFormatted }; // Internal file URL with slug
			} else if (file.type === "external") {
				return { url: file.external.url, slug: slugFormatted }; // External URL with slug
			} else {
				console.log(`No valid image found for entry: ${entry.id}`);
				return null;
			}
		})
		.filter(Boolean); // Remove null values
}

function downloadImage(url: string, destination: string) {
	return new Promise<void>((resolve, reject) => {
		const file = fs.createWriteStream(destination);
		https
			.get(url, (response) => {
				if (response.statusCode !== 200) {
					console.log(
						`Failed to get '${url}' (${response.statusCode}). Skipping this image.`
					);
					file.close(); // Close the stream even if it's not used
					resolve(); // Resolve to allow the script to continue
					return;
				}

				response.pipe(file);

				file.on("finish", () => {
					file.close(() => resolve());
				});

				file.on("error", (err) => {
					fs.unlink(destination, () => {
						console.log(
							`Error downloading image from '${url}': ${err.message}`
						);
						resolve(); // Resolve even on error to allow continuation
					});
				});
			})
			.on("error", (err) => {
				console.log(
					`Error downloading image from '${url}': ${err.message}`
				);
				resolve(); // Resolve to continue with the next image
			});
	});
}

async function downloadImages() {
	const publicPath = path.join(process.cwd(), "public", "lists/travel");

	if (!fs.existsSync(publicPath)) {
		fs.mkdirSync(publicPath, { recursive: true });
		console.log("Created travel directory.");
	}

	try {
		const images = await getAllTravelImages();
		if (images) {
			console.log(`Found ${images.length} images. Starting download...`);
		} else {
			console.log("No images found to download.");
		}

		// Get the list of files already in the folder
		const existingFiles = fs
			.readdirSync(publicPath)
			.map((file) => file.toLowerCase());

		if (images) {
			await Promise.all(
				images
					.filter(
						(image): image is { url: string; slug: string } =>
							image !== null
					)
					.filter(
						({ slug }) => !existingFiles.includes(`${slug}.jpg`)
					) // Skip if the file already exists
					.map(({ url, slug }) =>
						downloadImage(url, path.join(publicPath, `${slug}.jpg`))
					)
			);
		} else {
			console.log("No images found to download.");
		}
		console.log("Images downloaded successfully!");
	} catch (error) {
		console.error("Error downloading images:", error);
	}
}

downloadImages();
