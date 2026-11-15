import React from "react";
import Link from "next/link";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import ArtHeader from "@/app/_components/views/art/ArtHeader";
import ArtCardRow, { type ArtItem } from "@/app/_components/views/art/ArtCardRow";
import GroupTitle from "@/app/_components/views/common/GroupTitle";

export const generateMetadata = () => ({
	title: "Art — Greg Robleto",
	description:
		"Three ways I make images: art built in CSS, AI-prompted fictional travel posters, and hand-drawn fictional transit maps.",
});

type Collection = {
	title: string;
	description: string;
	href: string;
	folder: string;
	databaseId?: string;
};

const collections: Collection[] = [
	{
		title: "CSS Art",
		description: "Built entirely in code, one HTML div at a time.",
		href: "/art/css",
		folder: "",
		databaseId: process.env.NOTION_ART_DB_ID,
	},
	{
		title: "Digital Art",
		description: "Fictional transit maps, drawn by hand in the style of the DC Metro.",
		href: "/art/digital",
		folder: "digital",
		databaseId: process.env.NOTION_DIGITALART_DB_ID,
	},
	{
		title: "AI-Assisted Art",
		description: "Fictional travel posters, made by prompting for a style.",
		href: "/art/ai",
		folder: "ai",
		databaseId: process.env.NOTION_AIART_DB_ID,
	},
];

// Show featured work when a collection has any, otherwise the first few pieces.
const pickRowItems = (items: any[]): ArtItem[] => {
	const featured = items.filter((item) => item.featured);
	return (featured.length > 0 ? featured : items).slice(0, 8);
};

const loadItems = async (databaseId?: string): Promise<any[]> => {
	if (!databaseId) return [];
	try {
		const { listItems } = await fetchNotionData({ databaseId, entryType: "art" });
		return listItems as any[];
	} catch (error) {
		console.error("Error loading art collection:", error);
		return [];
	}
};

export default async function ArtPage() {
	const loaded = await Promise.all(collections.map((c) => loadItems(c.databaseId)));

	return (
		<div>
			<ArtHeader title="Art" icon="art">
				<p>Three different ways of making images, each with its own reason for existing.</p>
			</ArtHeader>

			{collections.map((collection, index) => {
				const items = pickRowItems(loaded[index]);
				return (
					<section key={collection.title} aria-label={collection.title} className="mb-14">
						<GroupTitle
							title={collection.title}
							subtitle={collection.description}
							variant="left"
							as="h2"
						/>
						{items.length > 0 ? (
							<ArtCardRow items={items} folder={collection.folder} />
						) : (
							<p className="text-sm text-gray-500 dark:text-gray-400">Coming soon.</p>
						)}
						<p className="mt-4 text-sm">
							<Link
								href={collection.href}
								className="font-semibold text-link dark:text-lightlink hover:underline underline-offset-4"
							>
								See all {collection.title} &rarr;
							</Link>
						</p>
					</section>
				);
			})}
		</div>
	);
}
