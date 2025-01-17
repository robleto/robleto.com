import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageHeader from "@/app/_components/layout/page/PageHeader";
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
		<div className="pt-10">
			<PageHeader title="Resources" pageContent={pageContent} />

			<div
				className="
				flex-grow max-w-screen-xl pl-[20%]  md:pl-[25%] lg:w-auto
				mx-auto p-8 transition-all duration-300 dark:text-white"
			>
				{/* Featured Gallery */}
				<Gallery
					items={featuredItems}
					smGridCols="sm:grid-cols-1"
					mdGridCols="md:grid-cols-2"
					lgGridCols="lg:grid-cols-2"
					slugKey="slug"
					pageKey="resources"
					linkKey="url"
					animatedKey="animated" // Handling gif vs png
				/>

				<div className="my-6"></div>
				{/* Regular Gallery */}
				<Gallery
					items={sortedRegularItems}
					pageKey="resources"
					slugKey="slug"
					linkKey="url"
					animatedKey="animated"
				/>
			</div>
		</div>
	);
}
