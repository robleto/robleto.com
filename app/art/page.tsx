import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageHeader from "@/app/_components/layout/page/PageHeader"; 
import { filterItemsByProperty } from "@/utils/filterItems";
import { sortByPinnedAndDate } from "@/utils/sortItems";
import Gallery from "@/app/_components/views/gallery/Gallery";

export default async function ArtPage() {
	// Fetch the Notion data using centralized data mapper
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_ART_DB_ID!,
		pageId: process.env.NOTION_ART_PAGE_ID!,
		entryType: "art", // Specify the entry type for data mapping
	});

	// Filter the featured and non-featured items
	const featuredItems = filterItemsByProperty(listItems, "featured", true);
	const regularItems = filterItemsByProperty(listItems, "featured", false);

	// Sort regular items by pinned and date
	const sortedRegularItems = sortByPinnedAndDate(regularItems, "date");

	return (
		<div>
			<PageHeader title="Artwork" icon="art" pageContent={pageContent} />

				{/* Featured Gallery */}
				<Gallery
					items={featuredItems}
					smGridCols="sm:grid-cols-1"
					mdGridCols="md:grid-cols-2"
					lgGridCols="lg:grid-cols-2"
					slugKey="slug"
					pageKey="art"
					linkKey="url"
					animatedKey="animated" // Handling gif vs png
				/>

				<div className="my-6"></div>

				{/* Regular Gallery */}
				<Gallery
					items={sortedRegularItems}
					pageKey="art"
					slugKey="slug"
					linkKey="url"
					animatedKey="animated"
				/>
			</div>
	);
}
