import { fetchNotionData } from "../../lib/notionContentFetcher";
import { renderBlock } from "../../utils/renderItems";
import Lists from "./_list"; // Import the Lists component
import PageTitle from "../../components/layout/PageTitle"; // Import Page Title
import Subhead from "../../components/layout/Subhead"; // Import Subhead
import { sortByPinnedAndDate } from "../../utils/sortItems"; // Import the sort function

// Map the Posts data structure
const mapPostsEntry = (entry: any) => {
	// Fetch the website URL
	const websiteUrl = entry.properties.URL?.url || "#";

	// Fetch the image from the "Images" field in Notion
	const imageProperty = entry.properties.Image;
	const imageUrl =
		imageProperty?.files?.[0]?.file?.url || // For uploaded image URL
		imageProperty?.files?.[0]?.name || // If it's stored under 'name'
		"";

	// Get the Pub-Date from Notion and convert it to a Date object
	const pubDateString =
		entry.properties["Pub-Date"]?.date?.start || new Date();
	const pubDate = new Date(pubDateString);

	// Fetch the "Pinned?" field from Notion
	const isPinned = entry.properties["Pinned?"]?.checkbox || false;

	// Fetch the topics/tags
	const tags =
		entry.properties.Tags?.multi_select.map((topic: any) => topic.name) ||
		[];

	// Return a properly structured list item
	return {
		id: entry.id,
		name: entry.properties.Name?.title[0]?.plain_text ?? "Untitled",
		tags: tags, // Use the topics as tags
		website: websiteUrl, // Website URL
		image: imageUrl, // Handle the external image
		pubDate, // Add the Pub-Date
		isPinned, // Add pinned flag
	};
};

export default async function PostsPage() {
	const { pageContent, listItems } = await fetchNotionData(
		process.env.NOTION_POSTS_DB_ID!, // Corrected DB ID for Posts
		process.env.NOTION_POSTS_PAGE_ID!, // Corrected Page ID for Posts
		mapPostsEntry // Custom mapping for Posts
	);

	// Sort the items using the shared sort function (sorted by pinned and date)
	const sortedItems = sortByPinnedAndDate(listItems);

	return (
		<div className="container mx-auto p-4">

			<PageTitle title="Blog Posts" />
			<Subhead pageContent={pageContent} />

			{/* Render the Lists component */}
			<Lists items={sortedItems} />
		</div>
	);
}
