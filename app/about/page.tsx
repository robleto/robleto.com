import React from "react";
import Link from "next/link";
import GroupTitle from "@/app/_components/views/common/GroupTitle";
import SocialLinks from "@/app/_components/views/common/SocialLinks";

// About is written for someone deciding whether to hire, book, or partner:
// positioning, proof, what to ask for, then the personal note. Copy lives here
// (like /portfolio) rather than in Notion so it is reviewed before it ships.

export const generateMetadata = () => ({
	title: "About — Greg Robleto",
	description:
		"Creative leader across brand, marketing and product at Motley Fool Asset Management. 20 years designing for investing and asset management.",
});

type Proof = { year: string; text: string; href?: string; linkText?: string };

const proofPoints: Proof[] = [
	{
		year: "Now",
		text: "Own the brand system at Motley Fool Asset Management, built so the compliant, on-brand choice is also the fastest one for in-house teams, contractors, and agencies.",
		href: "/portfolio/brand-governance-system",
		linkText: "Case study",
	},
	{
		year: "2024",
		text: "Designed the MFAM billboard that ran in Times Square.",
	},
	{
		year: "2021",
		text: "Led design and development of The Motley Fool's design system, a Storybook component library.",
		href: "/portfolio/design-system",
		linkText: "Case study",
	},
	{
		year: "2021",
		text: "First designer nominated to The Motley Fool Hall of Fame.",
	},
	{
		year: "2020",
		text: "Led the roll-out of The Motley Fool's enterprise-wide global rebrand.",
		href: "/portfolio/rebranding",
		linkText: "Case study",
	},
	{
		year: "2020",
		text: "Rebuilt the design function at The Motley Fool: process, philosophy, and a team of 10.",
	},
];

type Topic = { title: string; text: string; href?: string };

const topics: Topic[] = [
	{
		title: "Design before the prompt",
		text: "Where a designer's judgment goes once AI can produce both the artifacts and the systems.",
		href: "/posts/building-the-boundaries-design-has-moved-to-before-the-prompt",
	},
	{
		title: "Brand under compliance",
		text: "Building trust and speed in regulated marketing, without treating review as the enemy.",
		href: "/posts/designing-trust-in-financial-products",
	},
	{
		title: "Design systems as governance",
		text: "Getting in-house teams, contractors, and agencies to ship one brand.",
	},
];

const linkClass =
	"font-semibold text-link dark:text-lightlink hover:underline underline-offset-4";

