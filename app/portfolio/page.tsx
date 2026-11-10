import React from "react";
import { HybridContentFetcher } from "@/lib/hybridContentFetcher";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import WritingList from "@/app/_components/views/home/WritingList";
import ProjectCardRow from "@/app/_components/views/common/ProjectCardRow";
import { getFeaturedApps, getFeaturedSites } from "@/lib/featuredProjects";
import CaseStudyList from "@/app/_components/views/home/CaseStudyList";
import GroupTitle from "@/app/_components/views/common/GroupTitle";
import ProfileHero from "@/app/_components/views/common/ProfileHero";
import SocialLinks from "@/app/_components/views/common/SocialLinks";
import type { PostItem } from "@/types";

// Top 3 case study slugs in preferred display order
const selectedCaseStudySlugs = [
	"brand-governance-system",
	"rebranding",
	"summer-of-tmfc",
	"design-system",
];

// Hand-picked "How I Think" posts, in display order
const selectedPostSlugs = [
	"designing-trust-in-financial-products",
	"building-the-boundaries-design-has-moved-to-before-the-prompt",
	"ai-in-design-isnt-just-about-speed-it-s-about-what-you-can-afford-to-discard",
	"20-years-of-fooldom",
];

// Recognition, split by audience: business press first, then design community
const pressRecognitions = [
	"Wall Street Journal", "Nasdaq", "Yahoo! News", "Business Wire",
];
const communityRecognitions = [
	"UX Collective", "CSS Weekly", "CodePen Spark", "CodePen Trending",
	"CSS Winner", "CSS Author", "Dev Community", "Medium Trending",
	"Popular on Dribbble",
];

export const generateMetadata = () => ({
	title: "Portfolio — Greg Robleto",
	description: "Brand and creative leadership in investing and asset management: selected case studies, perspectives, and things I build.",
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

	// How I Think — hand-picked posts, ordered by the array above
	const postItems: PostItem[] =
		postData.status === "fulfilled" ? postData.value.listItems : [];

	const signalItems = selectedPostSlugs
		.map((slug) => postItems.find((post) => post.slug === slug))
		.filter((post): post is PostItem => Boolean(post));

	// Case studies — filtered to selected slugs, ordered by the array above
	const portfolioItems =
		portfolioData.status === "fulfilled" ? portfolioData.value.listItems : [];

	const selectedCaseStudies = selectedCaseStudySlugs
		.map((slug) => portfolioItems.find((item: any) => item.slug === slug))
		.filter(Boolean);

	// Side projects — selection and order live in lib/featuredProjects
	const allProjectItems =
		projectsData.status === "fulfilled" ? projectsData.value.listItems : [];
	const featuredApps = getFeaturedApps(allProjectItems as any[]);
	const featuredSites = getFeaturedSites(allProjectItems as any[]);

	return (
		<div>
			<ProfileHero
				blurb={
					<>
						Brand and creative leader with 20 years in investing and asset
						management. I build the positioning, identity systems, and
						AI-enabled production that keep a brand consistent at scale.
					</>
				}
				subline="Head of Brand, Marketing & Product Design at Motley Fool Asset Management."
				showContact={false}
			/>

			{/* Selected Case Studies */}
			{selectedCaseStudies.length > 0 && (
				<>
					<GroupTitle
						title="Selected Work"
						subtitle="Case studies in brand architecture, governance, and growth in regulated finance."
					/>
					<CaseStudyList items={selectedCaseStudies as any[]} />
				</>
			)}

			{/* How I Think — hand-picked posts */}
			{signalItems.length > 0 && (
				<>
					<GroupTitle
						title="How I Think"
						subtitle="Perspectives on trust, brand governance, and design in the age of AI."
					/>
					<WritingList items={signalItems} />
				</>
			)}

			{/* Recognition */}
			<GroupTitle title="Recognition" />
			<div className="md:px-[10%] mb-12 space-y-6 text-center">
				<div>
					<p className="text-[10px] tracking-[.2em] uppercase font-semibold text-gray-400 dark:text-gray-500 mb-2">
						Press &amp; Markets
					</p>
					<ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
						{pressRecognitions.map((name) => (
							<li
								key={name}
								className="text-base font-semibold text-gray-800 dark:text-gray-200"
							>
								{name}
							</li>
						))}
					</ul>
				</div>
				<div>
					<p className="text-[10px] tracking-[.2em] uppercase font-semibold text-gray-400 dark:text-gray-500 mb-2">
						Design Community
					</p>
					<ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
						{communityRecognitions.map((name) => (
							<li
								key={name}
								className="text-sm text-gray-500 dark:text-gray-400"
							>
								{name}
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* Featured Apps & Sites — horizontal scroll cards matching homepage */}
			{featuredApps.length > 0 && (
				<>
					<GroupTitle
						title="Featured Apps"
						subtitle="Products I design, build, and ship end to end."
					/>
					<ProjectCardRow items={featuredApps} />
				</>
			)}
			{featuredSites.length > 0 && (
				<>
					<GroupTitle
						title="Featured Sites"
						subtitle="Where I prototype the tools and AI workflows I bring to brand operations."
					/>
					<ProjectCardRow items={featuredSites} />
				</>
			)}

			{/* Closing CTA */}
			<section
				aria-label="Get in touch"
				className="mt-16 mb-12 rounded-xl border border-gray-200 dark:border-gray-700 px-6 py-8 text-center"
			>
				<h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
					Need a brand that stays consistent at scale? Let&rsquo;s talk.
				</h2>
				<div className="mt-5 flex flex-wrap justify-center gap-3">
					<a
						href="/portfolio/resume-greg-robleto.pdf"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center rounded-full bg-gray-900 dark:bg-gray-100 px-5 py-2 text-sm font-semibold text-white dark:text-gray-900 hover:opacity-90 transition-opacity"
					>
						Download résumé (PDF)
					</a>
					<a
						href="mailto:hello@robleto.com"
						className="inline-flex items-center rounded-full border border-gray-300 dark:border-gray-600 px-5 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200 hover:border-gray-500 dark:hover:border-gray-400 transition-colors"
					>
						Email hello@robleto.com
					</a>
				</div>
				<SocialLinks
					only={["LinkedIn", "GitHub", "Dribbble", "CodePen", "Medium"]}
					center
					iconClassName="!text-xl"
					className="mt-6"
				/>
			</section>
		</div>
	);
}
