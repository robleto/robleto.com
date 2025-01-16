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
		<div className="pt-10">
			<PageHeader title="Projects" pageContent={pageContent} />

			<div
				className="
				flex-grow max-w-screen-xl pl-[20%]  md:pl-[25%] lg:w-auto
				mx-auto p-8 transition-all duration-300 dark:text-white"
			>
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
		</div>
	);
}
