import { getCaseStudies } from "@/lib/notion";

const DATABASE_ID = process.env.NOTION_CASE_STUDIES_DB; // Load the database ID from environment variables

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies(DATABASE_ID!);

  console.log(
    "Generated Static Params:",
    caseStudies.map(
      (cs: any) => cs.properties.Slug.rich_text[0]?.plain_text
    )
  );

  return caseStudies.map((caseStudy: any) => ({
    slug: caseStudy.properties.Slug.rich_text[0]?.plain_text,
  }));
}
export default async function CaseStudyPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const caseStudies = await getCaseStudies(DATABASE_ID!);
	const caseStudy = caseStudies.find(
		(item: any) =>
			item.properties.Slug.rich_text[0]?.plain_text === slug
	);

	if (!caseStudy) {
		console.log("Case study not found for slug:", slug);
		return <div>Case study not found.</div>;
	}

	// Extract properties
	const {
		Name,
		Date,
		Overview,
		"The Challenge": TheChallenge,
		"The Solution": TheSolution,
		"Outcomes & Lessons Learned": Outcomes,
	} = caseStudy.properties;

	return (
		<div className="prose mx-auto p-4">
			{/* Title */}
			{Name?.type === "title" && (
				<h1 className="text-3xl font-bold">
					{Name.title[0]?.plain_text}
				</h1>
			)}

			{/* Date */}
			{Date?.type === "date" && Date.date && (
				<p className="text-gray-500">{Date.date.start}</p>
			)}

			{/* Overview */}
			{Overview?.type === "rich_text" &&
				Overview.rich_text.length > 0 && (
					<section>
						<h2>Overview</h2>
						<p>{Overview.rich_text[0]?.plain_text}</p>
					</section>
				)}

			{/* The Challenge */}
			{TheChallenge?.type === "rich_text" &&
				TheChallenge.rich_text.length > 0 && (
					<section>
						<h2>The Challenge</h2>
						<p>{TheChallenge.rich_text[0]?.plain_text}</p>
					</section>
				)}

			{/* The Solution */}
			{TheSolution?.type === "rich_text" &&
				TheSolution.rich_text.length > 0 && (
					<section>
						<h2>The Solution</h2>
						<p>{TheSolution.rich_text[0]?.plain_text}</p>
					</section>
				)}

			{/* Outcomes & Lessons Learned */}
			{Outcomes?.type === "rich_text" &&
				Outcomes.rich_text.length > 0 && (
					<section>
						<h2>Outcomes & Lessons Learned</h2>
						<p>{Outcomes.rich_text[0]?.plain_text}</p>
					</section>
				)}
		</div>
	);
}
