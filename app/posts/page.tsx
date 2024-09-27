import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageTitle from "@/app/_components/layout/page/PageTitle";
import Subhead from "@/app/_components/layout/page/Subhead";
import { sortByPinnedAndDate } from "@/utils/sortItems";
import PostsContainer from "@/app/_components/views/common/Container";	// Import the PostsContainer


export default async function PostsPage() {
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_POSTS_DB_ID!,
		pageId: process.env.NOTION_POSTS_PAGE_ID!,
		entryType: "posts", // Specify the entry type for mapping
	});

	const sortedItems = sortByPinnedAndDate(listItems, "date");

	return (
		<div className="container mx-auto">
			<PageTitle title="Posts" />
			<Subhead pageContent={pageContent} />

			{/* Pass sortedItems to the client-side PostsContainer */}
			<PostsContainer sortedItems={sortedItems} />

		</div>
	);
}
