import { Client } from "@notionhq/client";
import fs from "fs";
import path from "path";
import https from "https";
import http from "http"; // Import http module as well
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

console.log("Script started");
console.log("Notion API Key 1:", process.env.NOTION_API_KEY);
console.log("Notion Database ID 1:", process.env.NOTION_BOARDGAMES_DB_ID);

const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function getAllPages(databaseId: string) {
	let results: any[] = [];
	let hasMore = true;
	let startCursor = undefined;

	while (hasMore) {
		const response = await notion.databases.query({
			database_id: databaseId,
			start_cursor: startCursor ?? undefined,
		});

		results = results.concat(response.results);
		hasMore = response.has_more;
		startCursor = response.next_cursor;
	}

	return results;
}

async function getBoardGamesImages() {
	console.log("Fetching images from Notion...");
	const databaseId = process.env.NOTION_BOARDGAMES_DB_ID!;

	const entries = await getAllPages(databaseId);
	console.log("Received response from Notion.");

	return entries
		.filter((entry: any) => entry.properties.Image?.files?.length)
		.map((entry: any) => {
			console.log(
				"Full Entry Properties:",
				JSON.stringify(entry.properties, null, 2)
			);

			const file = entry.properties.Image.files[0];
			const slug =
				entry.properties.Slug?.rich_text?.[0]?.plain_text || "untitled";
			const slugFormatted = slug.toLowerCase().replace(/\s+/g, "-");

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
		const protocol = url.startsWith("https") ? https : http; // Choose the correct protocol
		const file = fs.createWriteStream(destination);

		protocol
			.get(url, (response) => {
				response.pipe(file);
				file.on("finish", () => resolve());
				file.on("error", reject);
			})
			.on("error", (error) => {
				reject(error);
			});
	});
}

async function downloadImages() {
	const publicPath = path.join(process.cwd(), "public", "lists/board-games");

	if (!fs.existsSync(publicPath)) {
		fs.mkdirSync(publicPath, { recursive: true });
		console.log("Created boardGames directory.");
	}

	try {
		const images = await getBoardGamesImages();
		console.log(`Found ${images.length} images. Starting download...`);
		await Promise.all(
			images
				.filter(
					(image): image is { url: string; slug: string } =>
						image !== null
				)
				.map(({ url, slug }) =>
					downloadImage(url, path.join(publicPath, `${slug}.jpg`))
				)
		);
		console.log("Images downloaded successfully!");
	} catch (error) {
		console.error("Error downloading images:", error);
	}
}

downloadImages();
