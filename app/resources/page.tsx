import React from "react";
import fs from "fs";
import path from "path";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageHeader from "@/app/_components/layout/page/PageHeader";
import GroupTitle from "@/app/_components/views/common/GroupTitle";

// Each list is one Tags value in the Resources DB. Notion has no entries yet.
const sections = ["Figma", "Notion", "GitHub", "CodePen"];

type ResourceItem = {
	id: string;
	title: string;
	url: string;
	description: string;
	tags: string[];
	slug?: string;
	animated?: boolean;
};

// Same convention as GalleryCard: /resources/<slug>.png, or .gif when animated.
// Returns null when no local file exists, so the row has no image.
const getImageSrc = (item: ResourceItem): string | null => {
	if (!item.slug) return null;
	const ext = item.animated ? "gif" : "png";
	const file = path.join(process.cwd(), "public", "resources", `${item.slug}.${ext}`);
	return fs.existsSync(file) ? `/resources/${item.slug}.${ext}` : null;
};

export default async function ResourcesPage() {
	const { pageContent, listItems } = await fetchNotionData({
		databaseId: process.env.NOTION_RESOURCES_DB_ID!,
		pageId: process.env.NOTION_RESOURCES_PAGE_ID!,
		entryType: "resources",
	});

	const items = listItems as ResourceItem[];

	return (
		<div>
			<PageHeader title="Resources" icon="resources" pageContent={pageContent} />

			{sections.map((section) => {
				const sectionItems = items
					.filter((item) => item.tags?.includes(section))
					.sort((a, b) => a.title.localeCompare(b.title));

				return (
					<div key={section}>
						<GroupTitle variant="left" as="h2" title={section} />
						{sectionItems.length === 0 ? (
							<p className="text-base text-gray-700 dark:text-gray-300">Coming soon.</p>
						) : (
							<ul className="divide-y divide-gray-200 dark:divide-gray-700">
								{sectionItems.map((item) => (
									<li key={item.id} className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 py-5">
										<div className="min-w-0 md:max-w-[60ch]">
											<a
												href={item.url}
												target="_blank"
												rel="noopener noreferrer"
												className="font-semibold text-link dark:text-lightlink hover:underline underline-offset-4"
											>
												{item.title}
											</a>
											{item.description && (
												<p className="mt-1 text-base leading-relaxed text-gray-700 dark:text-gray-300">
													{item.description}
												</p>
											)}
										</div>
										{getImageSrc(item) && (
											<img
												src={getImageSrc(item)!}
												alt=""
												className="order-first md:order-none shrink-0 w-full h-40 md:w-36 md:h-24 md:ml-auto object-cover rounded-md"
											/>
										)}
									</li>
								))}
							</ul>
						)}
					</div>
				);
			})}
		</div>
	);
}
