import { fetchNotionData } from "../../lib/notionContentFetcher";
import { renderBlock } from "../../utils/renderItems";
import Lists from "./_list"; // Import the utility
import PageTitle from "../../components/layout/PageTitle"; // Import Page Title
import Subhead from "../../components/layout/Subhead"; // Import Subhead
import { sortByPinnedAndDate } from "../../utils/sortItems"; // Import the sort function

type ListItem = {
	id: string;
	name: string;
	description: string;
	image: string;
	date: Date;
	url: string;
	isPinned: boolean;
};

// Map the About data structure
const mapAboutEntry = (entry: any): ListItem => {
	const description =
		entry.properties.Description?.rich_text[0]?.plain_text || "";
	const image =
		entry.properties.Image?.files?.[0]?.file?.url ||
		entry.properties.Image?.files?.[0]?.external?.url ||
		"";
	const date = new Date(entry.properties.Date?.date?.start || "");
	const url = entry.properties.URL?.url || "#";
	const isPinned = entry.properties.Pinned?.checkbox || false; // Check if the item is pinned

	return {
		id: entry.id,
		name: entry.properties.Name?.title[0]?.plain_text ?? "Untitled",
		description,
		image,
		date,
		url,
		isPinned, // Add isPinned to the item
	};
};

export default async function AboutPage() {
	const { pageContent, listItems } = await fetchNotionData(
		process.env.NOTION_ABOUT_DB_ID!,
		process.env.NOTION_ABOUT_PAGE_ID!,
		mapAboutEntry // Custom mapping for About
	);

	// Sort the items using the shared sort function
	const sortedItems = sortByPinnedAndDate(listItems);

	return (
		<div className="container mx-auto p-4">
			<PageTitle title="About Me" />
			<Subhead pageContent={pageContent} />

			{/* Render the Lists component */}
			<section className="z-[-5] sticky top-0 flex items-center justify-center my-8">
				<span className="flex-grow h-px bg-gray-300"></span>
				<h3 className="px-4 text-2xl uppercase font-bold text-gray-700 dark:text-gray-200 oswald font-oswald">
					Recent Updates
				</h3>
				<span className="flex-grow h-px bg-gray-300"></span>
			</section>
			<Lists items={sortedItems} />
		</div>
	);
}
