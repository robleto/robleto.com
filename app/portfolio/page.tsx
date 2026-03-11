import React from "react";
import { HybridContentFetcher } from "@/lib/hybridContentFetcher";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import { sortByPinnedAndDate, sortByOrder } from "@/utils/sortItems";
import { filterItemsByProperty } from "@/utils/filterItems";
import Gallery from "@/app/_components/views/gallery/Gallery";
import CaseStudyList from "@/app/_components/views/home/CaseStudyList";
import GroupTitle from "@/app/_components/views/common/GroupTitle";
import PageHeader from "@/app/_components/layout/page/PageHeader";
import type { PostItem } from "@/types";

// Top 3 case study slugs in preferred display order
const selectedCaseStudySlugs = [
	"design-system",
	"rebranding",
	"levels-project",
];

export const generateMetadata = () => ({
	title: "Work — Greg Robleto",
	description: "How I think about design leadership, selected case studies, and things I build.",
});

export default async function PortfolioPage() {
	const [postData, portfolioData, projectsData] = await Promise.allSettled([
		HybridContentFetcher.getAllPosts(),
		HybridContentFetcher.getPortfolioItems(),
		fetchNotionData({
			databaseId: process.env.NOTION_PROJECTS_DB_ID!,
			pageId: process.env.NOTION_PROJECTS_PAGE_ID!,
			entryType: "projects",
		}),
	]);

	// Signals — same logic as homepage
	const postItems: PostItem[] =
		postData.status === "fulfilled" ? postData.value.listItems : [];

	const isSignalsOfDesign = (series?: string) =>
		typeof series === "string" &&
		series.trim().toLowerCase() === "signals of design";

	const signalItems = sortByPinnedAndDate(
		postItems.filter((post) => isSignalsOfDesign(post.series)),
		"pubdate"
	).slice(0, 4);

	// Case studies — filtered to selected slugs, ordered by the array above
	const portfolioItems =
		portfolioData.status === "fulfilled" ? portfolioData.value.listItems : [];

	const selectedCaseStudies = selectedCaseStudySlugs
		.map((slug) => portfolioItems.find((item: any) => item.slug === slug))
		.filter(Boolean);

	// Side projects
	const projectItems =
		projectsData.status === "fulfilled"
			? filterItemsByProperty(projectsData.value.listItems, "tags", "Side-Project") || []
			: [];
	const sortedProjectItems = sortByOrder(projectItems);

	// Recognition data
	const recognitions = [
		"Wall Street Journal", "Nasdaq", "Yahoo! News", "Business Wire",
		"UX Collective", "CSS Weekly", "CodePen Spark", "CodePen Trending",
		"CSS Winner", "CSS Author", "Dev Community", "Medium Trending",
		"Popular on Dribbble", "Leaders of Awesomeness",
	];

	return (
		<div>
			<PageHeader
				title="Work"
				icon="portfolio"
				pageContent={[]}
			/>

			{/* Brief intro */}
			<p className="text-base text-gray-600 dark:text-gray-400 -mt-16 mb-12 pr-[20%]">
				Design and product leader with 25 years building at the intersection of
				finance, brand, and digital platforms. Currently Design Director at
				Motley Fool Asset Management.
			</p>

			{/* Signals — How I Think */}
			{signalItems.length > 0 && (
				<>
					<GroupTitle
						title="How I Think"
						subtitle="Strategic perspectives on design, systems, and leadership."
					/>
					<Gallery
						items={signalItems}
						mdGridCols="md:grid-cols-2"
						lgGridCols="lg:grid-cols-2"
						pageKey="posts"
						slugKey="slug"
						linkKey="url"
						dateFormat="month-year"
					/>
				</>
			)}

			{/* Selected Case Studies */}
			{selectedCaseStudies.length > 0 && (
				<>
					<GroupTitle
						title="Selected Work"
						subtitle="Case studies in design systems, brand architecture, and product strategy."
					/>
					<CaseStudyList items={selectedCaseStudies as any[]} />
				</>
			)}

			{/* Side Projects */}
			{sortedProjectItems.length > 0 && (
				<>
					<GroupTitle title="Things I Build" />
					<Gallery
						mdGridCols="md:grid-cols-2"
						lgGridCols="lg:grid-cols-3"
						items={sortedProjectItems}
						descriptionKey="description"
						pageKey="projects"
						slugKey="slug"
						linkKey="url"
					/>
				</>
			)}

			{/* Recognition */}
			<GroupTitle title="Recognition" />
			<div className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:px-[10%] mb-12">
				{recognitions.map((name) => (
					<span
						key={name}
						className="text-sm text-gray-500 dark:text-gray-400"
					>
						{name}
					</span>
				))}
			</div>
		</div>
	);
}