export default function AboutPage() {
	return (
		<div>
			{/* Page header -- same pattern as PageHeader on Projects, with static copy */}
			<div className="flex flex-col z-10 lg:w-auto align-left justify-center relative mx-auto py-25 transition-all duration-300 min-h-[25rem]">
				<h1 className="text-xl relative md:text-2xl font-medium uppercase tracking-[.25rem] text-gray-800 dark:text-gray-200 flex items-center">
					<img
						src="/_icons/about.svg"
						alt=""
						className="h-10 w-10 svg-icon mr-2"
					/>
					About Greg
				</h1>
				<section className="relative font-medium text-md md:text-lg mx-auto mt-0 md:pr-[30%] leading-5 md:leading-6 text-gray-800 dark:text-gray-200">
					<p className="my-4">
						Creative leader across brand, marketing &amp; product at Motley Fool
						Asset Management. 20 years in investing and asset
						management.
					</p>
				</section>
			</div>

			{/* What I do */}
			<section
				aria-label="What I do"
				className="md:pr-[20%] space-y-4 text-base leading-relaxed text-gray-700 dark:text-gray-300"
			>
				<p>
					I think the most important design work now happens before
					anything gets made.
				</p>
				<p>
					AI can produce the artifact, and increasingly the system
					behind it. What it can&rsquo;t do is decide what a brand
					stands for, what it will and won&rsquo;t say, and where the
					edges are. In regulated finance that was always the job.
					Review just made it visible.
				</p>
				<p>
					So that is where I spend my time: setting the boundaries that
					let designers, contractors, agencies, and AI tools move fast
					and still ship one brand.
				</p>
				<p>
					I also still build. I code components, ship apps, and
					prototype the AI workflows I later bring to the team. The{" "}
					<Link href="/projects" className={linkClass}>
						side projects
					</Link>{" "}
					on this site are where that practice happens.
				</p>
			</section>

			{/* Proof */}
			<GroupTitle title="Selected Proof" as="h2" />
			<ul className="mb-12 divide-y divide-gray-100 dark:divide-gray-800">
				{proofPoints.map((item) => (
					<li
						key={item.text}
						className="grid grid-cols-[3.5rem_1fr] gap-4 py-3 text-base text-gray-800 dark:text-gray-200"
					>
						<span className="text-xs uppercase tracking-[.2em] font-semibold text-gray-500 dark:text-gray-400 pt-1">
							{item.year}
						</span>
						<span>
							{item.text}
							{item.href && (
								<>
									{" "}
									<Link href={item.href} className={`${linkClass} text-sm`}>
										{item.linkText} &rarr;
									</Link>
								</>
							)}
						</span>
					</li>
				))}
			</ul>

			{/* Speaking and advising */}
			<GroupTitle
				title="Speaking & Advising"
				subtitle="Three subjects I can speak on or help a team work through."
				as="h2"
			/>
			<ul className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
				{topics.map((topic) => (
					<li
						key={topic.title}
						className="rounded-xl border border-gray-200 dark:border-gray-700 p-5"
					>
						<h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
							{topic.title}
						</h3>
						<p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
							{topic.text}
						</p>
						{topic.href && (
							<Link
								href={topic.href}
								className={`${linkClass} mt-3 inline-block text-sm`}
							>
								Read the essay &rarr;
							</Link>
						)}
					</li>
				))}
			</ul>
			<p className="mb-12 md:pr-[20%] text-sm leading-relaxed text-gray-600 dark:text-gray-400">
				I&rsquo;ve taught design courses through 2U, mentored designers at
				the University of Delaware, and advised a software CEO on design
				systems.
			</p>

			{/* How I got here */}
			<GroupTitle title="How I Got Here" as="h2" />
			<div className="mb-12 md:pr-[20%] space-y-4 text-base leading-relaxed text-gray-700 dark:text-gray-300">
				<p>
					I&rsquo;ve performed at Walt Disney World, designed
					Wawa&rsquo;s website early in my career, co-founded the
					Delaware Shakespeare Festival, and spent twenty years at The
					Motley Fool. It looks like four careers. It is one: an
					audience, a script somebody else has to approve, and a show
					that still has to be good.
				</p>
				<p>
					Outside work I&rsquo;m a husband and a dad, I run Creative
					Madness, a studio and shop for my illustrations, and I make
					CSS art out of a single div, for reasons I can&rsquo;t fully
					defend.
				</p>
			</div>

			{/* Closing CTA */}
			<section
				aria-label="Get in touch"
				className="mt-16 mb-12 rounded-xl border border-gray-200 dark:border-gray-700 px-6 py-8 text-center"
			>
				<h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
					Hiring, booking a talk, or working through a brand problem?
					Let&rsquo;s talk.
				</h2>
				<div className="mt-5 flex flex-wrap justify-center gap-3">
					<a
						href="mailto:hello@robleto.com"
						className="inline-flex items-center rounded-full bg-gray-900 dark:bg-gray-100 px-5 py-2 text-sm font-semibold text-white dark:text-gray-900 hover:opacity-90 transition-opacity"
					>
						Email hello@robleto.com
					</a>
					<a
						href="/portfolio/resume-greg-robleto.pdf"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center rounded-full border border-gray-300 dark:border-gray-600 px-5 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200 hover:border-gray-500 dark:hover:border-gray-400 transition-colors"
					>
						Download résumé (PDF)
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
