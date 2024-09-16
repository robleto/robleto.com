import { Client } from "@notionhq/client";
import {
	PageObjectResponse,
	PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Type guard to ensure we're working with PageObjectResponse
const isPageObjectResponse = (page: any): page is PageObjectResponse => {
	return "properties" in page;
};

// A helper function to extract the title or fallback to "No Title"
const extractTitle = (page: PageObjectResponse) => {
	const titleProperty = page.properties.Name;

	if (titleProperty && titleProperty.type === "title") {
		return titleProperty.title[0]?.plain_text || "No Title";
	}
	return "No Title";
};

// A helper function to extract the description or fallback to "No Description"
const extractDescription = (page: PageObjectResponse) => {
	const descriptionProperty = page.properties.Description;

	if (descriptionProperty && descriptionProperty.type === "rich_text") {
		return descriptionProperty.rich_text[0]?.plain_text || "No Description";
	}
	return "No Description";
};

// Function to fetch database entries
export async function getDatabaseEntries(databaseId: string) {
	const response = await notion.databases.query({
		database_id: databaseId,
	});

	return response.results
		.filter(isPageObjectResponse)
		.map((page: PageObjectResponse) => ({
			id: page.id,
			title: extractTitle(page),
			description: extractDescription(page),
		}));
}

// Function to get the content of a Notion page
export const getPageContent = async (pageId: string) => {
	try {
		const response = await notion.blocks.children.list({
			block_id: pageId,
		});
		return response.results;
	} catch (error) {
		console.error("Error fetching page content from Notion:", error);
		return [];
	}
};
