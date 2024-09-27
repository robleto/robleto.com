import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageTitle from "@/app/_components/layout/page/PageTitle";
import Subhead from "@/app/_components/layout/page/Subhead";
import { sortByOrder } from "@/utils/sortItems";
import Gallery from "@/app/_components/views/gallery/Gallery";

export default async function ProjectsPage() {
	// Fetch the Notion data using centralized data mapper
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_PROJECTS_DB_ID!,
		pageId: process.env.NOTION_PROJECTS_PAGE_ID!,
		entryType: "projects", // Use entryType to fetch mapped data
	});

	// Sort items
	const sortedRegularItems = sortByOrder(listItems);

	return (
		<div className="container mx-auto p-4">
			<PageTitle title="Projects" />
			<Subhead pageContent={pageContent} />

			{/* Regular Gallery */}
			<Gallery
				mdGridCols="md:grid-cols-1"
				lgGridCols="lg:grid-cols-1"
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
