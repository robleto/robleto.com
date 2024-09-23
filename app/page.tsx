import React from "react";
import { fetchNotionData } from "../lib/notionContentFetcher";
import Lists from "./about/_list"; // Import the utility
import { sortByPinnedAndDate } from "../utils/sortItems"; // Import the sort function

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

export default async function HomePage() {
	const { listItems } = await fetchNotionData(
		process.env.NOTION_ABOUT_DB_ID!,
		process.env.NOTION_ABOUT_PAGE_ID!,
		mapHomeEntry // Custom mapping for Home
	);

	// Sort the items using the shared sort function
	const sortedItems = sortByPinnedAndDate(listItems);

	// Limit the sortedItems to the first 5 items
	const limitedItems = sortedItems.slice(0, 4);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold hidden">Greg Robleto</h1>

			{/* Add image below the H1 */}
			<section className="w-full max-w-6xl mx-auto p-8">
				{/* Top Section: Full-width home-gregrobleto.svg image, baseline oriented */}
				<div className="w-full flex items-baseline">
					<img
						src="/home/home-gregrobleto.svg"
						alt="Greg Robleto"
						className="w-full h-auto"
					/>
				</div>

				{/* Middle Section: UX Designer with margin-top 2 */}
				<div className="relative bg-ferra rounded-lg w-full mt-2 p-4 flex justify-center items-center">
					{/* Left-aligned "Is a" text as overlay */}
					<span className="absolute left-4 text-white text-xs opacity-35 md:text-sm lg:text-base uppercase">
						Is a
					</span>

					{/* UX Designer text centered */}
					<h2 className="text-whisper text-center leading-6 text-2xl md:text-4xl lg:text-5xl font-bold">
						Design Director
					</h2>
				</div>

				{/* Bottom Section: Centered and 50% width home-rockvillemd.svg image */}
				<div className="flex justify-center items-center mt-2">
					<img
						src="/home/home-rockvillemd.svg"
						alt="Rockville, MD"
						className="w-full md:w-1/2 h-auto"
					/>
				</div>
			</section>

			<section className="relative flex items-center justify-center mt-8 mb-2">
				<span className="flex-grow h-px bg-gray-300"></span>
				<h3 className="px-4 text-2xl uppercase font-bold text-gray-700 dark:text-gray-200 oswald font-oswald">
					Updates
				</h3>
				<span className="flex-grow h-px bg-gray-300"></span>
			</section>

			<Lists items={limitedItems} />
		</div>
	);
}
