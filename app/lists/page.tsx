import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageHeader from "@/app/_components/layout/page/PageHeader";
import { sortByOrder } from "@/utils/sortItems";
import Gallery from "@/app/_components/views/gallery/Gallery";

export default async function ListsPage() {
	// Fetch the Notion data using centralized data mapper
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_LISTS_DB_ID!,
		pageId: process.env.NOTION_LISTS_PAGE_ID!,
		entryType: "lists", // Use entryType to fetch mapped data
	});

	// Sort items
	const sortedRegularItems = sortByOrder(listItems);

	return (
		<div>
			<PageHeader title="Lists" icon="lists" pageContent={pageContent} />

			{/* Regular Gallery */}
			<Gallery
				mdGridCols="md:grid-cols-2"
				lgGridCols="lg:grid-cols-2"
				items={sortedRegularItems}
				tagsKey="tags"
				descriptionKey="description"
				pageKey="lists"
				slugKey="slug"
				linkKey="url"
			/>

		</div>
	);
}
