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
	const firstTwoBlogPosts = postItems.slice(0, 2);
	const firstThreeReadingListPosts = readingListItems.slice(0, );

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold hidden">Greg Robleto</h1>

			<section className="w-full max-w-6xl mx-auto py-8">
				<div className="w-full flex items-baseline">
					<img
						src="/home/home-gregrobleto.svg"
						alt="Greg Robleto"
						className="w-full h-auto"
					/>
				</div>

				<FlippingWords />

				<div className="flex justify-center items-center mt-2">
					<img
						src="/home/home-rockvillemd.svg"
						alt="Rockville, MD"
						className="w-full md:w-1/2 h-auto"
					/>
				</div>
			</section>

			<GroupTitle title="Updates" />

			{/* Render the limited home items list */}
			<Lists
				items={limitedHomeItems}
				pageKey="about"
				linkKey="url"
				descriptionKey="description"
				pubDateKey="date"
				pinnedKey="isPinned"
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
	);
}
