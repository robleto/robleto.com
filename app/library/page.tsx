import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageTitle from "@/app/components/layout/PageTitle";
import Subhead from "@/app/components/layout/Subhead";
import Gallery from "@/app/components/Gallery";
import { groupItemsByVariable } from "@/utils/groupItems";

// Map the Library data structure
const mapLibraryEntry = (entry: any) => {
	const imageProperty = entry.properties.Image;
	const imageUrl =
		imageProperty?.files?.[0]?.file?.url ||
		imageProperty?.files?.[0]?.name ||
		"";
	const topics = entry.properties.Topics?.multi_select || [];
	const title = entry.properties.Title?.title?.[0]?.plain_text || "Untitled"; // Use "Title" as the field name
	const slug = entry.properties.Slug?.rich_text?.[0]?.plain_text || "";
	const url = entry.properties.URL?.url || "#";

	return {
		id: entry.id,
		title,
		topics: topics.map((topic: any) => topic.name), // Group by topics
		image: imageUrl,
		url,
		slug,
	};
};

export default async function LibraryPage() {
	// Fetch the data from Notion
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_LIBRARY_DB_ID!,
		pageId: process.env.NOTION_LIBRARY_PAGE_ID!,
		mapEntry: (entry) => mapLibraryEntry(entry),
	});

	// Group items by topics
	const groupedItems = groupItemsByVariable(listItems, "topics");

	return (
		<div className="container mx-auto p-4">
			<PageTitle title="Library" />
			<Subhead pageContent={pageContent} />

			{/* Loop through the keys of groupedItems */}
			{Object.keys(groupedItems).map((topic) => (
				<section key={topic}>
					<section className="relative flex items-center justify-center my-8">
						<span className="flex-grow h-px bg-gray-300"></span>
						<h3 className="px-4 text-2xl uppercase font-bold font-oswald text-gray-700 dark:text-gray-200">
							{topic}
						</h3>
						<span className="flex-grow h-px bg-gray-300"></span>
					</section>
					<Gallery
						items={groupedItems[topic]} // Items under this topic
						pageKey="library"
						titleKey="title"
						linkKey="url"
						slugKey="slug"
					/>
				</section>
			))}
		</div>
	);
}
