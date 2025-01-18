import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageHeader from "@/app/_components/layout/page/PageHeader";
import { sortByOrder } from "@/utils/sortItems";
import { filterItemsByProperty } from "@/utils/filterItems";
import Gallery from "@/app/_components/views/gallery/Gallery";

export default async function ProjectsPage() {
	// Fetch the Notion data using centralized data mapper
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_PROJECTS_DB_ID!,
		pageId: process.env.NOTION_PROJECTS_PAGE_ID!,
		entryType: "projects", // Use entryType to fetch mapped data
	});


	const projectItems = filterItemsByProperty(listItems, "tags", "Side-Project") || [];


	// Sort items
	const sortedRegularItems = sortByOrder(projectItems);

	return (
		<div>
			<PageHeader title="Projects" icon="projects" pageContent={pageContent} />

			{/* Regular Gallery */}
			<Gallery
				mdGridCols="md:grid-cols-2"
				lgGridCols="lg:grid-cols-2"
				items={sortedRegularItems}
				tagsKey="tags"
				descriptionKey="description"
				pageKey="projects"
				slugKey="slug"
				linkKey="url"
			/>
		</div>
	);
}
