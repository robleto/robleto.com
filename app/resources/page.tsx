import { getDatabaseEntries, getPageContent } from "../../lib/notion";
import { renderBlock } from "../../utils/renderItems";
import Gallery from "./_gallery"; // Import Gallery
import PageTitle from "../../components/layout/PageTitle"; // Import Page Title
import Subhead from "../../components/layout/Subhead"; // Import Subhead

export default async function ResourcesPage() {
	
	// Fetch Resources database entries
	const resourcesItems = await getDatabaseEntries(process.env.NOTION_RESOURCES_DB_ID!);
	// Fetch the Notion page content for additional content
	const pageContent = await getPageContent(process.env.NOTION_RESOURCES_PAGE_ID!);

	// Map the resources items to the Gallery format
	const galleryItems = resourcesItems.map((resources: any) => {
		const imageProperty = resources.properties.Image;

		// Fetch the image URL based on file name or external url
		const imageUrl =
			imageProperty?.files?.[0]?.file?.url || // For uploaded image URL
			imageProperty?.files?.[0]?.name || // If it's stored under 'name'
			"";

		// Fetch the Featured property
		const featured = resources.properties.Featured?.checkbox || false;

		const topics = resources.properties.Topics?.multi_select || [];

		return {
			id: resources.id,
			title: resources.properties.Name?.title[0]?.plain_text ?? "Untitled",
			topics: topics.map((topic: any) => topic.name), // Get an array of topic names
			image: imageUrl,
			url: resources.properties.URL?.url || "#",
			featured, // Pinned field to order the list
		};
	});

	return (
		<div className="container mx-auto p-4">
			
			<PageTitle title="Free Resources" />
			<Subhead pageContent={pageContent} />

			{/* Render the Gallery component grouped by Topic */}
			<Gallery items={galleryItems} />
		</div>
	);
}
