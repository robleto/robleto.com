import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageHeader from "@/app/_components/layout/page/PageHeader";
import RichText from "@/app/_components/layout/page/RichText";
import GroupTitle from "@/app/_components/views/common/GroupTitle";
import Lists from "@/app/_components/views/list/List";
import { sortByPinnedAndDate } from "@/utils/sortItems";

export default async function AboutPage() {
	try {
		// Check if environment variables are set
		if (
			!process.env.NOTION_ABOUT_DB_ID ||
			!process.env.NOTION_ABOUT_PAGE_ID ||
			!process.env.NOTION_ABOUT_DESCRIPTION_ID
		) {
			console.error(
				"Missing environment variables for Notion database/page IDs."
			);
			return (
				<div>
					Error: Missing configuration. Check environment variables.
				</div>
			);
		}

		// Fetch main about page content and list items
		const aboutData = await fetchNotionData({
			databaseId: process.env.NOTION_ABOUT_DB_ID,
			pageId: process.env.NOTION_ABOUT_PAGE_ID,
			entryType: "about",
		});

		// Fetch the about description content separately
		const aboutDescriptionData = await fetchNotionData({
			pageId: process.env.NOTION_ABOUT_DESCRIPTION_ID,
		});

		// Ensure data was fetched successfully
		if (!aboutData || !aboutData.pageContent) {
			console.error("Failed to fetch about page content from Notion.");
			return (
				<div>
					Error: Unable to load the About page. Please try again
					later.
				</div>
			);
		}

		if (!aboutDescriptionData || !aboutDescriptionData.pageContent) {
			console.warn("About description content is missing from Notion.");
		}

		const { pageContent: aboutSubheadContent, listItems } = aboutData;
		const { pageContent: aboutDescriptionContent } = aboutDescriptionData;

		// Validate list items before sorting
		const sortedItems =
			Array.isArray(listItems) && listItems.length > 0
				? sortByPinnedAndDate(listItems, "date")
				: [];

		return (
			<div>
				<PageHeader
					title="About"
					icon="about"
					pageContent={aboutSubheadContent}
				/>

				<GroupTitle title="Timeline" />
				{/* Render the Lists component only if there are items */}
				{sortedItems.length > 0 ? (
					<Lists
						items={sortedItems}
						pageKey="about"
						linkKey="url"
						descriptionKey="description"
						pubDateKey="date"
						titleKey="name"
						tagsKey="tags"
						slugKey="slug"
					/>
				) : (
					<p>No timeline items found.</p>
				)}

				<GroupTitle title="About Me" />
				{/* Render RichText only if content is available */}
				{aboutDescriptionContent ? (
					<RichText pageContent={aboutDescriptionContent} />
				) : (
					<p>About me content is currently unavailable.</p>
				)}
			</div>
		);
	} catch (error) {
		console.error("Error loading About page:", error);
		return <div>Error: Something went wrong while fetching content.</div>;
	}
}
