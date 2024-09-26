import { getDatabaseEntries, getPageContent } from "./notion";

// Define a flexible fetcher for Notion data
export const fetchNotionData = async ({
	databaseId,
	pageId,
	mapEntry,
	includeImages = false, // Add an option to include image fetching
}: {
	databaseId?: string;
	pageId?: string;
	mapEntry?: (entry: any) => any;
	includeImages?: boolean; // New flag for whether to fetch image URLs
}) => {
	try {
		let listItems: any[] = [];
		let pageContent: any[] = [];
		let imageUrls: string[] = []; // Store image URLs if found

		// Fetch database entries if a databaseId is provided
		if (databaseId) {
			console.log("Fetching database with ID:", databaseId); // Add this
			const dbEntries = await getDatabaseEntries(databaseId);

			if (mapEntry) {
				listItems = await Promise.all(dbEntries.map(mapEntry));
			} else {
				listItems = dbEntries; // If no mapping is provided, return raw entries
			}

			// If includeImages is true, extract image URLs from the entries
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

		// Fetch page content if a pageId is provided
		if (pageId) {
			console.log("Fetching page with ID:", pageId); // Add this
			pageContent = await getPageContent(pageId);
		}

		// Return page content, list items, and image URLs (if any)
		return { pageContent, listItems, imageUrls };
	} catch (error) {
		console.error("Error fetching Notion data:", error);
		return { pageContent: [], listItems: [], imageUrls: [] };
	}
};
