import { Client } from "@notionhq/client";
import { BlockObjectResponse, PageObjectResponse, PartialBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"; // Import block types

// Initialize the Notion client with the API key
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Fetch data from a Notion database (e.g., Projects or Library)
export const getDatabaseEntries = async (databaseId: string): Promise<PageObjectResponse[]> => {
	try {
		let results: PageObjectResponse[] = [];
		let hasMore = true;
		let nextCursor: string | undefined = undefined;

		while (hasMore) {
			const response = await notion.databases.query({
				database_id: databaseId,
				start_cursor: nextCursor ?? undefined,
			});

			results = [
				...results,
				...response.results.filter(
					(result): result is PageObjectResponse => 'properties' in result
				),
			]; // Append the results

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
			response.results.map(async (block: BlockObjectResponse | PartialBlockObjectResponse) => {
				if ('has_children' in block && block.has_children) {
					const children = await getBlockChildren(block.id);
					return { ...block, children };
				}
				return block;
			})
		);
		return blocksWithChildren.filter(
			(block): block is BlockObjectResponse => 'type' in block
		);
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
			response.results.map(async (block: BlockObjectResponse | PartialBlockObjectResponse) => {
				if ('has_children' in block && block.has_children) {
					const children = await getBlockChildren(block.id); // Recursively fetch children
					return { ...block, children };
				}
				return block;
			})
		);

		return childBlocks.filter(
			(block): block is BlockObjectResponse => 'type' in block
		);
	} catch (error) {
		console.error("Error fetching block children:", error);
		return [];
	}
};

// Fetch case studies from a Notion database
export const getCaseStudies = async (databaseId: string): Promise<PageObjectResponse[]> => {
	try {
		const response = await notion.databases.query({
			database_id: databaseId,
		});

		return response.results.filter(
			(result): result is PageObjectResponse => 'properties' in result
		);
	} catch (error) {
		console.error("Error fetching case studies:", error);
		return [];
	}
};