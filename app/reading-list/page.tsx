import { fetchNotionData } from "../../lib/notionContentFetcher";
import { renderBlock } from "../../utils/renderItems";
import Lists from "./_list"; // Import the utility
import PageTitle from "../components/layout/PageTitle"; // Import Page Title
import Subhead from "../components/layout/Subhead"; // Import Subhead
import { sortByPinnedAndDate } from "../../utils/sortItems"; // Import the sort function


// Map the ReadingList data structure
const mapReadingListEntry = (entry: any) => {
	// Fetch the slug (username) and the website URL
	const websiteUrl = entry.properties.URL?.url || "#";

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
		favicon: faviconUrl, // Favicon URL for the website
	};
};

export default async function ReadingListPage() {

	// Fetch the Notion data
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_READINGLIST_DB_ID!,
		pageId: process.env.NOTION_READINGLIST_PAGE_ID!,
		mapEntry: (entry) => mapReadingListEntry(entry),
	});

	// Sort the items using the shared sort function (sorted by pinned and date)
	const sortedItems = sortByPinnedAndDate(listItems);

	return (
		<div className="container mx-auto p-4">

			<PageTitle title="Reading List" />
			<Subhead pageContent={pageContent} />

			{/* Render the Lists component */}
			<Lists items={sortedItems} />
		</div>
	);
}
