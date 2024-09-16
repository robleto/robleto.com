import { getProjects } from "../lib/notionProjects";

export default async function Home() {
	const projects = await getProjects(); // Fetch projects from Notion

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold">My Projects</h1>
			<ul>
				{projects.map((project: any) => (
					<li key={project.id}>
						{project.properties.Name.title[0].plain_text}
					</li>
				))}
			</ul>
		</div>
	);
}
