import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageHeader from "@/app/_components/layout/page/PageHeader";
import Gallery from "@/app/_components/views/gallery/Gallery";
import { filterItemsByProperty } from "@/utils/filterItems"; // Your utility for filtering
import { sortByName } from "@/utils/sortItems"; // Your utility for sorting

export default async function BoardGamesPage() {
	// Fetch the data from Notion using centralized data mapper
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_BOARDGAMES_DB_ID!,
		pageId: process.env.NOTION_BOARDGAMES_PAGE_ID!,
		entryType: "board-games", // Specify the entry type for mapping
	});

	// Log the raw response from the API to verify the data
	console.log("Raw Notion API response:", listItems);

	// Filter the items by "Seen it / Complete" status using your utility function
	const filteredItems = filterItemsByProperty(listItems, "own", "Own It");

	// Log filtered results to see if the filtering works as expected
	console.log("Filtered items (Seen it):", filteredItems);

	// Sort items by name
	const sortedItems = sortByName(filteredItems);

	// Log the sorted items to ensure they are correctly ordered
	console.log("Sorted items by name:", sortedItems);

	return (
		<div className="pt-10">
			<PageHeader title="Board Games" icon="board-games" pageContent={pageContent} />

			<div
				className="
				flex-grow max-w-screen-xl pl-[20%]  md:pl-[25%] lg:w-auto
				mx-auto p-8 transition-all duration-300 dark:text-white"
			>
				<section>
					<Gallery
						items={sortedItems} // The sorted and filtered boardGames
						mdGridCols="md:grid-cols-3"
						lgGridCols="lg:grid-cols-4"
						pageKey="board-games"
						titleKey="title"
						linkKey="url"
						slugKey="slug"
					/>
				</section>
			</div>
		</div>
	);
}
