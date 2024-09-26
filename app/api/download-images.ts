// /app/api/download-images/route.ts
import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import fs from "fs";
import path from "path";
import https from "https";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function getLibraryImages() {
	const databaseId = process.env.NOTION_LIBRARY_DB_ID;
	if (!databaseId) {
		throw new Error("NOTION_LIBRARY_DB_ID is not defined");
	}
	const response = await notion.databases.query({
		database_id: databaseId,
	});
	return response.results.map(
		(entry: any) => entry.properties.Image.files[0].file.url
	);
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

export async function GET() {
	const publicPath = path.join(process.cwd(), "public", "library");
	if (!fs.existsSync(publicPath)) {
		fs.mkdirSync(publicPath, { recursive: true });
	}

	try {
		const images = await getLibraryImages();
		await Promise.all(
			images.map((url, index) =>
				downloadImage(url, path.join(publicPath, `image-${index}.jpg`))
			)
		);
		return NextResponse.json({ message: "Images downloaded successfully" });
	} catch (error) {
		return NextResponse.json(
			{ message: "Failed to download images", error },
			{ status: 500 }
		);
	}
}
