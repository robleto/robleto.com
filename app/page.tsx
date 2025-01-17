import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import Lists from "@/app/_components/views/list/List";
import { sortByPinnedAndDate } from "@/utils/sortItems";
import FlippingWords from "@/app/_components/custom/FlippingWords";
import Gallery from "@/app/_components/views/gallery/Gallery";
import GroupTitle from "@/app/_components/views/common/GroupTitle";
import MiniCardView from "@/app/_components/views/mini-card/MiniCardSet";

export default async function HomePage() {
	// Fetch data using the refactored fetchNotionData function
	const { listItems: aboutItems } = await fetchNotionData({
		databaseId: process.env.NOTION_ABOUT_DB_ID!,
		entryType: "about",
	});

	const { listItems: postItems } = await fetchNotionData({
		databaseId: process.env.NOTION_POSTS_DB_ID!,
		entryType: "posts",
	});

	const { listItems: readingListItems } = await fetchNotionData({
		databaseId: process.env.NOTION_READINGLIST_DB_ID!,
		entryType: "reading-list",
	});

	// Sort and limit the data
	const limitedHomeItems = sortByPinnedAndDate(aboutItems, "date").slice(0, 4);
	const postItemsSorted = sortByPinnedAndDate(postItems, "pubdate");
	const firstTwoBlogPosts = postItemsSorted.slice(0, 2);
	const firstThreeReadingListPosts = readingListItems.slice(0,4);

	return (
		<div className="pt-10">
			<div className="flex flex-col flex-grow max-w-screen-xl -z-20 pl-[20%] md:pl-[25%] lg:w-auto align-left justify-center relative mx-auto p-4 pt-10 transition-all duration-300 min-h-[20em] ">
				{/* Page Title */}
				<h1 className="text-xl -z-10 relative md:text-2xl font-semibold uppercase tracking-[.25rem] text-gray-800 dark:text-gray-200 flex items-center">
					<img
						src={`/_brand/greg-ai.jpg`}
						alt="Greg Robleto"
						className="h-20 w-20 rounded-full svg-icon mr-5"
					></img>
					Greg Robleto
				</h1>

				<section className="notion-page-content -z-10 relative font-medium text-md md:text-lg mx-auto mt-4 pr-[30%] md:pr-[20%] leading-5 md:leading-6 text-gray-800 dark:text-gray-200">
					Based in Rockville, Maryland, a creative leader
					experienced in design, brand, product, marketing & tech
					trying to make the web a little bit better.
				</section>
			</div>

			<div className="flex flex-col flex-grow max-w-screen-xl -z-20 pl-[20%] md:pl-[25%] lg:w-auto align-left justify-center relative mx-auto p-4 pt-10 pr-8 transition-all duration-300 min-h-[20em] ">
				<GroupTitle title="Updates" />

				{/* Render the limited home items list */}
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

				<GroupTitle title="Latest Posts" />

				<Gallery
					items={firstTwoBlogPosts}
					mdGridCols="md:grid-cols-2"
					lgGridCols="lg:grid-cols-2"
					pageKey="posts"
					slugKey="slug"
					linkKey="url"
				/>

				<GroupTitle title="Reading List" />

				<MiniCardView
					items={firstThreeReadingListPosts}
					pageKey="reading-list"
					linkKey="url"
					tagsKey="tags"
				/>
			</div>
		</div>
	);
}
