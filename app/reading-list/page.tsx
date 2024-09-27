import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageTitle from "@/app/_components/layout/page/PageTitle";
import Subhead from "@/app/_components/layout/page/Subhead";
import { sortByPinnedAndDate } from "@/utils/sortItems";
import Lists from "@/app/_components/views/list/List";	

// Map the ReadingList data structure
const mapReadingListEntry = (entry: any) => {
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

export default async function ReadingListPage() {
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_READINGLIST_DB_ID!,
		pageId: process.env.NOTION_READINGLIST_PAGE_ID!,
		mapEntry: (entry) => mapReadingListEntry(entry),
	});

	const sortedItems = sortByPinnedAndDate(listItems);

	return (
		<div className="container mx-auto">
			<PageTitle title="Reading List" />
			<Subhead pageContent={pageContent} />

			{/* Render the Lists component */}
			<Lists
				items={sortedItems}
				linkKey="url"
				pubDateKey="pubdate"
				pageKey="reading-list"
				tagsKey="tags"
				slugKey="slug" // Ensure the slug key is passed for image paths
			/>
		</div>
	);
}
