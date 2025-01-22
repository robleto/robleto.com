import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageHeader from "@/app/_components/layout/page/PageHeader";
import RichText from "@/app/_components/layout/page/RichText";
import GroupTitle from "@/app/_components/views/common/GroupTitle";
import Lists from "@/app/_components/views/list/List";
import { sortByPinnedAndDate } from "@/utils/sortItems";	

export default async function AboutPage() {
	const { pageContent: aboutSubheadContent, listItems } =
		await fetchNotionData({
			databaseId: process.env.NOTION_ABOUT_DB_ID!,
			pageId: process.env.NOTION_ABOUT_PAGE_ID!,
			entryType: "about",
		});

	const { pageContent: aboutDescriptionContent } = await fetchNotionData({
		pageId: process.env.NOTION_ABOUT_DESCRIPTION_ID!,
	});

	// Assuming "date" is the key for the date in the items
	const sortedItems = sortByPinnedAndDate(listItems, "date");

	return (
		<div>
			<PageHeader title="About" icon="about" pageContent={aboutSubheadContent} />

			<GroupTitle title="Timeline" />
			{/* Render the Lists component */}
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

			<GroupTitle title="About Me" />
			<RichText pageContent={aboutDescriptionContent} />
		</div>
	);
}
