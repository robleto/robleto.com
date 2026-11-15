import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import ArtHeader from "@/app/_components/views/art/ArtHeader";
import Gallery from "@/app/_components/views/gallery/Gallery";

export const generateMetadata = () => ({
	title: "AI Art — Greg Robleto",
	description: "Fictional travel posters made by prompting for a style, which became an Etsy shop.",
});

export default async function AiArtPage() {
	const { listItems } = process.env.NOTION_AIART_DB_ID
		? await fetchNotionData({ databaseId: process.env.NOTION_AIART_DB_ID, entryType: "art" })
		: { listItems: [] as any[] };

	return (
		<div>
			<ArtHeader title="AI Art" icon="art">
				<p>
					I wanted to see whether a style could be found through prompts
					alone. The fictional travel poster is the genre I keep returning
					to, so I used it as the test.
				</p>
				<p>
					The goal is a simplified, impressionist watercolour look with bold
					colour, built as a skill I can reuse. The posters grew into an
					Etsy shop, which I never planned.
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
