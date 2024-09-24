import { getDatabaseEntries, getPageContent } from "./notion";

// Define a flexible fetcher for Notion data
export const fetchNotionData = async ({
	databaseId,
	pageId,
	mapEntry,
}: {
	databaseId?: string;
	pageId?: string;
	mapEntry?: (entry: any) => any;
}) => {
	try {
		let listItems: any[] = [];
		let pageContent: any[] = [];

		// Fetch database entries if a databaseId is provided
		if (databaseId) {
			const dbEntries = await getDatabaseEntries(databaseId);
			if (mapEntry) {
				listItems = await Promise.all(dbEntries.map(mapEntry));
			} else {
				listItems = dbEntries; // If no mapping is provided, return raw entries
			}
		}

		// Fetch page content if a pageId is provided
		if (pageId) {
			pageContent = await getPageContent(pageId);
		}

		// Return both page content and list items, or whichever was fetched
		return { pageContent, listItems };
	} catch (error) {
		console.error("Error fetching Notion data:", error);
		return { pageContent: [], listItems: [] };
	}
};
