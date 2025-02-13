import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageHeader from "@/app/_components/layout/page/PageHeader";
import { sortByPinnedAndDate } from "@/utils/sortItems";
import Lists from "@/app/_components/views/list/List";	

export default async function ReadingListPage() {
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_READINGLIST_DB_ID!,
		pageId: process.env.NOTION_READINGLIST_PAGE_ID!,
		entryType: "reading-list", // Specify the entry type for mapping
	});

	const sortedItems = sortByPinnedAndDate(listItems, "date");

	return (
		<div>
			<PageHeader
				title="Reading List"
				icon="reading-list"
				pageContent={pageContent}
			/>

			{/* Render the Lists component */}
			<Lists
				items={sortedItems}
				linkKey="url"
				pubDateKey="pubdate"
				pageKey="reading-list"
				tagsKey="tags"
				slugKey="slug"
				urlKey="url"
			/>
		</div>
	);
}
