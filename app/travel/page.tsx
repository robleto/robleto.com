import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageTitle from "@/app/_components/layout/page/PageTitle";
import Subhead from "@/app/_components/layout/page/Subhead";
import Gallery from "@/app/_components/views/gallery/Gallery";
import { groupItemsByVariable } from "@/utils/groupItems";

// Map the Travel data structure
const mapTravelEntry = (entry: any) => {
	const imageProperty = entry.properties.Image;
	const imageUrl =
		imageProperty?.files?.[0]?.file?.url ||
		imageProperty?.files?.[0]?.name ||
		"";
	const title = entry.properties.Name?.title?.[0]?.plain_text || "Untitled";
	const slug = entry.properties.Slug?.rich_text?.[0]?.plain_text || "";
	const url = entry.properties.URL?.url || "#";
	const city = entry.properties.City?.rich_text?.[0]?.plain_text || "";
	const state = entry.properties.State?.select?.name || "Unknown";
	const seen = entry.properties.Seen?.select?.name || ""; // Add the Seen property

	return {
		id: entry.id,
		title,
		image: imageUrl,
		url,
		slug,
		city,
		state,
		cityState: `${city}, ${state}`,
		seen, // Include the seen status
	};
};

export default async function TravelPage() {
	// Fetch the data from Notion
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_TRAVEL_DB_ID!,
		pageId: process.env.NOTION_TRAVEL_PAGE_ID!,
		mapEntry: (entry) => mapTravelEntry(entry),
	});

	// Filter the items by Seen status
	const filteredItems = listItems.filter(
		(item) => item.seen === "Been there"
	);

	// Group items by state
	const groupedItems = groupItemsByVariable(filteredItems, "state");

	return (
		<div className="container mx-auto p-4">
			<PageTitle title="Travel" />
			<Subhead pageContent={pageContent} />

			{/* Loop through the keys of groupedItems */}
			{Object.keys(groupedItems).map((state) => (
				<section key={state}>
					<section className="relative flex items-center justify-center my-8">
						<span className="flex-grow h-px bg-gray-300"></span>
						<h3 className="px-4 text-2xl uppercase font-bold font-oswald text-gray-700 dark:text-gray-200">
							{state}
						</h3>
						<span className="flex-grow h-px bg-gray-300"></span>
					</section>
					<Gallery
						items={groupedItems[state]} // Items under this state
						pageKey="travel"
						titleKey="title"
						linkKey="url"
						slugKey="slug"
						cityStateKey="cityState"
					/>
				</section>
			))}
		</div>
	);
}
