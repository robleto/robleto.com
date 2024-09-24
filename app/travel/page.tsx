import { fetchNotionData } from "../../lib/notionContentFetcher";
import { renderBlock } from "../../utils/renderItems";
import Gallery from "./_gallery"; // Import Gallery
import PageTitle from "../../components/layout/PageTitle"; // Import Page Title
import Subhead from "../../components/layout/Subhead"; // Import Subhead
import {
	groupItemsByVariable,
	sortGroupsAlphabetically,
} from "../../utils/groupItems"; // Import the grouping function
import { filterItemsByProperty } from "../../utils/filterItems"; // Import the new filtering function

// Map the Travel data structure
const mapTravelEntry = (entry: any) => {
	// Adding fallbacks for properties to avoid breaking the map function
	const imageProperty = entry?.properties?.Image || {};
	const city =
		entry?.properties?.City?.rich_text?.[0]?.plain_text || "Unknown City";
	const state = entry?.properties?.State?.select?.name || "Unknown State";
	const cityState = `${city}, ${state}`;

	// Fetch the image URL based on file name or external url
	const imageUrl =
		imageProperty?.files?.[0]?.file?.url ||
		imageProperty?.files?.[0]?.name ||
		"";

	// Return the mapped travel entry, including the Seen property
	return {
		id: entry.id,
		title: entry.properties?.Name?.title?.[0]?.plain_text ?? "Untitled",
		city,
		state,
		cityState,
		Seen: entry?.properties?.Seen?.select?.name || "Unknown", // The Seen property to filter
		image: imageUrl,
		url: entry.properties?.URL?.url || "#",
	};
};

export default async function TravelPage() {
	// Fetch the data from Notion
	const { pageContent, listItems } = await fetchNotionData(
		process.env.NOTION_TRAVEL_DB_ID!,
		process.env.NOTION_TRAVEL_PAGE_ID!,
		mapTravelEntry
	);

	// Check if listItems has valid data
	if (!listItems || listItems.length === 0) {
		return <div>No travel data available.</div>; // Early exit if no data
	}

	// Step 1: Filter the items based on the "Seen?" property being "Been there"
	// We now pass "Seen" and "Been there" as dynamic values to the filter utility
	const filteredItems = filterItemsByProperty(
		listItems,
		"Seen",
		"Been there"
	);

	// Step 2: Group the filtered items by state
	const groupedItems = groupItemsByVariable(filteredItems, "state");

	// Step 3: Sort the group names alphabetically
	const sortedGroupKeys = sortGroupsAlphabetically(groupedItems);

	// Step 4: Sort items within each group alphabetically by title
	const sortedGroupedItems = sortedGroupKeys.reduce(
		(acc: any, state: string) => {
			acc[state] = groupedItems[state].sort((a: any, b: any) =>
				a.title.localeCompare(b.title)
			);
			return acc;
		},
		{}
	);

	return (
		<div className="container mx-auto p-4">
			<PageTitle title="Travels" />
			<Subhead pageContent={pageContent} />

			{/* Render the Gallery component grouped by State */}
			{sortedGroupKeys.map((state: string) => (
				<section key={state}>
					<section className="sticky top-0 z-10 flex items-center justify-center my-8">
						<span className="flex-grow h-px bg-gray-300 shadow"></span>
						<h3 className="px-4 text-2xl uppercase font-bold text-gray-700 dark:text-gray-200 oswald font-oswald">
							<span className="shadow">{state}</span>
						</h3>
						<span className="flex-grow h-px bg-gray-300 shadow"></span>
					</section>
					<Gallery
						items={sortedGroupedItems[state]}
						columns="md:grid-cols-3"
					/>
				</section>
			))}
		</div>
	);
}
