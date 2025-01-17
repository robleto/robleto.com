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
		<div className="pt-10">
			<PageHeader title="Reading List" icon="reading-list" pageContent={pageContent} />

			<div
				className="
				flex-grow max-w-screen-xl pl-[20%]  md:pl-[25%] lg:w-auto
				mx-auto p-8 transition-all duration-300 dark:text-white"
			>
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
		</div>
	);
}
