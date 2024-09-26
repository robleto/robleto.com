import React from "react";
import { fetchNotionData } from "../lib/notionContentFetcher";
import Lists from "./about/_list"; // Import the utility
import { sortByPinnedAndDate } from "../utils/sortItems"; // Import the sort function
import FlippingWords from "@/app/components/FlippingWords";
import GalleryCard from "./posts/_piece"; // For the posts
import ReadingListCard from "./reading-list/_card"; // For the Reading List

// Helper function to format the date
const formatDate = (date?: Date) => {
	if (!date || isNaN(new Date(date).getTime())) {
		return "Date Not Available";
	}
	return new Date(date)
		.toLocaleDateString("en-US", {
			month: "short",
			year: "numeric",
		})
		.replace(".", ".");
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

// Map the Posts data structure (for the gallery at the bottom)
const mapPostsEntry = (entry: any) => {
	const websiteUrl = entry.properties.URL?.url || "#";
	const imageProperty = entry.properties.Image;
	const imageUrl =
		imageProperty?.files?.[0]?.file?.url ||
		imageProperty?.files?.[0]?.name ||
		"";
	const pubDateString =
		entry.properties["Pub-Date"]?.date?.start || new Date();
	const pubDate = new Date(pubDateString);

	const isPinned = entry.properties["Pinned?"]?.checkbox || false;

	return {
		id: entry.id,
		name: entry.properties.Name?.title[0]?.plain_text ?? "Untitled",
		image: imageUrl,
		url: websiteUrl,
		pubDate,
		isPinned,
	};
};

// Map the Reading List data structure
const mapReadingListEntry = (entry: any) => {
	const websiteUrl = entry.properties.URL?.url || "#";

	// Extract the domain name to create a favicon URL
	const domain = new URL(websiteUrl).hostname;
	const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;

	// Fetch the topics/tags
	const tags =
		entry.properties.Tags?.multi_select.map((topic: any) => topic.name) ||
		[];

	return {
		id: entry.id,
		name: entry.properties.Name?.title[0]?.plain_text ?? "Untitled",
		tags: tags,
		favicon: faviconUrl,
		url: websiteUrl,
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
						key={post.id}
						title={post.name}
						image={post.image}
						pubDate={formatDate(post.pubDate)}
						url={post.url}
						isPinned={post.isPinned || !post.isPinned}
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
					<ReadingListCard
						key={item.id}
						title={item.name}
						favicon={item.favicon}
						url={item.url}
						tags={item.tags}
					/>
				))}
			</div>
		</div>
	);
}
