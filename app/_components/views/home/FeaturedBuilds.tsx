import React from "react";
import GroupTitle from "@/app/_components/views/common/GroupTitle";
import ProjectCardRow from "@/app/_components/views/common/ProjectCardRow";
import { HybridContentFetcher } from "@/lib/hybridContentFetcher";
import { getFeaturedApps, getFeaturedSites } from "@/lib/featuredProjects";
import { shuffleItems } from "@/utils/sortItems";
import type { ProjectItem } from "@/types";

// Home page builds: Featured Apps in fixed order, then Featured Sites shuffled
// for random discovery. Selection lives in lib/featuredProjects.
const FeaturedBuilds = async () => {
	const { listItems } = await HybridContentFetcher.getAllProjects();
	const projectItems = listItems as ProjectItem[];
	const apps = getFeaturedApps(projectItems);
	const sites = shuffleItems(getFeaturedSites(projectItems));

	return (
		<section id="featured-builds" className="scroll-mt-24" aria-label="Featured builds">
			{apps.length > 0 && (
				<>
					<GroupTitle title="Featured Apps" />
					<ProjectCardRow items={apps} />
				</>
			)}
			{sites.length > 0 && (
				<>
					<GroupTitle title="Featured Sites" />
					<ProjectCardRow items={sites} />
				</>
			)}
		</section>
	);
};

export default FeaturedBuilds;
