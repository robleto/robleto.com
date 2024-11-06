import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageHeader from "@/app/_components/layout/page/PageHeader";
import { sortByPinnedAndDate, sortByName } from "@/utils/sortItems";
import Lists from "@/app/_components/views/list/List";
import GroupTitle from "@/app/_components/views/common/GroupTitle";
import { groupItemsByVariable } from "@/utils/groupItems";

export default async function BookmarksPage() {
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_BOOKMARKS_DB_ID!,
		pageId: process.env.NOTION_BOOKMARKS_PAGE_ID!,
		entryType: "bookmarks", // Specify the entry type for mapping
	});

	// Group items by tags
	const groupedItems = groupItemsByVariable(listItems, "tags");

	// Sort each group by name (and pinned/date if necessary)
	const sortedGroups = Object.keys(groupedItems).reduce(
		(acc: { [key: string]: any[] }, tag) => {
			// First sort by pinned and date, then sort by name
			const sortedByPinnedAndDate = sortByPinnedAndDate(
				groupedItems[tag],
				"name"
			);
			acc[tag] = sortByName(sortedByPinnedAndDate); // Sort by name within the group
			return acc;
		},
		{}
	);

	return (
		<div className="pt-10">
			<PageHeader title="Bookmarks" pageContent={pageContent} />

			<div
				className="
				flex-grow max-w-screen-xl pl-[20%]  md:pl-[25%] lg:w-auto
				mx-auto p-8 transition-all duration-300 dark:text-white"
			>
				{/* Loop through sorted groups */}
				{Object.keys(sortedGroups).map((tags) => (
					<section key={tags}>
						<GroupTitle title={tags} />
						<Lists
							items={sortedGroups[tags]}
							linkKey="url"
							pubDateKey="pubdate"
							pageKey="bookmarks"
							tagsKey="tags"
							urlKey="url"
							slugKey="slug"
						/>
					</section>
				))}
			</div>
		</div>
	);
}
