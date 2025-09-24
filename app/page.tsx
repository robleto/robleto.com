import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import { HybridContentFetcher } from "@/lib/hybridContentFetcher";
import { env } from "@/config/env";
import { validateNotionResponse } from "@/utils/validation";
import Lists from "@/app/_components/views/list/List";
import { sortByPinnedAndDate } from "@/utils/sortItems";
import FlippingWords from "@/app/_components/custom/FlippingWords";
import Gallery from "@/app/_components/views/gallery/Gallery";
import GroupTitle from "@/app/_components/views/common/GroupTitle";
import MiniCardView from "@/app/_components/views/mini-card/MiniCardSet";
import SocialLinks from "@/app/_components/views/common/SocialLinks";
import Loading, { GalleryLoading, ListLoading } from "@/app/_components/common/Loading";
import type { BaseItem, PostItem, ReadingListItem } from "@/types";

export default async function HomePage() {
	try {
		// Use hybrid fetcher for performance-critical content (posts)
		// and direct Notion API for less critical content
		const [aboutData, postData, readingListData] = await Promise.allSettled([
			fetchNotionData({
				databaseId: env.NOTION_ABOUT_DB_ID,
				entryType: "about",
			}),
			HybridContentFetcher.getAllPosts(),
			HybridContentFetcher.getAllReadinglist()
		]);

		// Handle potential errors (temporarily bypass validation)
		const aboutItems: BaseItem[] = aboutData.status === 'fulfilled' 
			? aboutData.value.listItems 
			: [];

		const postItems: PostItem[] = postData.status === 'fulfilled' 
			? postData.value.listItems 
			: [];

		const readingListItems: ReadingListItem[] = readingListData.status === 'fulfilled' 
			? readingListData.value.listItems 
			: [];

		// Sort and limit the data
		const limitedHomeItems = sortByPinnedAndDate(aboutItems, "date").slice(0, 4);
		const postItemsSorted = sortByPinnedAndDate(postItems, "pubdate");
		const firstTwoBlogPosts = postItemsSorted.slice(0, 2);
		const firstThreeReadingListPosts = readingListItems.slice(0, 4);

		return (
			<div>
				<div
					className="flex flex-col align-left relative justify-center
					mx-auto py-25 transition-all duration-300 min-h-[25rem]"
				>
					{/* Page Title */}
					<h1 className="relative flex items-center">
						<img
							src={`/_brand/greg-ai.jpg`}
							alt="Greg Robleto"
							className="h-20 w-20 rounded-full mr-5"
						/>
						<span className="text-2xl md:text-3xl font-bold uppercase tracking-[.25rem] text-gray-800 dark:text-gray-200">
							Greg Robleto
						</span>
					</h1>

					<section className="notion-page-content -z-10 relative font-medium text-md md:text-lg mx-auto mt-4 pr-[30%] md:pr-[20%] leading-5 md:leading-6 text-gray-800 dark:text-gray-200">
						A Creative Leader in UX, Brand Strategy and Product & Marketing Design, living in Rockville, Maryland, exploring how brand, design, and AI are pivotal tools through this era of digital transformation.
					</section>

					<SocialLinks className="mt-5 z-10" />
				</div>

				{limitedHomeItems.length > 0 ? (
					<>
						<GroupTitle title="Updates" />
						<Lists
							items={limitedHomeItems}
							pageKey="about"
							linkKey="url"
							descriptionKey="description"
							pubDateKey="date"
							titleKey="name"
							tagsKey="tags"
							slugKey="slug" 	
						/>
					</>
				) : (
					<>
						<GroupTitle title="Updates" />
						<ListLoading />
					</>
				)}

				{firstTwoBlogPosts.length > 0 ? (
					<>
						<GroupTitle title="Latest Posts" />
						<Gallery
							items={firstTwoBlogPosts}
							mdGridCols="md:grid-cols-2"
							lgGridCols="lg:grid-cols-2"
							pageKey="posts"
							slugKey="slug"
							linkKey="url"
						/>
					</>
				) : (
					<>
						<GroupTitle title="Latest Posts" />
						<GalleryLoading />
					</>
				)}

				{firstThreeReadingListPosts.length > 0 ? (
					<>
						<GroupTitle title="Reading List" />
						<MiniCardView
							items={firstThreeReadingListPosts}
							pageKey="reading-list"
							linkKey="url"
							tagsKey="tags"
						/>
					</>
				) : (
					<>
						<GroupTitle title="Reading List" />
						<ListLoading />
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
