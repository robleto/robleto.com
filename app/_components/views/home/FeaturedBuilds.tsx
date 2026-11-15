import React from "react";
import Link from "next/link";
import GroupTitle from "@/app/_components/views/common/GroupTitle";
import ProjectCardRow from "@/app/_components/views/common/ProjectCardRow";
import { HybridContentFetcher } from "@/lib/hybridContentFetcher";
import { getFeaturedApps, getFeaturedSites } from "@/lib/featuredProjects";
import { shuffleItems } from "@/utils/sortItems";
import type { ProjectItem } from "@/types";

type FeaturedBuildsProps = {
	/** Show only the first N sites, in pinned order (see lib/featuredProjects).
	 *  Omit to show every site, shuffled for random discovery. */
	siteLimit?: number;
};

// Home page builds: Featured Apps in fixed order, then Featured Sites.
// Selection lives in lib/featuredProjects.
const FeaturedBuilds = async ({ siteLimit }: FeaturedBuildsProps = {}) => {
	const { listItems } = await HybridContentFetcher.getAllProjects();
	const projectItems = listItems as ProjectItem[];
	const apps = getFeaturedApps(projectItems);
	const allSites = getFeaturedSites(projectItems);
	const sites =
		typeof siteLimit === "number"
			? allSites.slice(0, siteLimit)
			: shuffleItems(allSites);

	return (
		<section id="featured-builds" className="scroll-mt-24" aria-label="Featured builds">
			{apps.length > 0 && (
				<>
					<GroupTitle
						title="Featured Apps"
						subtitle="Products I design, build, and ship end to end."
						as="h2"
					/>
					<ProjectCardRow items={apps} />
				</>
			)}
			{sites.length > 0 && (
				<>
					<GroupTitle
						title="Featured Sites"
						subtitle="Where I prototype the tools and AI workflows I bring to brand operations."
						as="h2"
					/>
					<ProjectCardRow items={sites} />
					{typeof siteLimit === "number" && allSites.length > sites.length && (
						<p className="mt-4 text-center text-sm">
							<Link
								href="/projects"
								className="font-semibold text-link dark:text-lightlink hover:underline"
							>
								All projects &rarr;
							</Link>
						</p>
					)}
				</>
			)}
		</section>
	);
};

export default FeaturedBuilds;
