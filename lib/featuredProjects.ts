import { sortByOrder } from "@/utils/sortItems";

// "Featured Apps" — hand-picked, in display order
export const featuredAppSlugs = ["galacticweather", "reawarding", "giftinglist"];

// "Featured Sites" — pinned slugs lead the row and trailing slugs close it,
// regardless of Notion tags; every other Side-Project sits between them in
// Notion sort order, minus anything hidden
export const pinnedSiteSlugs = [
	"brandmarks",
	"creativemadness",
	"meeplego",
	"elsewhere-yearly",
	"holyshirtballs",
];
export const trailingSiteSlugs = ["margin-call-me"];
export const hiddenProjectSlugs: string[] = []; // slugs to keep off the site, e.g. while a site is down

type ProjectLike = { slug?: string; tags?: string[]; active?: boolean };

const bySlugs = <T extends ProjectLike>(items: T[], slugs: string[]): T[] =>
	slugs
		.map((slug) => items.find((item) => item.slug === slug))
		.filter((item): item is T => Boolean(item));

const isSideProject = (item: ProjectLike) =>
	Array.isArray(item.tags) && item.tags.includes("Side-Project");

export const getFeaturedApps = <T extends ProjectLike>(items: T[]): T[] =>
	bySlugs(items, featuredAppSlugs);

export const getFeaturedSites = <T extends ProjectLike>(items: T[]): T[] => {
	const placed = [
		...featuredAppSlugs,
		...pinnedSiteSlugs,
		...trailingSiteSlugs,
		...hiddenProjectSlugs,
	];
	return [
		...bySlugs(items, pinnedSiteSlugs),
		...sortByOrder(
			items.filter((item) => isSideProject(item) && !placed.includes(item.slug ?? ""))
		),
		...bySlugs(items, trailingSiteSlugs),
	];
};

// Projects page: every Active project with a slug, minus hidden ones —
// Featured Apps, then Featured Sites, then other work (full-time, freelance)
// in Notion sort order
export const getAllProjects = <T extends ProjectLike>(items: T[]): T[] => {
	const apps = getFeaturedApps(items);
	const sites = getFeaturedSites(items);
	const placed = new Set([...apps, ...sites]);
	const rest = sortByOrder(
		items.filter(
			(item) =>
				item.active &&
				Boolean(item.slug) &&
				!placed.has(item) &&
				!hiddenProjectSlugs.includes(item.slug ?? "")
		)
	);
	return [...apps, ...sites, ...rest];
};
