import { fetchNotionData } from "../../lib/notionContentFetcher";
import PageTitle from "../../components/layout/PageTitle"; // Import Page Title
import Subhead from "../../components/layout/Subhead"; // Import Subhead
import { sortByPinnedAndDate } from "../../utils/sortItems"; // Import the sort function
import PostsContainer from "./_container"; // Import the new PostsContainer

// Map the Posts data structure
const mapPostsEntry = (entry: any) => {
	const websiteUrl = entry.properties.URL?.url || "#";
	const imageProperty = entry.properties.Image;
	const imageUrl =
		imageProperty?.files?.[0]?.file?.url ||
		imageProperty?.files?.[0]?.name ||
		"";
	const pubDateString =
		entry.properties["Pub-Date"]?.date?.start || new Date();
	const pubDate = new Date(pubDateString);
	const isPinned = entry.properties["Pinned?"]?.checkbox || false;
	const tags =
		entry.properties.Tags?.multi_select.map((topic: any) => topic.name) ||
		[];

	return {
		id: entry.id,
		name: entry.properties.Name?.title[0]?.plain_text ?? "Untitled",
		tags: tags,
		website: websiteUrl,
		image: imageUrl,
		pubDate,
		isPinned,
	};
};

export default async function PostsPage() {

	// Fetch the Notion data
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_POSTS_DB_ID!,
		pageId: process.env.NOTION_POSTS_PAGE_ID!,
		mapEntry: (entry) => mapPostsEntry(entry),
	});

	// Sort the items using the shared sort function (sorted by pinned and date)
	const sortedItems = sortByPinnedAndDate(listItems);

	return (
		<div className="container mx-auto p-4">
			<PageTitle title="Blog Posts" />
			<Subhead pageContent={pageContent} />

			{/* Pass sortedItems to the client-side PostsContainer */}
			<PostsContainer sortedItems={sortedItems} />
		</div>
	);
}
