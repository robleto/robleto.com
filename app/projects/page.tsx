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
		url,
		sortOrder, // Use the correctly assigned sortOrder here
	};
};

export default async function ProjectsPage() {
	const { pageContent, listItems } = await fetchNotionData(
		process.env.NOTION_PROJECTS_DB_ID!, // Corrected DB ID for Projects
		process.env.NOTION_PROJECTS_PAGE_ID!, // Corrected Page ID for Projects
		mapProjectsEntry // Custom mapping for Projects
	);

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
