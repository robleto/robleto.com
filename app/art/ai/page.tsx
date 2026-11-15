import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import ArtHeader from "@/app/_components/views/art/ArtHeader";
import Gallery from "@/app/_components/views/gallery/Gallery";

export const generateMetadata = () => ({
	title: "AI-Assisted Art — Greg Robleto",
	description: "Fictional travel posters made by prompting for a style, which became an Etsy shop.",
});

export default async function AiArtPage() {
	const { listItems } = process.env.NOTION_AIART_DB_ID
		? await fetchNotionData({ databaseId: process.env.NOTION_AIART_DB_ID, entryType: "art" })
		: { listItems: [] as any[] };

	return (
		<div>
			<ArtHeader title="AI-Assisted Art" icon="ai">
					<p className="my-4">
					I tested whether prompts alone could produce a style, using
					fictional travel posters. The target is an impressionist watercolour
					look with bold colour, packaged as a reusable skill. The posters
					became an Etsy shop, which I hadn't planned.
				</p>
			</ArtHeader>

			{listItems.length > 0 ? (
				<Gallery
					items={listItems as any[]}
					mdGridCols="md:grid-cols-2"
					lgGridCols="lg:grid-cols-2"
					slugKey="slug"
					pageKey="art/ai"
					linkKey="url"
					animatedKey="animated"
				/>
			) : (
				<p className="text-gray-500 dark:text-gray-400">Coming soon.</p>
			)}
		</div>
	);
}
