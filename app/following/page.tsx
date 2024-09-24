import { fetchNotionData } from "../../lib/notionContentFetcher";
import { renderBlock } from "../../utils/renderItems";
import Lists from "./_list"; // Import the utility
import PageTitle from "../../components/layout/PageTitle"; // Import Page Title
import Subhead from "../../components/layout/Subhead"; // Import Subhead
import { sortByPinnedAndDate } from "../../utils/sortItems"; // Import the sort function
import { fetchTwitterProfileImage } from "../../utils/fetchTwitterProfile"; // Import the Twitter API

// Map the Following data structure
const mapFollowingEntry = async (entry: any) => {
	const twitterToken = process.env.TWITTER_BEARER_TOKEN; // Use your Twitter API Bearer token

	const slug = entry.properties.slug?.rich_text[0]?.plain_text || "";
	const tags =
		entry.properties.Tags?.multi_select.map((topic: any) => topic.name) ||
		[];

	// Fetch image from Notion
	const image =
		entry.properties.Image?.files?.[0]?.file?.url ||
		entry.properties.Image?.files?.[0]?.external?.url ||
		"";

	let imageUrl = "";

	if (slug && twitterToken) {
		try {
			// Fetch the Twitter profile image
			imageUrl = await fetchTwitterProfileImage(slug, twitterToken) ?? "";
			console.log("Fetched Twitter Profile Image:", imageUrl); // Log the fetched image URL
		} catch (error) {
			console.error("Error fetching Twitter profile image:", error);
		}
	} else {
		console.error("Twitter Bearer token is missing or slug is invalid.");
	}

	return {
		id: entry.id,
		name: entry.properties.Name?.title[0]?.plain_text ?? "Untitled",
		tags: tags, // Use the topics as tags
		image, // Image from Notion
		imageUrl, // Fetched Twitter profile image URL
		slug, // Add the Twitter handle as the slug
	};
};

export default async function FollowingPage() {
	
	// Fetch the Notion data
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_FOLLOWING_DB_ID!,
		pageId: process.env.NOTION_FOLLOWING_PAGE_ID!,
		mapEntry: (entry) => mapFollowingEntry(entry),
	});
		

console.log("Notion API Key:", process.env.NOTION_API_KEY);

	// Sort the items using the shared sort function
	const sortedItems = sortByPinnedAndDate(listItems);

	return (
		<div className="container mx-auto p-4">

			<PageTitle title="Following" />
			<Subhead pageContent={pageContent} />

			{/* Render the Lists component */}
			<Lists items={sortedItems} />
		</div>
	);
}
