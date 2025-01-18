import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageHeader from "@/app/_components/layout/page/PageHeader";
import { sortByName } from "@/utils/sortItems";
import Lists from "@/app/_components/views/list/List";


export default async function FollowingPage() {
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_FOLLOWING_DB_ID!,
		pageId: process.env.NOTION_FOLLOWING_PAGE_ID!,
		entryType: "following", // Specify the entry type for mapping
	});

	const sortedItems = sortByName(listItems);

	return (
		<div>
			<PageHeader title="Following" icon="following" pageContent={pageContent} />

			{/* Render the Lists component */}
			<Lists
				items={sortedItems}
				linkKey="url"
				pubDateKey="pubdate"
				pageKey="following"
				tagsKey="tags"
				urlKey="url"
				slugKey="slug" // Ensure the slug key is passed for image paths
			/>
		</div>
	);
}
