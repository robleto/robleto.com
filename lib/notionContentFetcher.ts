import { getDatabaseEntries, getPageContent } from "./notion";

// Fetch data with flexible mapping
export const fetchNotionData = async (
	databaseId: string,
	pageId: string,
	mapEntry: (entry: any) => any
) => {
	const dbEntries = await getDatabaseEntries(databaseId);
	const pageContent = await getPageContent(pageId);
	const listItems = await Promise.all(dbEntries.map(mapEntry));

	return { pageContent, listItems };
};
