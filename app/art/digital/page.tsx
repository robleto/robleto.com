import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import ArtHeader from "@/app/_components/views/art/ArtHeader";
import Gallery from "@/app/_components/views/gallery/Gallery";

export const generateMetadata = () => ({
	title: "Digital Art — Greg Robleto",
	description: "Fictional transit maps drawn by hand in the style of the DC Metro.",
});

export default async function DigitalArtPage() {
	const { listItems } = process.env.NOTION_DIGITALART_DB_ID
		? await fetchNotionData({ databaseId: process.env.NOTION_DIGITALART_DB_ID, entryType: "art" })
		: { listItems: [] as any[] };

	return (
		<div>
			<ArtHeader title="Digital Art" icon="digital">
				<p>
					I love maps, and stories so vast they need a map at the front of the book. These pieces imagine those lands with mass transit, drawn in the style of the DC Metro. Every line and station is placed by hand. The prints are now <a href="https://creativemadness.studio/collections/metro-maps" target="_blank">available in the shop</a>.
				</p>
			</ArtHeader>

			{listItems.length > 0 ? (
				<Gallery
					items={listItems as any[]}
					mdGridCols="md:grid-cols-2"
					lgGridCols="lg:grid-cols-2"
					slugKey="slug"
					pageKey="art/digital"
					linkKey="url"
					animatedKey="animated"
				/>
			) : (
				<p className="text-gray-500 dark:text-gray-400">Coming soon.</p>
			)}
		</div>
	);
}
