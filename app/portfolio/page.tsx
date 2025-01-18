import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageHeader from "@/app/_components/layout/page/PageHeader";
import { sortByOrder, sortByName } from "@/utils/sortItems";
import { filterItemsByProperty } from "@/utils/filterItems";
import Gallery from "@/app/_components/views/gallery/Gallery";
import GroupTitle from "@/app/_components/views/common/GroupTitle";

export const generateMetadata = () => {
	return {
		robots: {
			index: false, // Prevent indexing
			follow: false, // Prevent following links
		},
	};
};

export default async function PortfolioPage() {
	// Fetch the Notion data using centralized data mapper
	const { pageContent: portfolioPageContent, listItems: portfolioListItems } = await fetchNotionData({
		databaseId: process.env.NOTION_PORTFOLIO_DB_ID!,
		pageId: process.env.NOTION_PORTFOLIO_PAGE_ID!,
		entryType: "portfolio", // Use entryType to fetch mapped data
	});
  
	const { pageContent: projectsPageContent, listItems: projectsListItems } = await fetchNotionData({
		databaseId: process.env.NOTION_PROJECTS_DB_ID!,
		pageId: process.env.NOTION_PROJECTS_PAGE_ID!,
		entryType: "projects", // Use entryType to fetch mapped data
	});

	const projectItems =
		filterItemsByProperty(projectsListItems, "tags", "Full-time") || [];

	// Sort items
	const sortedProjectItems = sortByOrder(projectItems);
	const sortedCaseStudyItems = sortByName(portfolioListItems);

	return (
		<div>
			<PageHeader 
				title="Portfolio" 
				icon="portfolio" 
				linkUrl="./portfolio/resume-greg-robleto.pdf"
				linkText="View Resume"
				pageContent={portfolioPageContent} />

			{/* Regular Gallery */}
			<GroupTitle title="Professional Experience" />
			<Gallery
				mdGridCols="md:grid-cols-2"
				lgGridCols="lg:grid-cols-2"
				items={sortedProjectItems}
				tagsKey="tags"
				descriptionKey="description"
				pageKey="portfolio"
				slugKey="slug"
				linkKey="url"
			/>

			{/* Case Study Gallery */}
			<GroupTitle title="Case Studies" />
			<Gallery
				mdGridCols="md:grid-cols-2"
				lgGridCols="lg:grid-cols-2"
				items={sortedCaseStudyItems}
				tagsKey="tags"
				descriptionKey="subtitle"
				pageKey="portfolio"
				slugKey="slug"
				linkKey="url"
			/>
		</div>
	);
}
