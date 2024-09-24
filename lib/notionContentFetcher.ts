import { getDatabaseEntries, getPageContent } from "./notion";

// Fetch data with flexible mapping
export const fetchNotionData = async (
	databaseId: string,
	pageId: string,
	mapEntry: (entry: unknown) => unknown
) => {
	try {
		const dbEntries = await getDatabaseEntries(databaseId);
		const pageContent = await getPageContent(pageId);
		const listItems = await Promise.all(dbEntries.map(mapEntry));

		// Return both page content and list items
		return { pageContent, listItems };
	} catch (error) {
		// Log error to console for debugging
		console.error("Error fetching Notion data:", error);

		// Return empty content if error occurs
		return { pageContent: [], listItems: [] };
	}
};
