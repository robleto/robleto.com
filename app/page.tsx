import React from "react";
import { fetchNotionData } from "../lib/notionContentFetcher";
import Lists from "./about/_list"; // Import the utility
import { sortByPinnedAndDate } from "../utils/sortItems"; // Import the sort function
import FlippingWords from "@/app/_components/custom/FlippingWords";
import GalleryCard from "@/app/_components/views/gallery/Gallery"; // For the posts
import { format, parseISO, isValid } from "date-fns";
import MiniCardView from "@/app/_components/views/mini-card/MiniCardView";

// Helper function to format the date using date-fns
const formatDate = (dateString?: string) => {
	if (!dateString) {
		return "Date Not Available";
	}

	const date = parseISO(dateString);
	if (!isValid(date)) {
		return "Date Not Available";
	}

	return format(date, "MMM yyyy");
};

// Map the Home data structure
const mapHomeEntry = (entry: any) => {
	const description =
		entry.properties.Description?.rich_text[0]?.plain_text || "";
	const image =
		entry.properties.Image?.files?.[0]?.file?.url ||
		entry.properties.Image?.files?.[0]?.external?.url ||
		"";
	const date = new Date(entry.properties.Date?.date?.start || "");
	const url = entry.properties.URL?.url || "#";
	const isPinned = entry.properties.Pinned?.checkbox || false;

	return {
		id: entry.id,
		name: entry.properties.Name?.title[0]?.plain_text ?? "Untitled",
		description,
		image,
		date,
		url,
		isPinned,
	};
};

// Map the Posts data structure
const mapPostsEntry = (entry: any) => {
	const id = entry.id;
	const title = entry.properties.Name?.title[0]?.plain_text ?? "Untitled";
	const pubdate = entry.properties.PubDate?.date?.start || null;
	const description =
		entry.properties.Description?.rich_text[0]?.plain_text ?? "";
	const url = entry.properties.URL?.url || "#";
	const sortOrder = entry.properties.SortOrder?.number || Infinity;
	const slug = entry.properties.Slug?.rich_text[0]?.plain_text || "";
	const tags =
		entry.properties.Tags?.multi_select.map((topic: any) => topic.name) ||
		[];

	return {
		id,
		title,
		pubdate,
		description,
		url,
		sortOrder,
		slug,
		tags,
	};
};

// Map the ReadingList data structure
const mapReadingListEntry = (entry: any) => {
	const id = entry.id;
	const title = entry.properties.Name?.title[0]?.plain_text ?? "Untitled";
	const pubdate = entry.properties.PubDate?.date?.start || null;
	const description =
		entry.properties.Description?.rich_text[0]?.plain_text ?? "";
	const url = entry.properties.URL?.url || "#";
	const sortOrder = entry.properties.SortOrder?.number || Infinity;
	const slug = entry.properties.Slug?.rich_text[0]?.plain_text || "";
	const tags =
		entry.properties.Tags?.multi_select.map((topic: any) => topic.name) ||
		[];

	return {
		id,
		title,
		pubdate,
		description,
		url,
		sortOrder,
		slug,
		tags,
	};
};

export default async function HomePage() {
	// Fetch the home, posts, and reading list data
	const { listItems: homeItems } = await fetchNotionData({
		databaseId: process.env.NOTION_ABOUT_DB_ID!,
		pageId: process.env.NOTION_ABOUT_PAGE_ID!,
		mapEntry: (entry) => mapHomeEntry(entry),
	});

	const { listItems: postItems } = await fetchNotionData({
		databaseId: process.env.NOTION_POSTS_DB_ID!,
		pageId: process.env.NOTION_POSTS_PAGE_ID!,
		mapEntry: (entry) => mapPostsEntry(entry),
	});

	const { listItems: readingListItems } = await fetchNotionData({
		databaseId: process.env.NOTION_READINGLIST_DB_ID!,
		pageId: process.env.NOTION_READINGLIST_PAGE_ID!,
		mapEntry: (entry) => mapReadingListEntry(entry),
	});

	// Sort and limit the data
	const sortedHomeItems = sortByPinnedAndDate(homeItems);
	const limitedHomeItems = sortedHomeItems.slice(0, 4);

	const sortedPostItems = sortByPinnedAndDate(postItems);
	const firstTwoBlogPosts = sortedPostItems.slice(0, 2); // Limit to first 2 posts

	const sortedReadingList = sortByPinnedAndDate(readingListItems);
	const firstThreeReadingListPosts = sortedReadingList.slice(0, 4); // Limit to first 3 posts

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold hidden">Greg Robleto</h1>

			{/* Add image below the H1 */}
			<section className="w-full max-w-6xl mx-auto py-8">
				{/* Top Section: Full-width home-gregrobleto.svg image, baseline oriented */}
				<div className="w-full flex items-baseline">
					<img
						src="/home/home-gregrobleto.svg"
						alt="Greg Robleto"
						className="w-full h-auto"
					/>
				</div>

				{/* Middle Section: UX Designer with margin-top 2 */}
				<FlippingWords />

				{/* Bottom Section: Centered and 50% width home-rockvillemd.svg image */}
				<div className="flex justify-center items-center mt-2">
					<img
						src="/home/home-rockvillemd.svg"
						alt="Rockville, MD"
						className="w-full md:w-1/2 h-auto"
					/>
				</div>
			</section>

			{/* Updates Section */}
			<section className="relative flex items-center justify-center my-8">
				<span className="flex-grow h-px bg-gray-300"></span>
				<h3 className="px-4 text-2xl uppercase font-bold text-gray-700 dark:text-gray-200 oswald font-oswald">
					Updates
				</h3>
				<span className="flex-grow h-px bg-gray-300"></span>
			</section>

			<Lists items={limitedHomeItems} />

			{/* Posts Gallery Section */}
			<section className="relative flex items-center justify-center my-8">
				<span className="flex-grow h-px bg-gray-300"></span>
				<h3 className="px-4 text-2xl uppercase font-bold text-gray-700 dark:text-gray-200 oswald font-oswald">
					Latest Posts
				</h3>
				<span className="flex-grow h-px bg-gray-300"></span>
			</section>

			{/* Render the first two posts */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
				{firstTwoBlogPosts.map((post) => (

				<GalleryCard
					items={firstTwoBlogPosts}
					lgGridCols="lg:grid-cols-2"
					linkKey="url"
					pubDateKey="pubdate"
					pageKey="posts"
					tagsKey="tags"
					slugKey="slug" // Ensure the slug key is passed for image paths
				/>
				
				))}
			</div>

			{/* Reading List Section */}
			<section className="relative flex items-center justify-center my-8">
				<span className="flex-grow h-px bg-gray-300"></span>
				<h3 className="px-4 text-2xl uppercase font-bold text-gray-700 dark:text-gray-200 oswald font-oswald">
					Reading List
				</h3>
				<span className="flex-grow h-px bg-gray-300"></span>
			</section>

			{/* Render the Reading List in 3-up grid format */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{firstThreeReadingListPosts.map((item) => (


					<MiniCardView
						items={firstThreeReadingListPosts}
						key={item.id}
						titleKey="title"
						linkKey="url"
						urlKey="url"
						pubDateKey="pubdate"
						pageKey="reading-list"
						tagsKey="tags"
						slugKey="slug" 
						favicon="favicon"// Ensure the slug key is passed for image paths
					/>
				))}
			</div>
		</div>
	);
}
