import { getDatabaseEntries, getPageContent } from "./notion";
import { mapEntry } from "./dataMappers";

// Centralized Notion fetcher
export const fetchNotionData = async ({
	databaseId,
	pageId,
	entryType, // Determines which mapper to use
	includeImages = false,
}: {
	databaseId?: string;
	pageId?: string;
	entryType?: string;
	includeImages?: boolean;
}) => {
	try {
		let listItems: any[] = [];
		let pageContent: any[] = [];
		let imageUrls: string[] = [];

		// Fetch database entries
		if (databaseId) {
			const dbEntries = await getDatabaseEntries(databaseId);
			listItems = dbEntries.map((entry) => mapEntry(entry, entryType || 'defaultEntryType'));

			// Extract image URLs if includeImages is true
			if (includeImages) {
				imageUrls = dbEntries
					.filter(
						(entry: any) =>
							entry.properties.Image?.files?.length > 0
					)
					.map(
						(entry: any) => entry.properties.Image.files[0].file.url
					);
			}
		}

		// Fetch page content
		if (pageId) {
			pageContent = await getPageContent(pageId);
		}

		return { pageContent, listItems, imageUrls };
	} catch (error) {
		console.error("Error fetching Notion data:", error);
		return { pageContent: [], listItems: [], imageUrls: [] };
	}
};
