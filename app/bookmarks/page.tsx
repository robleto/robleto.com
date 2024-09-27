import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageTitle from "@/app/_components/layout/page/PageTitle";
import Subhead from "@/app/_components/layout/page/Subhead";
import { sortByPinnedAndDate } from "@/utils/sortItems";
import Lists from "@/app/_components/views/list/List";
import { groupItemsByVariable } from "@/utils/groupItems";

// Map the Bookmarks data structure
const mapBookmarksEntry = (entry: any) => {
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

export default async function BookmarksPage() {
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_BOOKMARKS_DB_ID!,
		pageId: process.env.NOTION_BOOKMARKS_PAGE_ID!,
		mapEntry: (entry) => mapBookmarksEntry(entry),
	});

	// Group items by state
	const groupedItems = groupItemsByVariable(listItems, "tags");
	const sortedItems = sortByPinnedAndDate(listItems);

	return (
		<div className="container mx-auto">
			<PageTitle title="Bookmarks" />
			<Subhead pageContent={pageContent} />

			{/* Loop through the keys of groupedItems */}
			{Object.keys(groupedItems).map((tags) => (
				<section key={tags}>
					<section className="relative flex items-center justify-center my-8">
						<span className="flex-grow h-px bg-gray-300"></span>
						<h3 className="px-4 text-2xl uppercase font-bold font-oswald text-gray-700 dark:text-gray-200">
							{tags}
						</h3>
						<span className="flex-grow h-px bg-gray-300"></span>
					</section>
					<Lists
						items={groupedItems[tags]} // Items under this tags
						linkKey="url"
						pubDateKey="pubdate"
						pageKey="reading-list"
						tagsKey="tags"
						urlKey="url"
						slugKey="slug" // Ensure the slug key is passed for image paths
					/>
				</section>
		))}
	</div>
	);
}