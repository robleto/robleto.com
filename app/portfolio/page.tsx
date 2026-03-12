import React from "react";
import { HybridContentFetcher } from "@/lib/hybridContentFetcher";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import { sortByPinnedAndDate, sortByOrder } from "@/utils/sortItems";
import { filterItemsByProperty } from "@/utils/filterItems";
import Image from "next/image";
import Link from "next/link";
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

			{/* Side Projects — horizontal scroll cards matching homepage */}
			{sortedProjectItems.length > 0 && (
				<>
					<GroupTitle title="Things I Build" />
					<div className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
						<div className="flex gap-4 snap-x snap-mandatory">
							{sortedProjectItems.map((item: any) => {
								let href = item.url && item.url !== "#"
									? item.url
									: item.slug
									? `/projects/${item.slug}`
									: "/projects";

								if (href && /^www\./i.test(href)) {
									href = `https://${href}`;
								}

								const imageSrc = item.image || (item.slug ? `/projects/${item.slug}.png` : "");
								const isExternal = /^https?:\/\//i.test(href);
								const tags = Array.isArray(item.tags) ? item.tags : [];

								const card = (
									<article className="h-[18.5rem] rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 transition-transform duration-200 hover:-translate-y-1">
										<div className="h-32 w-full bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
											{imageSrc ? (
												<Image
													src={imageSrc}
													alt={item.title || "Project image"}
													fill
													sizes="(max-width: 640px) 240px, 256px"
													quality={60}
													loading="lazy"
													className="object-cover"
												/>
											) : (
												<div className="h-full w-full" />
											)}
										</div>
										<div className="h-[10.5rem] p-3.5 flex flex-col">
											<h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 min-h-[2.5rem]">
												{item.title || "Untitled"}
											</h3>
											<p className="mt-1.5 text-xs text-gray-600 dark:text-gray-400 line-clamp-3 min-h-[3.6rem]">
												{item.description || ""}
											</p>
											<div className="mt-auto pt-2">
												{tags[0] ? (
													<span className="inline-flex items-center rounded-full border border-gray-300 dark:border-gray-600 px-2 py-0.5 text-[10px] tracking-wide uppercase text-gray-600 dark:text-gray-300">
														{tags[0]}
													</span>
												) : null}
											</div>
										</div>
									</article>
								);

								return (
									<div key={item.id} className="snap-start w-[15rem] sm:w-[16rem] shrink-0">
										{isExternal ? (
											<a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
												{card}
											</a>
										) : (
											<Link href={href} className="block h-full">
												{card}
											</Link>
										)}
									</div>
								);
							})}
						</div>
					</div>
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
