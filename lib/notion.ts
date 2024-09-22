import { Client } from "@notionhq/client";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"; // Import block types

// Initialize the Notion client with the API key
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Fetch data from a Notion database (e.g., Projects or Library)
export const getDatabaseEntries = async (databaseId: string): Promise<any[]> => {
	try {
		let results: any[] = [];
		let hasMore = true;
		let nextCursor: string | undefined = undefined;

		while (hasMore) {
			const response = await notion.databases.query({
				database_id: databaseId,
				start_cursor: nextCursor ?? undefined,
			});

			results = [...results, ...response.results]; // Append the results

			// Check if there are more pages to fetch
			hasMore = response.has_more;
			nextCursor = response.next_cursor!;
		}

		return results;
	} catch (error) {
		console.error("Error fetching database entries:", error);
		return [];
	}
};

// Fetch content of a specific Notion page, including child blocks
export const getPageContent = async (
	pageId: string
): Promise<BlockObjectResponse[]> => {
	try {
		const response = await notion.blocks.children.list({
			block_id: pageId,
		});

		// Fetch children recursively for blocks with children (e.g., synced blocks)
		const blocksWithChildren = await Promise.all(
			response.results.map(async (block: any) => {
				if (block.has_children) {
					const children = await getBlockChildren(block.id);
					return { ...block, children };
				}
				return block;
			})
		);
		return blocksWithChildren;
	} catch (error) {
		console.error("Error fetching page content:", error);
		return [];
	}
};

// Fetch children of a specific block (for nested content like synced blocks)
export const getBlockChildren = async (
	blockId: string
): Promise<BlockObjectResponse[]> => {
	try {
		const response = await notion.blocks.children.list({
			block_id: blockId,
		});

		// Recursively fetch children for blocks that also have children
		const childBlocks = await Promise.all(
			response.results.map(async (block: any) => {
				if (block.has_children) {
					const children = await getBlockChildren(block.id); // Recursively fetch children
					return { ...block, children };
				}
				return block;
			})
		);

		return childBlocks;
	} catch (error) {
		console.error("Error fetching block children:", error);
		return [];
	}
};

// here2