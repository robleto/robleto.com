import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageHeader from "@/app/_components/layout/page/PageHeader";
import { sortByPinnedAndDate } from "@/utils/sortItems";
import Lists from "../_components/views/list/List";
import Gallery from "../_components/views/gallery/Gallery";

export default async function PostsPage() {
	try {
		// Validate environment variables
		if (
			!process.env.NOTION_POSTS_DB_ID ||
			!process.env.NOTION_POSTS_PAGE_ID
		) {
			console.error(
				"Missing Notion database/page ID environment variables."
			);
			return (
				<div>
					Error: Missing configuration. Check environment variables.
				</div>
			);
		}

		// Fetch Notion data
		const notionData = await fetchNotionData({
			databaseId: process.env.NOTION_POSTS_DB_ID,
			pageId: process.env.NOTION_POSTS_PAGE_ID,
			entryType: "posts",
		});

		// Check if data was fetched successfully
		if (!notionData || !notionData.pageContent) {
			console.error("Failed to fetch posts data from Notion.");
			return (
				<div>Error: Unable to load posts. Please try again later.</div>
			);
		}

		const { pageContent, listItems } = notionData;

		// Validate listItems
		const sortedItems =
			Array.isArray(listItems) && listItems.length > 0
				? sortByPinnedAndDate(listItems, "date")
				: [];

		return (
			<div>
				<PageHeader
					title="Posts"
					icon="posts"
					pageContent={pageContent}
				/>

				{/* Only render Lists & Gallery if sortedItems exist */}
				{sortedItems.length > 0 ? (
					<>
						<Lists
							items={sortedItems}
							linkKey="url"
							pubDateKey="date"
							pageKey="posts"
							tagsKey="tags"
							slugKey="slug"
						/>
						<Gallery items={sortedItems} />
					</>
				) : (
					<p>No posts available.</p>
				)}
			</div>
		);
	} catch (error) {
		console.error("Error loading Posts page:", error);
		return <div>Error: Something went wrong while fetching posts.</div>;
	}
}
