import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageTitle from "@/app/_components/layout/page/PageTitle";
import Subhead from "@/app/_components/layout/page/Subhead";
import Gallery from "@/app/_components/views/gallery/Gallery";
import GroupTitle from "@/app/_components/views/common/GroupTitle";
import { groupItemsByVariable } from "@/utils/groupItems";
import { sortByName } from "@/utils/sortItems"; 


export default async function LibraryPage() {
	// Fetch the data from Notion using centralized data mapper
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_LIBRARY_DB_ID!,
		pageId: process.env.NOTION_LIBRARY_PAGE_ID!,
		entryType: "library", // Specify the entry type for mapping
	});

	// Group items by topics
	const groupedItems = groupItemsByVariable(listItems, "topics");

	// Sort each group by name
	const sortedGroups = Object.keys(groupedItems).reduce(
		(acc: { [key: string]: any[] }, topic) => {
			acc[topic] = sortByName(groupedItems[topic]); // Sort by name within each topic
			return acc;
		},
		{}
	);

	return (
		<div className="container mx-auto p-4">
			<PageTitle title="Library" />
			<Subhead pageContent={pageContent} />

			{/* Loop through the sorted groups */}
			{Object.keys(sortedGroups).map((topic) => (
				<section key={topic}>
					<GroupTitle title={topic} />
					<Gallery
						items={sortedGroups[topic]} // Items sorted by name under this topic
						pageKey="library"
						titleKey="title"
						linkKey="url"
						slugKey="slug"
					/>
				</section>
			))}
		</div>
	);
}
