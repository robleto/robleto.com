import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageHeader from "@/app/_components/layout/page/PageHeader";
import Gallery from "@/app/_components/views/gallery/Gallery";
import { filterItemsByProperty } from "@/utils/filterItems"; // Your utility for filtering
import { sortByName } from "@/utils/sortItems"; // Your utility for sorting
import GroupTitle from "@/app/_components/views/common/GroupTitle";

export default async function ShakespearePage() {
	// Fetch the data from Notion using centralized data mapper
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_SHAKESPEARE_DB_ID!,
		pageId: process.env.NOTION_SHAKESPEARE_PAGE_ID!,
		entryType: "shakespeare", // Specify the entry type for mapping
	});

	// Log the raw response from the API to verify the data
	console.log("Raw Notion API response:", listItems);

	// Filter the items by "Seen it / Complete" status using your utility function
	const filteredSeenItems = filterItemsByProperty(listItems, "seen", "Seen It");
	const filteredUnseenItems = filterItemsByProperty(listItems, "seen", "Not yet");

	// Log filtered results to see if the filtering works as expected
	console.log("Filtered items (Seen it):", filteredSeenItems);
	console.log("Filtered items (Not Yet):", filteredUnseenItems);

	// Sort items by name
	const seenItems = sortByName(filteredSeenItems);
	const unseenItems = sortByName(filteredUnseenItems);

	// Log the seen items to ensure they are correctly ordered
	console.log("Seen items by name:", seenItems);
	console.log("Unseen items by name:", unseenItems);

	return (
		<div className="pt-10">
			<PageHeader title="Shakespeare" pageContent={pageContent} />

			<div
				className="
				flex-grow max-w-screen-xl pl-[20%]  md:pl-[25%] lg:w-auto
				mx-auto p-8 transition-all duration-300 dark:text-white"
			>
				<section>
					<GroupTitle title="Shakespeare Seen" />
					<Gallery
						mdGridCols="md:grid-cols-3"
						lgGridCols="lg:grid-cols-4"
						items={seenItems} // The seen and filtered shakespeare
						pageKey="shakespeare"
						titleKey="title"
						slugKey="slug"
					/>
				</section>

				<section>
					<GroupTitle title="Shakespeare Yet to See" />
					<Gallery
						mdGridCols="md:grid-cols-3"
						lgGridCols="lg:grid-cols-4"
						items={unseenItems} // The seen and filtered shakespeare
						pageKey="shakespeare"
						titleKey="title"
						slugKey="slug"
					/>
				</section>
			</div>
		</div>
	);
}
