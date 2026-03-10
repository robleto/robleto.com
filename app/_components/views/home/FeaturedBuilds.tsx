import React from "react";
import Link from "next/link";
import Image from "next/image";
import GroupTitle from "@/app/_components/views/common/GroupTitle";
import { HybridContentFetcher } from "@/lib/hybridContentFetcher";
import { sortByOrder } from "@/utils/sortItems";
import type { ProjectItem } from "@/types";

const isWorkInProgress = (item: ProjectItem): boolean => {
	const tags = Array.isArray(item.tags) ? item.tags : [];
	const normalizedTags = tags.map((tag) => tag.trim().toLowerCase());

	return (
		normalizedTags.includes("work in progress") ||
		normalizedTags.includes("wip") ||
		normalizedTags.includes("in progress") ||
		normalizedTags.includes("side-project")
	);
};

const FeaturedBuilds = async () => {
	const { listItems } = await HybridContentFetcher.getAllProjects();
	const projectItems = listItems as ProjectItem[];
	const wipItems = sortByOrder(projectItems.filter(isWorkInProgress));
	const itemsToRender = wipItems.length > 0 ? wipItems : sortByOrder(projectItems);

	return (
		<section id="featured-builds" className="scroll-mt-24" aria-label="Featured builds">
			<GroupTitle title="Featured Builds" />
			<div className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
				<div className="flex gap-4 snap-x snap-mandatory">
					{itemsToRender.map((item) => {
						let href = item.url && item.url !== "#"
							? item.url
							: item.slug
							? `/projects/${item.slug}`
							: "/projects";

						// Ensure URLs like "www.example.com" get a protocol prefix
						if (href && /^www\./i.test(href)) {
							href = `https://${href}`;
						}

						const imageSrc = item.image || (item.slug ? `/projects/${item.slug}.png` : "");

						const isExternal = /^https?:\/\//i.test(href);

						const CardWrapper = ({ children }: { children: React.ReactNode }) =>
							isExternal ? (
								<a
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									className="block h-full"
								>
									{children}
								</a>
							) : (
								<Link href={href} className="block h-full">
									{children}
								</Link>
							);

						return (
							<div key={item.id} className="snap-start w-[15rem] sm:w-[16rem] shrink-0">
								<CardWrapper>
									<article className="h-[18.5rem] rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 transition-transform duration-200 hover:-translate-y-1">
										<div className="h-32 w-full bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
											{imageSrc ? (
												<Image
													src={imageSrc}
													alt={item.title || "Project image"}
													fill
													sizes="(max-width: 640px) 240px, 256px"
													quality={60}
													loading="lazy"
													className="object-cover"
												/>
											) : (
												<div className="h-full w-full" />
											)}
										</div>

										<div className="h-[10.5rem] p-3.5 flex flex-col">
											<h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 min-h-[2.5rem]">
												{item.title || "Untitled"}
											</h3>
											<p className="mt-1.5 text-xs text-gray-600 dark:text-gray-400 line-clamp-3 min-h-[3.6rem]">
												{item.description || ""}
											</p>
											<div className="mt-auto pt-2">
												{item.tags?.[0] ? (
													<span className="inline-flex items-center rounded-full border border-gray-300 dark:border-gray-600 px-2 py-0.5 text-[10px] tracking-wide uppercase text-gray-600 dark:text-gray-300">
														{item.tags[0]}
													</span>
												) : null}
											</div>
										</div>
									</article>
								</CardWrapper>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default FeaturedBuilds;
