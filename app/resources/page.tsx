import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageTitle from "@/app/_components/layout/page/PageTitle";
import Subhead from "@/app/_components/layout/page/Subhead";
import { filterItemsByProperty } from "@/utils/filterItems";
import { sortByPinnedAndDate } from "@/utils/sortItems";
import Gallery from "@/app/_components/views/gallery/Gallery";

// Map the Resources data structure
const mapResourcesEntry = (entry: any) => {
	const imageProperty = entry.properties.Image;
	const imageUrl =
		imageProperty?.files?.[0]?.file?.url ||
		imageProperty?.files?.[0]?.name ||
		"";
	const featured = entry.properties.Featured?.checkbox || false;
	const slug = entry.properties.Slug?.rich_text?.[0]?.plain_text || "";
	const animated = entry.properties.Animated?.checkbox || false;
	const topics = entry.properties.Topics?.multi_select || [];
	const url = entry.properties.URL?.url || "#";
	const title = entry.properties.Name?.title?.[0]?.plain_text || "Untitled";
	const description =
		entry.properties.Description?.rich_text?.[0]?.plain_text || "";

	return {
		id: entry.id,
		title,
		topics: topics.map((topic: any) => topic.name),
		image: imageUrl,
		url,
		featured,
		slug,
		animated,
		description,
	};
};

export default async function ResourcesPage() {
	// Fetch the Notion data
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_RESOURCES_DB_ID!,
		pageId: process.env.NOTION_RESOURCES_PAGE_ID!,
		mapEntry: (entry) => mapResourcesEntry(entry),
	});

	// Filter the featured and non-featured items using the filterItemsByProperty utility
	const featuredItems = filterItemsByProperty(listItems, "featured", true);
	const regularItems = filterItemsByProperty(listItems, "featured", false);

	// Optionally sort items (e.g., by pinned and date)
	const sortedRegularItems = sortByPinnedAndDate(regularItems);

	return (
		<div className="container mx-auto p-4">
			<PageTitle title="Resources" />
			<Subhead pageContent={pageContent} />

			{/* Featured Gallery */}
			<Gallery
				items={featuredItems}
				smGridCols="sm:grid-cols-1"
				mdGridCols="md:grid-cols-2"
				lgGridCols="lg:grid-cols-2"
				slugKey="slug"
				pageKey="resources"
				linkKey="url"
				animatedKey="animated" // Handling gif vs png
			/>

			{/* Regular Gallery */}
			<Gallery
				items={sortedRegularItems}
				pageKey="resources"
				slugKey="slug"
				linkKey="url"
				animatedKey="animated" // Handling gif vs png
			/>
		</div>
	);
}
