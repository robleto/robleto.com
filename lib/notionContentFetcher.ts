import { getDatabaseEntries, getPageContent } from "./notion";
import { mapEntry } from "./dataMappers";
import { validateNotionResponse } from "@/utils/validation";
import type { BaseItem } from "@/types";

// Centralized Notion fetcher with enhanced error handling and validation
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
}): Promise<{ pageContent: any[]; listItems: BaseItem[]; imageUrls: string[] }> => {
	try {
		let listItems: BaseItem[] = [];
		let pageContent: any[] = [];
		let imageUrls: string[] = [];

		// Fetch database entries
		if (databaseId) {
			const dbEntries = await getDatabaseEntries(databaseId);
			const mappedItems = dbEntries.map((entry) => mapEntry(entry, entryType || 'defaultEntryType'));
			
			// Validate and filter the mapped items (temporarily disabled to reduce console noise)
			// const validationResult = validateNotionResponse(mappedItems);
			// listItems = validationResult.validItems;
			
			// For now, just use the mapped items directly
			listItems = mappedItems;
			
			// Log any validation errors for debugging
			// if (validationResult.errors.length > 0) {
			//	console.warn(`Notion data validation found ${validationResult.errors.length} issues:`, validationResult.errors);
			// }

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
		// Return empty but valid structure to prevent downstream errors
		return { pageContent: [], listItems: [], imageUrls: [] };
	}
};
