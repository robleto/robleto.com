import React from "react";
import { HybridContentFetcher } from "@/lib/hybridContentFetcher";
import PageHeader from "@/app/_components/layout/page/PageHeader";
import { getAllProjects } from "@/lib/featuredProjects";
import Gallery from "@/app/_components/views/gallery/Gallery";

export default async function ProjectsPage() {
	// Use hybrid fetcher for better performance
	const { pageContent, listItems } = await HybridContentFetcher.getAllProjects();


	// Every Active project: Featured Apps, Featured Sites, then other work
	const sortedRegularItems = getAllProjects(listItems as any[]);

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
