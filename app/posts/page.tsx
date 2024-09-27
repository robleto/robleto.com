import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageTitle from "@/app/_components/layout/page/PageTitle";
import Subhead from "@/app/_components/layout/page/Subhead";
import { sortByPinnedAndDate } from "@/utils/sortItems";
import PostsContainer from "@/app/_components/views/common/Container";	// Import the PostsContainer

// Map the Posts data structure
const mapPostsEntry = (entry: any) => {
	const id = entry.id;
	const title = entry.properties.Name?.title[0]?.plain_text ?? "Untitled";
	const pubdate = entry.properties.PubDate?.date?.start || null;
	const description =
		entry.properties.Description?.rich_text[0]?.plain_text ?? "";
	const url = entry.properties.URL?.url || "#";
	const sortOrder = entry.properties.SortOrder?.number || Infinity;
	const slug = entry.properties.Slug?.rich_text[0]?.plain_text || "";
	const tags =
		entry.properties.Tags?.multi_select.map((topic: any) => topic.name) ||
		[];

	return {
		id,
		title,
		pubdate,
		description,
		url,
		sortOrder,
		slug,
		tags,
	};
};

export default async function PostsPage() {
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_POSTS_DB_ID!,
		pageId: process.env.NOTION_POSTS_PAGE_ID!,
		mapEntry: (entry) => mapPostsEntry(entry),
	});

	const sortedItems = sortByPinnedAndDate(listItems);

	return (
		<div className="container mx-auto">
			<PageTitle title="Posts" />
			<Subhead pageContent={pageContent} />

			{/* Pass sortedItems to the client-side PostsContainer */}
			<PostsContainer sortedItems={sortedItems} />

		</div>
	);
}
