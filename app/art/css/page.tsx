import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import ArtHeader from "@/app/_components/views/art/ArtHeader";
import Gallery from "@/app/_components/views/gallery/Gallery";
import { filterItemsByProperty } from "@/utils/filterItems";
import { sortByPinnedAndDate } from "@/utils/sortItems";

export const generateMetadata = () => ({
	title: "CSS Art — Greg Robleto",
	description: "Artwork built entirely in CSS, one HTML div at a time.",
});

export default async function CssArtPage() {
	const { listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_ART_DB_ID!,
		entryType: "art",
	});

	const featuredItems = filterItemsByProperty(listItems, "featured", true);
	const regularItems = sortByPinnedAndDate(
		filterItemsByProperty(listItems, "featured", false),
		"date"
	);

	return (
		<div>
			<ArtHeader title="CSS Art" icon="css">
				<p>
					Every piece is built in CSS alone: shapes, layers and gradients on a single HTML div, with no images and no exports. It's slow and complex, and it has no practical use. That's exactly why I keep coming back to it.
				</p>
			</ArtHeader>

			<Gallery
				items={featuredItems}
				smGridCols="sm:grid-cols-1"
				mdGridCols="md:grid-cols-2"
				lgGridCols="lg:grid-cols-2"
				slugKey="slug"
				pageKey="art"
				linkKey="url"
				animatedKey="animated"
			/>

			<div className="my-6"></div>

			<Gallery
				items={regularItems}
				pageKey="art"
				slugKey="slug"
				linkKey="url"
				animatedKey="animated"
			/>
		</div>
	);
}
