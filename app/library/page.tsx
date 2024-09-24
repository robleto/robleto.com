import React from "react";
import { fetchNotionData } from "../../lib/notionContentFetcher";
import Bookshelf from "./_bookshelf"; // Import Gallery
import PageTitle from "../../components/layout/PageTitle"; // Import Page Title
import Subhead from "../../components/layout/Subhead"; // Import Subhead
import {
	groupItemsByVariable,
	sortGroupsAlphabetically,
} from "../../utils/groupItems"; // Import the missing function
// Removed unused import for sortByPinnedAndDate

// Map the Library data structure

const mapLibraryEntry = (entry: any) => {
	const imageProperty = entry.properties.Image;

	// Fetch the image URL based on file name or external url
	const imageUrl =
		imageProperty?.files?.[0]?.file?.url || // For uploaded image URL
		imageProperty?.files?.[0]?.name || // If it's stored under 'name'
		"";

	const topics = entry.properties.Topics?.multi_select || [];

	return {
		id: entry.id,
		title: entry.properties.Title?.title[0]?.plain_text ?? "Untitled",
		topics: topics.map((topic: { name: string }) => topic.name), // Get an array of topic names
		image: imageUrl,
		url: entry.properties.URL?.url || "#",
	};
};

export default async function LibraryPage() {

	// Fetch the data from Notion	
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_LIBRARY_DB_ID!,
		pageId: process.env.NOTION_LIBRARY_PAGE_ID!,
		mapEntry: (entry) => mapLibraryEntry(entry),
	});

	// Group items by topics using the utility
	const itemsGroupedByTopic = groupItemsByVariable(listItems);

	// Sort the topics alphabetically using the utility
	const sortedTopics = sortGroupsAlphabetically(itemsGroupedByTopic); // Add this line

	return (
		<div className="container mx-auto p-4">
			
			<PageTitle title="Library" />
			<Subhead pageContent={pageContent} />

			{/* Render the Bookshelf component grouped by Topic */}
			{sortedTopics.map((topic: string) => (
				<section key={topic}>
					<section className="relative flex items-center justify-center my-8">
						<span className="flex-grow h-px bg-gray-300"></span>
						<h3 className="px-4 text-2xl uppercase font-bold text-gray-700 dark:text-gray-200 oswald font-oswald">
							{topic}
						</h3>
						<span className="flex-grow h-px bg-gray-300"></span>
					</section>
					<Bookshelf
						items={itemsGroupedByTopic[topic]}
						columns="md:grid-cols-3"
					/>
				</section>
			))}
		</div>
	);
}
