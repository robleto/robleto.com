import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageHeader from "@/app/_components/layout/page/PageHeader";
import { sortByOrder, sortByName } from "@/utils/sortItems";
import { filterItemsByProperty } from "@/utils/filterItems";
import Gallery from "@/app/_components/views/gallery/Gallery";
import GroupTitle from "@/app/_components/views/common/GroupTitle";

export default async function PortfolioPage() {
	// Fetch the Notion data using centralized data mapper
	const { pageContent: portfolioPageContent, listItems: portfolioListItems } = await fetchNotionData({
		databaseId: process.env.NOTION_PORTFOLIO_DB_ID!,
		pageId: process.env.NOTION_PORTFOLIO_PAGE_ID!,
		entryType: "portfolio", // Use entryType to fetch mapped data
	});


	const projectItems =
		filterItemsByProperty(projectsListItems, "tags", "Full-time") || [];

	// Sort items
	const sortedProjectItems = sortByOrder(projectItems);
	const sortedCaseStudyItems = sortByName(portfolioListItems);

	return (
		<div className="pt-10">
			<PageHeader title="Portfolio" pageContent={portfolioPageContent} />

			<div
				className="
				flex-grow max-w-screen-xl pl-[20%]  md:pl-[25%] lg:w-auto
				mx-auto p-8 transition-all duration-300 dark:text-white"
			>
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
					mdGridCols="md:grid-cols-1"
					lgGridCols="lg:grid-cols-1"
					items={sortedCaseStudyItems}
					tagsKey="tags"
					descriptionKey="subtitle"
					pageKey="portfolio"
					slugKey="slug"
					linkKey="url"
				/>
			</div>
		</div>
	);
}
