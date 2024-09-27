import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageTitle from "@/app/_components/layout/page/PageTitle";
import Subhead from "@/app/_components/layout/page/Subhead";
import { filterItemsByProperty } from "@/utils/filterItems";
import { sortByPinnedAndDate } from "@/utils/sortItems";
import Gallery from "@/app/_components/views/gallery/Gallery";

export default async function ResourcesPage() {
	// Fetch the Notion data using centralized data mapper
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_RESOURCES_DB_ID!,
		pageId: process.env.NOTION_RESOURCES_PAGE_ID!,
		entryType: "resources", // Specify the entry type for mapping
	});

	// Filter the featured and non-featured items
	const featuredItems = filterItemsByProperty(listItems, "featured", true);
	const regularItems = filterItemsByProperty(listItems, "featured", false);

	// Sort regular items by pinned and date
	const sortedRegularItems = sortByPinnedAndDate(regularItems, "name");

	return (
		<div className="container mx-auto p-4">
			<PageTitle title="Resources" />
			<Subhead pageContent={pageContent} />

			{/* Featured Gallery */}
			<Gallery
				items={featuredItems}
				smGridCols="sm:grid-cols-1"
				mdGridCols="md:grid-cols-2"
				lgGridCols="lg:grid-cols-2"
				slugKey="slug"
				pageKey="resources"
				linkKey="url"
			/>

			{/* Regular Gallery */}
			<Gallery
				items={sortedRegularItems}
				pageKey="resources"
				slugKey="slug"
				linkKey="url"
				animatedKey="animated"
			/>
		</div>
	);
}
