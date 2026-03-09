import React from "react";
import { HybridContentFetcher } from "@/lib/hybridContentFetcher";
import { sortByPinnedAndDate } from "@/utils/sortItems";
import Gallery from "@/app/_components/views/gallery/Gallery";
import GroupTitle from "@/app/_components/views/common/GroupTitle";
import FeaturedBuilds from "@/app/_components/views/home/FeaturedBuilds";
import SocialLinks from "@/app/_components/views/common/SocialLinks";
import { GalleryLoading } from "@/app/_components/common/Loading";
import type { PostItem } from "@/types";

// Slugs pinned to the top of the homepage Writing section.
// Add or remove slugs here to control featured order; remaining posts follow by recency.
const pinnedPostSlugs: string[] = [
	"making-the-most-out-of-mulch-stay-with-me",
];

export default async function HomePage() {
	try {
		// Use hybrid fetcher for performance-critical content (posts)
		// and direct Notion API for less critical content
		const [postData] = await Promise.allSettled([
			HybridContentFetcher.getAllPosts(),
		]);

		const postItems: PostItem[] = postData.status === 'fulfilled' 
			? postData.value.listItems 
			: [];

		// Apply local pinning: mark any post whose slug is in pinnedPostSlugs as isPinned
		const postItemsWithPins = postItems.map((post) => ({
			...post,
			isPinned: pinnedPostSlugs.includes(post.slug ?? "") || post.isPinned,
		}));

		const isSignalsOfDesign = (series?: string) =>
			typeof series === "string" &&
			series.trim().toLowerCase() === "signals of design";

		const signalItems = sortByPinnedAndDate(
			postItemsWithPins.filter((post) => isSignalsOfDesign(post.series)),
			"pubdate"
		).slice(0, 4);

		const postItemsSorted = sortByPinnedAndDate(postItemsWithPins, "pubdate");
		const signalItemIds = new Set(signalItems.map((item) => item.id));
		const firstFourBlogPosts = postItemsSorted
			.filter((post) => !signalItemIds.has(post.id))
			.slice(0, 4);

		return (
			<div>
				<div
					className="flex flex-col align-left relative justify-center
					mx-auto py-25 transition-all duration-300 min-h-[25rem]"
				>
					<div className="flex items-center">
						<img
							src={`/_brand/greg-ai.jpg`}
							alt="Greg Robleto"
							className="h-20 w-20 rounded-full mr-5"
						/>
						<h1 className="relative flex items-center">
							<span className="text-2xl md:text-3xl font-bold uppercase tracking-[.25rem] text-gray-800 dark:text-gray-200">
								Greg Robleto
							</span>
						</h1>
					</div>
					<section className="notion-page-content -z-10 relative font-medium text-md md:text-lg mx-auto mt-4 pr-[30%] md:pr-[20%] leading-5 md:leading-6 text-gray-800 dark:text-gray-200">
						Design and product leader working at the intersection of
						finance, brand, and digital platforms—based in
						Rockville, Maryland and exploring how design, systems,
						and AI shape the future of financial products.
					</section>
					<p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
						Design Director at Motley Fool Asset Management.
					</p>

					<SocialLinks className="mt-5 z-10" />
				</div>

				<FeaturedBuilds />

				{signalItems.length > 0 ? (
					<>
						<GroupTitle title="Signals" />
						<Gallery
							items={signalItems}
							mdGridCols="md:grid-cols-2"
							lgGridCols="lg:grid-cols-2"
							pageKey="posts"
							slugKey="slug"
							linkKey="url"
							dateFormat="month-year"
						/>
					</>
				) : (
					<>
						<GroupTitle title="Signals" />
						<GalleryLoading />
					</>
				)}

				{firstFourBlogPosts.length > 0 ? (
					<>
						<GroupTitle title="Writing" />
						<Gallery
							items={firstFourBlogPosts}
							mdGridCols="md:grid-cols-2"
							lgGridCols="lg:grid-cols-2"
							pageKey="posts"
							slugKey="slug"
							linkKey="url"
							dateFormat="month-year"
						/>
					</>
				) : (
					<>
						<GroupTitle title="Writing" />
						<GalleryLoading />
					</>
				)}
			</div>
		);
	} catch (error) {
		console.error('Error loading homepage:', error);
		
		// Return error fallback UI
		return (
			<div className="my-16 pb-16 lg:my-24 max-w-7xl mx-auto px-4 lg:px-8">
				<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
					<h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">
						Unable to load content
					</h2>
					<p className="text-red-600 dark:text-red-300 mb-4">
						We're having trouble loading the homepage content. Please try refreshing the page.
					</p>
					<details className="mt-4">
						<summary className="text-sm font-medium text-red-700 dark:text-red-300 cursor-pointer">
							Technical details
						</summary>
						<pre className="mt-2 text-xs text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 p-2 rounded">
							{error instanceof Error ? error.message : 'Unknown error occurred'}
						</pre>
					</details>
				</div>
			</div>
		);
	}
}
