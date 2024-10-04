import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageTitle from "../_components/layout/page/PageTitle";
import Subhead from "../_components/layout/page/Subhead";
import RichText from "../_components/layout/page/RichText";
import GroupTitle from "../_components/views/common/GroupTitle";
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
		<div className="container mx-auto p-4">
			<PageTitle title="About Me" />
			<Subhead pageContent={aboutSubheadContent} />

			<GroupTitle title="Recent Updates" />
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
