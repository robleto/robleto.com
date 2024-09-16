import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Function to get data from the Projects database
export const getProjects = async () => {
	const databaseId = process.env.NOTION_PROJECTS_DB_ID;
	const response = await notion.databases.query({
		database_id: databaseId!,
	});
	return response.results;
};

// Function to get the content of a Notion page
export const getPageContent = async (pageId: string) => {
	try {
		const response = await notion.blocks.children.list({
			block_id: pageId,
		});
		console.log("Fetched page content:", response.results);
		return response.results;
	} catch (error) {
		console.error("Error fetching page content from Notion:", error);
		return [];
	}
};
