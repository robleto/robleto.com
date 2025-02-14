import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageHeader from "@/app/_components/layout/page/PageHeader";
import Gallery from "@/app/_components/views/gallery/Gallery";
import GroupTitle from "@/app/_components/views/common/GroupTitle";
import { sortByName } from "@/utils/sortItems"; // Import the sortByName function
import USMap from "@/app/lists/travel/us-map"; // Update the import path to the correct location of the USMap component

export default async function TravelPage() {
	// Fetch the data from Notion using centralized data mapper
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_TRAVEL_DB_ID!,
		pageId: process.env.NOTION_TRAVEL_PAGE_ID!,
		entryType: "travel", // Specify the entry type for mapping
	});

	// Filter the items by Seen status
	const filteredItems = listItems.filter(
		(item) => item.seen === "Been there"
	);

	// Group items by state
	const groupedItems = filteredItems.reduce((acc, item) => {
		(acc[item.state] = acc[item.state] || []).push(item);
		return acc;
	}, {});

	// Sort the keys of groupedItems alphabetically (the state names)
	const sortedKeys = Object.keys(groupedItems).sort();

	// Use the sortByName function to sort the items within each state group
	sortedKeys.forEach((state) => {
		groupedItems[state] = sortByName(groupedItems[state]);
	});

	return (
		<div>
			<PageHeader
				title="Travel"
				icon="travel"
				pageContent={pageContent}
			/>

			{/* Render the US map */}
			<USMap />

			{/* Loop through the sorted keys of groupedItems */}
			{sortedKeys.map((state) => (
				<section key={state}>
					<GroupTitle title={state} />
					<Gallery
						items={groupedItems[state]} // Items under this state, now sorted by title using sortByName
						smGridCols="sm:grid-cols-1"
						mdGridCols="md:grid-cols-2"
						lgGridCols="lg:grid-cols-3"
						pageKey="travel"
						titleKey="title"
						linkKey="url"
						slugKey="slug"
						cityStateKey="cityState"
					/>
				</section>
			))}
		</div>
	);
}
