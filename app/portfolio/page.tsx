import React from "react";
import { HybridContentFetcher } from "@/lib/hybridContentFetcher";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import { sortByOrder } from "@/utils/sortItems";
import { filterItemsByProperty } from "@/utils/filterItems";
import Image from "next/image";
import Link from "next/link";
import WritingList from "@/app/_components/views/home/WritingList";
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

// "Featured Apps" — hand-picked, in display order
const featuredAppSlugs = ["swweather", "reawarding", "giftinglist"];
// "Featured Sites" — pinned slugs lead the row and trailing slugs close it,
// regardless of Notion tags; every other Side-Project sits between them in
// Notion sort order, minus anything hidden below
const pinnedSiteSlugs = ["brandmarks", "creativemadness", "meeplego", "elsewhere-yearly", "holyshirtballs"];
const trailingSiteSlugs = ["margin-call-me"];
const hiddenProjectSlugs = ["lightsabers"]; // lightsabers.art is down
const AI_TOOL_TAGS = ["Claude", "ChatGPT"];

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

	// Side projects — Featured Apps are hand-picked; Featured Sites are the
	// pinned slugs (even if untagged), then every other Side-Project in Notion
	// sort order
	const allProjectItems =
		projectsData.status === "fulfilled" ? projectsData.value.listItems : [];
	const bySlugs = (slugs: string[]) =>
		slugs
			.map((slug) => allProjectItems.find((item: any) => item.slug === slug))
			.filter(Boolean);
	const featuredApps = bySlugs(featuredAppSlugs);
	const placedSlugs = [
		...featuredAppSlugs,
		...pinnedSiteSlugs,
		...trailingSiteSlugs,
		...hiddenProjectSlugs,
	];
	const featuredSites = [
		...bySlugs(pinnedSiteSlugs),
		...sortByOrder(
			(filterItemsByProperty(allProjectItems, "tags", "Side-Project") || []).filter(
				(item: any) => !placedSlugs.includes(item.slug)
			)
		),
		...bySlugs(trailingSiteSlugs),
	];

	// Card chip: show the tool used (AI tools first) instead of "Side-Project"
	const projectChip = (tags: string[]) => {
		const tools = tags.filter((tag) => tag !== "Side-Project");
		return tools.find((tag) => AI_TOOL_TAGS.includes(tag)) ?? tools[0] ?? null;
	};

	// Horizontal-scroll card row shared by Featured Apps and Featured Sites
	const projectRow = (items: any[]) => (
		<div className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
			<div className="flex gap-4 snap-x snap-mandatory">
				{items.map((item: any) => {
					// No URL: render the card unlinked (there is no /projects/[slug] route)
					let href = item.url && item.url !== "#" ? item.url : "";

					if (href && /^www\./i.test(href)) {
						href = `https://${href}`;
					}

					// Prefer the local image: Notion file URLs are presigned and expire
					// after ~1h, which breaks on statically cached pages.
					const imageSrc = (item.slug ? `/projects/${item.slug}.png` : "") || item.image || "";
					const isExternal = /^https?:\/\//i.test(href);
					const chip = projectChip(Array.isArray(item.tags) ? item.tags : []);

					const card = (
						<article className="motion-card h-[18.5rem] rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg group-hover:shadow-xl border border-gray-100 dark:border-gray-700">
							<div className="h-32 w-full bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
								{imageSrc ? (
									<Image
										src={imageSrc}
										alt={item.title || "Project image"}
										fill
										sizes="(max-width: 640px) 240px, 256px"
										quality={60}
										loading="lazy"
										className="motion-card-media object-cover"
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
									{chip ? (
										<span className="inline-flex items-center rounded-full border border-gray-300 dark:border-gray-600 px-2 py-0.5 text-[10px] tracking-wide uppercase text-gray-600 dark:text-gray-300">
											{chip}
										</span>
									) : null}
								</div>
							</div>
						</article>
					);

					return (
						<div key={item.id} className="snap-start w-[15rem] sm:w-[16rem] shrink-0 group">
							{!href ? (
								card
							) : isExternal ? (
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
	);

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
					{projectRow(featuredApps)}
				</>
			)}
			{featuredSites.length > 0 && (
				<>
					<GroupTitle
						title="Featured Sites"
						subtitle="Where I prototype the tools and AI workflows I bring to brand operations."
					/>
					{projectRow(featuredSites)}
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
