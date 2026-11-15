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

// Case study slugs in preferred display order
const selectedCaseStudySlugs = [
	"brand-governance-system",
	"rebranding",
	"levels-project",
	"summer-of-tmfc",
	"ai-email",
	"brand-video",
	"webinar-rebuild",
	"design-team",
];

// Experience, leadership, and recognition quotes (from résumé and public recommendations)
const experience = [
	{
		title: "Head of Brand, Marketing & Product Design",
		org: "Motley Fool Asset Management",
		dates: "Jan 2023 – Present",
	},
	{
		title: "Brand, Creative & Product Leadership",
		org: "The Motley Fool",
		dates: "2006 – 2022",
		roles: [
			"Head of Brand Design and Identity, 2019–2021",
			"Head of Product Design & UX Research, 2020–2022",
			"Head of Digital Product Experience, 2016–2020",
			"Lead Brand Strategist, 2011–2012",
			"Head of Creative Services, 2009–2011",
		],
	},
	{
		title: "Design Faculty",
		org: "Ohio State University and Boston University",
		dates: "2008–2010, 2022–2023",
	},
];

const leadership = [
	{
		title: "Co-Founder, Managing Director & Board Member (Emeritus)",
		org: "Delaware Shakespeare Festival",
		dates: "2004 – 2024",
		note: "Built the brand and sponsorships behind a $500K+ annual budget.",
	},
	{
		title: "Board Member & Technical Advisor",
		org: "Rockville HSBC",
		dates: "2024 – Present",
		note: "Advise the board on design and technology strategy, optimizing digital comms and branding.",
	},
	{
		title: "Design Mentor",
		org: "University of Delaware, via Mentor Collective",
		dates: "2020 – 2023",
		note: "Mentored aspiring designers on portfolio development and career growth.",
	},
	{
		title: "Mentorship",
		org: "The Motley Fool",
		dates: "2016 – 2019",
		note: "Mentored 20+ developers, with 40% advancing to senior roles.",
	},
	{
		title: "Executive Leadership Development Program",
		org: "The Motley Fool",
		dates: "2008 – 2010",
		note: "Fellowship focused on leadership, strategy, finance, marketing, HR, and technology.",
	},
];

const recognitionQuotes = [
	{
		quote: "I think this is the best site redesign in Fool history.",
		attribution: "Tom G., CEO, 2015",
	},
	{
		quote: "You are an incredible leader, coach, and friend",
		attribution: "Holly F., UX Research Lead, 2022",
	},
	{
		quote:
			"Thank you for sharing our marketing work with our important stakeholders!",
		attribution: "Rebekah H., Dir. of Marketing, 2024",
	},
	{
		quote:
			"The graphics you created for our Nasdaq bell ringing were absolutely next level.",
		attribution: "Beth R., Director of Investor Relations, 2026",
	},
	{
		quote: "continually in awe of the breadth of skills you bring to the table",
		attribution: "Nate M., CTO, 2020",
	},
	{
		quote:
			"You are a respected leader at the company because you've earned it with your work.",
		attribution: "Lee B., Head of Culture & HR, 2015",
	},
	{
		quote:
			"I really appreciate your long and storied efforts that have created value for members",
		attribution: "David G., Co-Founder, 2009",
	},
	{
		quote: "you have been the best bosses",
		attribution: "Jenny M., Senior UX Designer, 2023",
	},
	{
		quote: "You've assembled a talented group and have been a terrific UX evangelist.",
		attribution: "Steve M., User Experience Designer, 2022",
	},
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
	"Wall Street Journal", "Nasdaq", "Yahoo! News", "Business Wire", "AOL", "The News Journal", "Delaware Today", "Technical.ly Philly",
];
const communityRecognitions = [
	"UX Collective", "CSS Weekly", "CodePen Spark", "CodePen Trending",
	"CSS Winner", "CSS Author", "CSS Tricks", "Pure CSS Artists", "Dev Community", "Medium Trending", "Leaders of Awesomeness", "Dribbble New and Noteworthy",
	"Popular on Dribbble", "BootCamp", "DomainsArrival",
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
	const featuredApps = getFeaturedApps(allProjectItems as any[]).filter(
		(app: any) => app.slug !== "galacticweather"
	);
	const featuredSites = getFeaturedSites(allProjectItems as any[]);
	const galacticWeather = (allProjectItems as any[]).filter(
		(item: any) => item.slug === "galacticweather"
	);
	const removedSlugs = [
		"margincallme",
		"margin-call-me",
		"chatgptroll",
		"lightsabers",
		"palindrome",
		"holyshirtballs",
		"heresthething",
		"elsewhere-yearly",
		"meeplego",
	];
	const leadSlugs = ["brandmarks", "cssart"];
	const combined = [...featuredApps, ...featuredSites, ...galacticWeather].filter(
		(item: any) => !removedSlugs.includes(item.slug)
	);
	const featuredRow = [
		...leadSlugs
			.map((slug) => combined.find((item: any) => item.slug === slug))
			.filter(Boolean),
		...combined.filter(
			(item: any) => !leadSlugs.includes(item.slug) && item.slug !== "galacticweather"
		),
		...combined.filter((item: any) => item.slug === "galacticweather"),
	];

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
				subline="Creative leader across brand, marketing and product at Motley Fool Asset Management."
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

			{/* Experience & Leadership */}
			<GroupTitle title="Experience" />
			<ul className="md:px-[10%] mb-12 divide-y divide-gray-200 dark:divide-gray-700">
				{experience.map((job) => (
					<li key={job.title + job.org} className="py-5">
						<p className="font-semibold text-gray-900 dark:text-gray-100">{job.title}</p>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							{job.org} · {job.dates}
						</p>
						{job.roles && (
							<ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300">
								{job.roles.map((role) => (
									<li key={role}>{role}</li>
								))}
							</ul>
						)}
					</li>
				))}
			</ul>

			<GroupTitle title="Leadership" />
			<ul className="md:px-[10%] mb-12 divide-y divide-gray-200 dark:divide-gray-700">
				{leadership.map((item) => (
					<li key={item.title} className="py-5">
						<p className="font-semibold text-gray-900 dark:text-gray-100">{item.title}</p>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							{item.org} · {item.dates}
						</p>
						<p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{item.note}</p>
					</li>
				))}
			</ul>

			{/* Recognition */}
			<GroupTitle title="Recognition" />
			<div className="mb-12 -mx-6 px-6 md:mx-0 md:px-[10%] overflow-x-auto snap-x snap-mandatory">
				<ul className="flex gap-4 pb-2">
					{recognitionQuotes.map((item) => (
						<li
							key={item.quote}
							className="snap-start shrink-0 w-72 md:w-80 flex"
						>
							<figure className="flex flex-col justify-between w-full rounded-xl border border-gray-200 dark:border-gray-700 p-6">
								<blockquote className="text-base font-medium leading-6 text-gray-900 dark:text-gray-100">
									&ldquo;{item.quote}&rdquo;
								</blockquote>
								<figcaption className="mt-4 text-xs text-gray-500 dark:text-gray-400">
									{item.attribution}
								</figcaption>
							</figure>
						</li>
					))}
				</ul>
			</div>
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

			{/* Featured work — one horizontal-scroll row */}
			{featuredRow.length > 0 && (
				<>
					<GroupTitle
						title="Side Projects"
						subtitle="Products and sites I design, build, and ship end to end."
					/>
					<ProjectCardRow items={featuredRow} />
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
