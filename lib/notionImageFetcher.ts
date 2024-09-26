const { Client } = require("@notionhq/client");
const {
	PageObjectResponse,
} = require("@notionhq/client/build/src/api-endpoints");

const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function getLibraryImages() {
	const databaseId = process.env.NOTION_LIBRARY_DB_ID;
	if (!databaseId) {
		throw new Error("NOTION_LIBRARY_DB_ID is not defined");
	}
	const response = await notion.databases.query({
		database_id: databaseId,
	});

	const imageUrls = response.results
		.filter(
			(entry: { properties: { Image: { type: string; files: string | any[]; }; }; }) =>
				"properties" in entry &&
				entry.properties.Image.type === "files" &&
				"files" in entry.properties.Image &&
				Array.isArray(entry.properties.Image.files) &&
				entry.properties.Image.files.length > 0
		)
		.map((entry: { properties: { Image: { files: any[]; }; }; }) => {
			const file = entry.properties.Image.files[0];
			if ("external" in file) {
				return file.external.url; // Extract external image URL
			}
			throw new Error("Expected external URL but got something else");
		});

	return imageUrls;
}

module.exports = { getLibraryImages };
