import { getProjects, getPageContent } from "../../lib/notionProjects"; // Ensure this import exists
import { renderBlock } from "../../utils/renderBlock"; // Import the renderBlock utility
import Gallery from "../../components/Gallery"; // Import the reusable Gallery component
import { sortByOrder } from "../../utils/sortbyOrder"; // Import the sorting utility

export default async function ProjectsPage() {
	const projects = await getProjects(); // Fetch Projects DB
	const pageContent = await getPageContent(
		process.env.NOTION_PROJECTS_PAGE_ID!
	); // Fetch page content

	// Use the sortByOrder utility to sort the projects by SortOrder
	const sortedProjects = sortByOrder(projects);

	// Map the sorted projects to the gallery items format
	const galleryItems = sortedProjects.map((project: any) => ({
		id: project.id,
		title: project.properties.Name?.title[0]?.plain_text ?? "Untitled",
		description:
			project.properties.Description?.rich_text[0]?.plain_text ?? "",
		cover: project.cover?.file?.url || project.cover?.external?.url,
		url: project.properties.URL?.url || "", // Use the custom "Url" property for external link
	}));

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold">Projects</h1>

			{/* Display the page content from Notion */}
			<section className="notion-page-content">
				{pageContent.map((block: any) => renderBlock(block))}
			</section>

			{/* Render the Gallery component */}
			<section>
				<h2 className="text-xl font-bold mt-8">Project Gallery</h2>
				<Gallery items={galleryItems} columns="md:grid-cols-2" />
			</section>
		</div>
	);
}
