import { sortByOrder } from "@/utils/sortItems";

// "Featured Apps" — hand-picked, in display order
export const featuredAppSlugs = ["swweather", "reawarding", "giftinglist"];

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
export const hiddenProjectSlugs = ["lightsabers"]; // lightsabers.art is down

type ProjectLike = { slug?: string; tags?: string[] };

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
