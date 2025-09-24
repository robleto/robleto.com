import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import { HybridContentFetcher } from "@/lib/hybridContentFetcher";
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
	// Use hybrid fetcher for better performance
	const { pageContent: portfolioPageContent, listItems: portfolioListItems } = await HybridContentFetcher.getPortfolioItems();
  
	const { pageContent: projectsPageContent, listItems: projectsListItems } = await fetchNotionData({
		databaseId: process.env.NOTION_PROJECTS_DB_ID!,
		pageId: process.env.NOTION_PROJECTS_PAGE_ID!,
		entryType: "projects", // Use entryType to fetch mapped data
	});

	const projectItems =
		filterItemsByProperty(projectsListItems, "tags", "Side-Project") || [];

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
				pageContent={portfolioPageContent}
			/>
			{/* Case Study Gallery */}
			<GroupTitle title="Selected Work" />
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
			<div className="my-6"></div>
			<GroupTitle title="What Else I've Been Up To" />
			{/* Regular Gallery */}
			<Gallery
				mdGridCols="md:grid-cols-2"
				lgGridCols="lg:grid-cols-3"
				items={sortedProjectItems}
				descriptionKey="description"
				pageKey="projects"
				slugKey="slug"
				linkKey="url"
			/>

			<div className="my-6"></div>
			<GroupTitle title="About Me" />

			<div className="relative flex justify-center items-center">
				<img
					src={`/_brand/greg-ai.jpg`}
					alt="Greg Robleto"
					className="h-20 w-20 rounded-full"
				></img>
			</div>
			<p className="md:px-[10%] my-4">
				Hi, I'm Greg Robleto, a Creative Art Director with 25 years of
				experience leading teams in marketing, product, UX, development,
				and branding. I specialize in creating products, experiences,
				campaigns, and brands that balance business goals with user
				needs. Currently, I'm based in Rockville, Maryland, working at
				Motley Fool Wealth Management.
			</p>
			<p className="md:px-[10%] my-4">
				My focus is on aligning business objectives with cutting-edge,
				AI-driven design to create seamless experiences that bridge UX,
				product, and marketing.
			</p>
			<p className="md:px-[10%] my-4">
				<strong className="block">
					🌟 Driving AI-Enhanced UX Design
				</strong>
				I integrate AI into design systems to deliver personalized,
				adaptive user experiences that provide competitive business
				advantages. By fostering cross-functional collaboration, I
				empower teams to create innovative, impactful solutions.
			</p>
			<p className="md:px-[10%] my-4">
				<strong className="block">
					🎉 Shaping Cohesive Brand Strategies
				</strong>
				From leading company-wide rebrands to developing unified design
				systems, I've driven brand transformation across multiple
				business lines. My efforts have enhanced brand consistency,
				improved efficiency, and significantly reduced time-to-market.
			</p>
			<p className="md:px-[10%] my-4">
				<strong className="block">
					👏 Fostering Collaboration for Results
				</strong>
				I believe in uniting design, business, and technology teams
				around shared goals. This collaborative approach breaks down
				silos, aligns visions, and delivers industry-leading results.
			</p>
			<p className="md:px-[10%] my-4">
				At the heart of my philosophy is the belief that impactful
				design stems from innovation and collaboration. Through
				strategic vision and hands-on leadership, I help teams thrive,
				innovate, and redefine industry standards.
			</p>
			<GroupTitle title="As Recognized In" />
			<div className="flex flex-wrap md:px-[10%]">
				<div className="w-full sm:w-1/2 p-2 sm:text-right">
					<h3 className="text-sm font-bold">Wall Street Journal</h3>
				</div>
				<div className="w-full sm:w-1/2 p-2">
					<h3 className="text-sm font-bold">CSS Weekly</h3>
				</div>
				<div className="w-full sm:w-1/2 p-2 sm:text-right">
					<h3 className="text-sm font-bold">CodePen Spark</h3>
				</div>
				<div className="w-full sm:w-1/2 p-2">
					<h3 className="text-sm font-bold">CodePen Trending</h3>
				</div>
				<div className="w-full sm:w-1/2 p-2 sm:text-right">
					<h3 className="text-sm font-bold">CSS Winner</h3>
				</div>
				<div className="w-full sm:w-1/2 p-2">
					<h3 className="text-sm font-bold">Popular on Dribbble</h3>
				</div>
				<div className="w-full sm:w-1/2 p-2 sm:text-right">
					<h3 className="text-sm font-bold">UX Collective</h3>
				</div>
				<div className="w-full sm:w-1/2 p-2">
					<h3 className="text-sm font-bold">Medium Trending</h3>
				</div>
				<div className="w-full sm:w-1/2 p-2 sm:text-right">
					<h3 className="text-sm font-bold">
						Leaders of Awesomeness
					</h3>
				</div>
				<div className="w-full sm:w-1/2 p-2">
					<h3 className="text-sm font-bold">CSS Author</h3>
				</div>
				<div className="w-full sm:w-1/2 p-2 sm:text-right">
					<h3 className="text-sm font-bold">Dev Community</h3>
				</div>
				<div className="w-full sm:w-1/2 p-2">
					<h3 className="text-sm font-bold">Business Wire</h3>
				</div>
				<div className="w-full sm:w-1/2 p-2 sm:text-right">
					<h3 className="text-sm font-bold">Nasdaq</h3>
				</div>
				<div className="w-full sm:w-1/2 p-2">
					<h3 className="text-sm font-bold">AOL</h3>
				</div>
				<div className="w-full sm:w-1/2 p-2 sm:text-right">
					<h3 className="text-sm font-bold">Yahoo! News</h3>
				</div>
				<div className="w-full sm:w-1/2 p-2">
					<h3 className="text-sm font-bold">
						Delaware Shakespeare Canada
					</h3>
				</div>
			</div>
			<GroupTitle title="From the Archives" />
			<div className="grid grid-cols-4 gap-2">
				<div className="flex flex-col p-4">
					<a
						href="https://medium.com/@robleto/stock-scorecards-9a00c0cf1157"
						className="text-sm font-bold hover:underline"
					>
						Stock Scorecards
					</a>
					<p className="text-sm">
						A tool for organizing and tracking your portfolio that
						meets user needs while improving retention.
					</p>
				</div>
				<div className="flex flex-col p-4">
					<a
						href="https://medium.com/@robleto/motley-fool-premium-99f191e35612"
						className="text-sm font-bold hover:underline"
					>
						Motley Fool Premium
					</a>
					<p className="text-sm">
						Migrating 18 services into new applications introduces a
						whole new way to use the product.
					</p>
				</div>
				<div className="flex flex-col p-4">
					<a
						href="https://medium.com/@robleto/best-stocks-to-buy-10dfcc971929"
						className="text-sm font-bold hover:underline"
					>
						Best Stocks to Buy
					</a>
					<p className="text-sm">
						Taking a pull approach to an ingrained push model to meet users when they want to find new stock ideas.
					</p>
				</div>
				<div className="flex flex-col p-4">
					<a
						href="https://medium.com/@robleto/portfolio-frameworks-a5f612dceb9c"
						className="text-sm font-bold hover:underline"
					>
						Portfolio Frameworks
					</a>
					<p className="text-sm">
						Listening to members dissatisfaction with the  products rigidity led to finding a creative new approach.
					</p>
				</div>
			</div>
		</div>
	);
}
