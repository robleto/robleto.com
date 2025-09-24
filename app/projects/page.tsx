import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import { HybridContentFetcher } from "@/lib/hybridContentFetcher";
import PageHeader from "@/app/_components/layout/page/PageHeader";
import { sortByOrder } from "@/utils/sortItems";
import { filterItemsByProperty } from "@/utils/filterItems";
import Gallery from "@/app/_components/views/gallery/Gallery";

export default async function ProjectsPage() {
	// Use hybrid fetcher for better performance
	const { pageContent, listItems } = await HybridContentFetcher.getAllProjects();


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
				descriptionKey="description"
				pageKey="projects"
				slugKey="slug"
				linkKey="url"
			/>
		</div>
	);
}
