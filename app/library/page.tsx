import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageTitle from "@/app/_components/layout/page/PageTitle";
import Subhead from "@/app/_components/layout/page/Subhead";
import Gallery from "@/app/_components/views/gallery/Gallery";
import GroupTitle from "@/app/_components/views/common/GroupTitle";	
import { groupItemsByVariable } from "@/utils/groupItems";

export default async function LibraryPage() {
	// Fetch the data from Notion using centralized data mapper
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_LIBRARY_DB_ID!,
		pageId: process.env.NOTION_LIBRARY_PAGE_ID!,
		entryType: "library", // Specify the entry type for mapping
	});

	// Group items by topics
	const groupedItems = groupItemsByVariable(listItems, "topics");

	return (
		<div className="container mx-auto p-4">
			<PageTitle title="Library" />
			<Subhead pageContent={pageContent} />

			{/* Loop through the keys of groupedItems */}
			{Object.keys(groupedItems).map((topic) => (
				<section key={topic}>
					<GroupTitle title={topic} />
					<Gallery
						items={groupedItems[topic]} // Items under this topic
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
