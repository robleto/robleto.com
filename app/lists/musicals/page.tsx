import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageTitle from "@/app/_components/layout/page/PageTitle";
import Subhead from "@/app/_components/layout/page/Subhead";
import Gallery from "@/app/_components/views/gallery/Gallery";
import { filterItemsByProperty } from "@/utils/filterItems"; // Your utility for filtering
import { sortByName } from "@/utils/sortItems"; // Your utility for sorting

export default async function MusicalsPage() {
	// Fetch the data from Notion using centralized data mapper
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_MUSICALS_DB_ID!,
		pageId: process.env.NOTION_MUSICALS_PAGE_ID!,
		entryType: "musicals", // Specify the entry type for mapping
	});

	// Log the raw response from the API to verify the data
	console.log("Raw Notion API response:", listItems);

	// Filter the items by "Seen it / Complete" status using your utility function
	const filteredItems = filterItemsByProperty(listItems, "seen", "Seen It");

	// Log filtered results to see if the filtering works as expected
	console.log("Filtered items (Seen it):", filteredItems);

	// Sort items by name
	const sortedItems = sortByName(filteredItems);

	// Log the sorted items to ensure they are correctly ordered
	console.log("Sorted items by name:", sortedItems);

	return (
		<div className="container mx-auto p-4">
			<PageTitle title="Musicals" />
			<Subhead pageContent={pageContent} />

			<section>
				<Gallery
					items={sortedItems} // The sorted and filtered musicals
					mdGridCols="md:grid-cols-3"
					lgGridCols="lg:grid-cols-4"
					pageKey="musicals"
					titleKey="title"
					slugKey="slug"
				/>
			</section>
		</div>
	);
}
