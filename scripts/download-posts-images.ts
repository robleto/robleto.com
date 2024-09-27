import { Client } from "@notionhq/client";
import fs from "fs";
import path from "path";
import https from "https";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

console.log("Script started");
console.log("Notion API Key 1:", process.env.NOTION_API_KEY);
console.log("Notion Database ID 1:", process.env.NOTION_POSTS_DB_ID);

const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function getPostsImages() {
	console.log("Fetching images from Notion...");
	const databaseId = process.env.NOTION_POSTS_DB_ID!;
	const response = await notion.databases.query({ database_id: databaseId });
	console.log("Received response from Notion.");

	return response.results
		.filter((entry: any) => entry.properties.Image?.files?.length)
		.map((entry: any) => {
			console.log(
				"Full Entry Properties:",
				JSON.stringify(entry.properties, null, 2)
			);

			const file = entry.properties.Image.files[0];
			const slug =
				entry.properties.Slug?.rich_text[0]?.plain_text || "untitled"; // Use "Slug" instead of "Name"
			const slugFormatted = slug.toLowerCase().replace(/\s+/g, "-");

			if (file.type === "file") {
				return { url: file.file.url, title: slugFormatted }; // Internal file URL with slug
			} else if (file.type === "external") {
				return { url: file.external.url, title: slugFormatted }; // External URL with slug
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
		https.get(url, (response) => {
			response.pipe(file);
			file.on("finish", () => resolve());
			file.on("error", reject);
		});
	});
}

async function downloadImages() {
	const publicPath = path.join(process.cwd(), "public", "posts");

	if (!fs.existsSync(publicPath)) {
		fs.mkdirSync(publicPath, { recursive: true });
		console.log("Created posts directory.");
	}

	try {
		const images = await getPostsImages();
		console.log(`Found ${images.length} images. Starting download...`);
		await Promise.all(
			images
				.filter(
					(image): image is { url: string; title: string } =>
						image !== null
				)
				.map(({ url, title }) =>
					downloadImage(url, path.join(publicPath, `${title}.png`))
				)
		);
		console.log("Images downloaded successfully!");
	} catch (error) {
		console.error("Error downloading images:", error);
	}
}

downloadImages();
