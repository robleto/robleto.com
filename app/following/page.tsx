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
		<div className="pt-10">
			<PageHeader title="Following" icon="following" pageContent={pageContent} />

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
					pageKey="following"
					tagsKey="tags"
					urlKey="url"
					slugKey="slug" // Ensure the slug key is passed for image paths
				/>
			</div>
		</div>
	);
}
