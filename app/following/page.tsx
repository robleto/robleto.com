import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageHeader from "@/app/_components/layout/page/PageHeader";
import { sortByName } from "@/utils/sortItems";
import Lists from "@/app/_components/views/list/List";

export default async function FollowingPage() {
	try {
		// Fetch data from Notion
		const notionData = await fetchNotionData({
			databaseId: process.env.NOTION_FOLLOWING_DB_ID!,
			pageId: process.env.NOTION_FOLLOWING_PAGE_ID!,
			entryType: "following", // Specify the entry type for mapping
		});

		// Ensure Notion data is valid
		if (!notionData) {
			console.error("Notion data is undefined. Check API response.");
			return <div>Failed to load data. Please try again later.</div>;
		}

		const { pageContent, listItems } = notionData;

		// Ensure listItems is a valid array
		if (!Array.isArray(listItems) || listItems.length === 0) {
			console.warn("No items found in the Notion database.");
			return (
				<div>
					<PageHeader
						title="Following"
						icon="following"
						pageContent={pageContent}
					/>
					<p>No followed posts available.</p>
				</div>
			);
		}

		// Sort and render
		const sortedItems = sortByName(listItems);

		return (
			<div>
				<PageHeader
					title="Following"
					icon="following"
					pageContent={pageContent}
				/>
				<Lists
					items={sortedItems}
					linkKey="url"
					pubDateKey="pubdate"
					pageKey="following"
					tagsKey="tags"
					urlKey="url"
					slugKey="slug"
				/>
			</div>
		);
	} catch (error) {
		console.error("Error fetching followed posts:", error);
		return <div>Error loading followed posts. Please try again later.</div>;
	}
}
