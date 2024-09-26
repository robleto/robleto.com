import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageTitle from "@/app/components/layout/PageTitle";
import Subhead from "@/app/components/layout/Subhead";
import { sortByOrder } from "@/utils/sortItems";
import Gallery from "@/app/components/Gallery";

// Map the Projects data structure
const mapProjectsEntry = (entry: any) => {
	const id = entry.id;
	const title = entry.properties.Name?.title[0]?.plain_text ?? "Untitled";
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
		description,
		url,
		sortOrder,
		slug,
		tags,
	};
};

export default async function ProjectsPage() {
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_PROJECTS_DB_ID!,
		pageId: process.env.NOTION_PROJECTS_PAGE_ID!,
		mapEntry: (entry) => mapProjectsEntry(entry),
	});

	const sortedItems = sortByOrder(listItems);

	return (
		<div className="container mx-auto p-4">
			<PageTitle title="Projects" />
			<Subhead pageContent={pageContent} />

			{/* Pass necessary keys and properties to Gallery */}
			<Gallery
				items={sortedItems}
				lgGridCols="lg:grid-cols-2"
				linkKey="url"
				pageKey="projects"
				tagsKey="tags"
				urlKey="url"
				slugKey="slug" // Ensure the slug key is passed for image paths
			/>
		</div>
	);
}
