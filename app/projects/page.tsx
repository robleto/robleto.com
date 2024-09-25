import { fetchNotionData } from "../../lib/notionContentFetcher";
import { renderBlock } from "../../utils/renderItems"; // Import the renderBlock utility
import Portfolio from "./_portfolio"; // Import the reusable Portfolio component
import { sortByOrder } from "../../utils/sortItems"; // Import the sorting utility
import PageTitle from "../../components/layout/PageTitle"; // Import Page Title
import Subhead from "../../components/layout/Subhead"; // Import Subhead

// Map the Projects data structure
const mapProjectsEntry = (entry: any) => {
	// Fetch the website URL
	const url = entry.properties.URL?.url || "#";

	// Fetch SortOrder if it exists, and assign it as a number
	const sortOrder = entry.properties.SortOrder?.number || Infinity; // Default to Infinity if undefined
console.log("SortOrder fetched for", entry.id, ":", sortOrder);

	// Fetch the image from the "Images" field in Notion
	const imageProperty = entry.properties.Image;
	const image =
		imageProperty?.files?.[0]?.file?.url || // For uploaded image URL
		imageProperty?.files?.[0]?.name || // If it's stored under 'name'
		"";
	const slug = entry.properties.Slug?.rich_text[0]?.plain_text || "";	
	// Fetch the topics/tags
	const tags =
		entry.properties.Tags?.multi_select.map((topic: any) => topic.name) ||
		[];

	// Return a properly structured list item
	return {
		id: entry.id,
		title: entry.properties.Name?.title[0]?.plain_text ?? "Untitled",
		description:
			entry.properties.Description?.rich_text[0]?.plain_text ?? "",
		image,
		tags,
		slug,
		url,
		sortOrder, // Use the correctly assigned sortOrder here
	};
};

export default async function ProjectsPage() {

	// Fetch the Notion data
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_PROJECTS_DB_ID!,
		pageId: process.env.NOTION_PROJECTS_PAGE_ID!,
		mapEntry: (entry) => mapProjectsEntry(entry),
	});

	// Sort the items using the shared sort function (sorted by sortOrder)
	const sortedItems = sortByOrder(listItems);

	return (
		<div className="container mx-auto p-4">
			
			<PageTitle title="Projects" />
			<Subhead pageContent={pageContent} />

			{/* Render the Portfolio component grouped by Topic */}
			<Portfolio items={sortedItems} />
		</div>
	);
}
