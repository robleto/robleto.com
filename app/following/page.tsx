import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageTitle from "@/app/_components/layout/page/PageTitle";
import Subhead from "@/app/_components/layout/page/Subhead";
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
		<div className="container mx-auto">
			<PageTitle title="Following" />
			<Subhead pageContent={pageContent} />

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
