import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageHeader from "@/app/_components/layout/page/PageHeader";
import { sortByPinnedAndDate } from "@/utils/sortItems";
import PostsContainer from "@/app/_components/views/common/Container"; // Import the updated PostsContainer
import Lists from "../_components/views/list/List"; // Import Lists component
import Gallery from "../_components/views/gallery/Gallery"; // Import Gallery component

export default async function PostsPage() {
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_POSTS_DB_ID!,
		pageId: process.env.NOTION_POSTS_PAGE_ID!,
		entryType: "posts", // Specify the entry type for mapping
	});

	const sortedItems = sortByPinnedAndDate(listItems, "pubdate");

	return (
		<div>
			<PageHeader title="Posts" icon="posts" pageContent={pageContent} />
				
			{/* Pass sortedItems and components to the client-side PostsContainer */}
			<PostsContainer
				sortedItems={sortedItems}
				ListComponent={Lists}
				GalleryComponent={Gallery}
				listProps={{
					linkKey: "url",
					pubDateKey: "pubdate",
					pageKey: "posts",
					tagsKey: "tags",
					slugKey: "slug",
				}}
				galleryProps={{
					lgGridCols: "lg:grid-cols-2",
					linkKey: "url",
					pubDateKey: "pubdate",
					pageKey: "posts",
					tagsKey: "tags",
					slugKey: "slug",
				}}
			/>
		</div>
	);
}
