import { fetchNotionData } from "../../lib/notionContentFetcher";
import { renderBlock } from "../../utils/renderItems";
import Lists from "./_list"; // Import the utility
import PageTitle from "../../components/layout/PageTitle"; // Import Page Title
import Subhead from "../../components/layout/Subhead"; // Import Subhead
import { sortByPinnedAndDate } from "../../utils/sortItems"; // Import the sort function


// Map the Bookmarks data structure
const mapBookmarksEntry = (entry: any) => {

	// Fetch the slug (username) and the website URL
	const websiteUrl = entry.properties.URL?.url || "#";
	const slug =
		entry.properties.slug?.rich_text[0]?.plain_text || "";

	// Extract the domain name to create a favicon URL
	const domain = new URL(websiteUrl).hostname;
	const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;

	// Fetch the topics/tags
	const tags =
		entry.properties.Tags?.multi_select.map(
			(topic: any) => topic.name
		) || [];

	// Return a properly structured list item
	return {
		id: entry.id,
		name:
			entry.properties.Name?.title[0]?.plain_text ??
			"Untitled",
		tags: tags, // Use the topics as tags
		website: websiteUrl, // Website URL
		slug, // Add the Twitter handle as the slug
		favicon: faviconUrl, // Favicon URL for the website
	};
};

export default async function BookmarksPage() {
	const { pageContent, listItems } = await fetchNotionData(
		process.env.NOTION_BOOKMARKS_DB_ID!,
		process.env.NOTION_BOOKMARKS_PAGE_ID!,
		mapBookmarksEntry // Custom mapping for Home
	);

	// Sort the items using the shared sort function
	const sortedItems = sortByPinnedAndDate(listItems);

	return (
		<div className="container mx-auto p-4">

			<PageTitle title="Bookmarks" />
			<Subhead pageContent={pageContent} />

			{/* Render the Lists component */}
			<Lists items={listItems} />
		</div>
	);
}
