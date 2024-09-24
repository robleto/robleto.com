import React from "react";
import { fetchNotionData } from "../../lib/notionContentFetcher";
import Gallery from "./_gallery"; // Import Gallery
import PageTitle from "../../components/layout/PageTitle"; // Import Page Title
import Subhead from "../../components/layout/Subhead"; // Import Subhead
import { sortByPinnedAndDate } from "../../utils/sortItems"; // Import the sort function

// Map the Art data structure
const mapArtEntry = (entry: any) => {
	const imageProperty = entry.properties.Image;

	// Fetch the image URL based on file name or external URL
	const imageUrl =
		imageProperty?.files?.[0]?.file?.url || // For uploaded image URL
		imageProperty?.files?.[0]?.name || // If it's stored under 'name'
		"";

	// Fetch the Featured property
	const featured = entry.properties.Featured?.checkbox || false;

	// Fix slug extraction
	const slug = entry.properties.Slug?.rich_text?.[0]?.plain_text || ""; // Assuming it's rich_text

	// Fix animated extraction
	const animated = entry.properties.Animated?.checkbox || false;

	const topics = entry.properties.Topics?.multi_select || [];

	return {
		id: entry.id,
		title: entry.properties.Name?.title[0]?.plain_text ?? "Untitled",
		topics: topics.map((topic: any) => topic.name), // Get an array of topic names
		image: imageUrl,
		url: entry.properties.URL?.url || "#",
		featured, // Pinned field to order the list
		slug,
		animated,
	};
};

export default async function ArtPage() {

	// Fetch the data from Notion
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_ART_DB_ID!,
		pageId: process.env.NOTION_ART_PAGE_ID!,
		mapEntry: (entry) => mapArtEntry(entry),
	});

	// Sort the items using the shared sort function
	const sortedItems = sortByPinnedAndDate(listItems);

	return (
		<div className="container mx-auto p-4">
			<PageTitle title="Artwork" />
			<Subhead pageContent={pageContent} />

			{/* Render the Gallery component grouped by Topic */}
			<Gallery items={sortedItems} />
		</div>
	);
}
