import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HybridContentFetcher } from "@/lib/hybridContentFetcher";
import { sortByPinnedAndDate, shuffleItems } from "@/utils/sortItems";
import GroupTitle from "@/app/_components/views/common/GroupTitle";
import FeaturedBuilds from "@/app/_components/views/home/FeaturedBuilds";
import WritingList from "@/app/_components/views/home/WritingList";
import SocialLinks from "@/app/_components/views/common/SocialLinks";
import type { PostItem } from "@/types";

const pinnedPostSlugs: string[] = [
	"making-the-most-out-of-mulch-stay-with-me",
];

const MIN_WRITING_POSTS = 5;
const RECENT_MONTHS = 3;
// How many writing rows appear before the Signals strip
const WRITING_HEAD_COUNT = 3;

export default async function HomePage() {
	try {
		const [postData] = await Promise.allSettled([
			HybridContentFetcher.getAllPosts(),
		]);

		const postItems: PostItem[] = postData.status === "fulfilled"
			? postData.value.listItems
			: [];

		const postItemsWithPins = postItems.map((post) => ({
			...post,
			isPinned: pinnedPostSlugs.includes(post.slug ?? "") || post.isPinned,
		}));

		const isSignalsOfDesign = (series?: string) =>
			typeof series === "string" &&
			series.trim().toLowerCase() === "signals of design";

		// Signals: shuffle for random discovery, cap at 4 for the grid
		const signalItems: PostItem[] = shuffleItems(
			postItemsWithPins.filter((post) => isSignalsOfDesign(post.series))
		).slice(0, 4);

		// Writing: recent posts, minimum floor, excluding signals
		const postItemsSorted = sortByPinnedAndDate(postItemsWithPins, "pubdate");
		const signalItemIds = new Set(signalItems.map((item) => item.id));
		const nonSignalPosts = postItemsSorted.filter(
			(post) => !signalItemIds.has(post.id)
		);

		const cutoffDate = new Date();
		cutoffDate.setMonth(cutoffDate.getMonth() - RECENT_MONTHS);

		const recentPosts = nonSignalPosts.filter((post) => {
			if (!post.pubdate) return false;
			return new Date(post.pubdate) >= cutoffDate;
		});

		const writingPosts =
			recentPosts.length >= MIN_WRITING_POSTS
				? recentPosts
				: nonSignalPosts.slice(0, Math.max(MIN_WRITING_POSTS, recentPosts.length));

		// Split writing: first N rows, then Signals strip, then the rest
		const writingHead = writingPosts.slice(0, WRITING_HEAD_COUNT);
		const writingTail = writingPosts.slice(WRITING_HEAD_COUNT);

		return (
			<div>
				{/* Hero */}
				<div className="flex flex-col align-left relative justify-center mx-auto pt-16 pb-10 mb-2 border-b border-gray-100 dark:border-gray-800 min-h-[22rem] transition-all duration-300">
					<div className="flex items-center">
						<Image
							src="/_brand/greg-ai.jpg"
							alt="Greg Robleto"
							width={80}
							height={80}
							className="rounded-full mr-5"
							priority
						/>
						<h1 className="relative flex items-center">
							<span className="text-2xl md:text-3xl font-bold uppercase tracking-[.25rem] text-gray-800 dark:text-gray-200">
								Greg Robleto
							</span>
						</h1>
					</div>
					<p className="relative font-medium text-base md:text-lg mt-4 pr-[30%] md:pr-[20%] leading-relaxed text-gray-700 dark:text-gray-300">
						Design and product leader working at the intersection of
						finance, brand, and digital platforms. Based in
						Rockville, Maryland, I explore how design, systems, and
						AI shape the next generation of financial products.
					</p>
					<p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
						Design Director at Motley Fool Asset Management.
					</p>
					<a
						href="mailto:hello@robleto.com"
						className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-link dark:text-lightlink hover:underline underline-offset-4"
					>
						hello@robleto.com
						<span aria-hidden="true">→</span>
					</a>
					<SocialLinks className="mt-4 z-10" />
				</div>

				{/* Featured work -- horizontal scroll strip, randomized */}
				<FeaturedBuilds />

				{/* Writing -- first few posts */}
				<section aria-label="Recent writing">
					<GroupTitle title="Writing" variant="left" />
					<WritingList items={writingHead} />
				</section>

				{/* Signals grid -- visual break mid-writing, 4-up, randomized */}
				{signalItems.length > 0 && (
					<div className="my-10 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
						<p className="text-[10px] tracking-[.2em] uppercase font-semibold text-gray-400 dark:text-gray-500 mb-3">
							Signals of Design
						</p>
						<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
							{signalItems.map((item) => {
								const slug = item.slug ?? "";
								const href = slug ? `/posts/${slug}` : "/posts";
								const imageSrc = slug
									? `/posts/${slug}.png`
									: (typeof item.image === "string" ? item.image.trim() : "");
								const formattedDate = item.pubdate
									? new Date(item.pubdate).toLocaleDateString("en-US", {
											month: "short",
											year: "numeric",
									  })
									: null;

								return (
									<Link
										key={item.id}
										href={href}
										className="group"
									>
										<div className="relative h-28 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 mb-2">
											{imageSrc && (
												<Image
													src={imageSrc}
													alt={item.title || "Signal"}
													fill
													sizes="(max-width: 640px) 45vw, 25vw"
													quality={60}
													loading="lazy"
													className="object-cover transition-transform duration-300 group-hover:scale-105"
												/>
											)}
										</div>
										<h3 className="text-xs font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 leading-snug group-hover:text-link dark:group-hover:text-lightlink transition-colors">
											{item.title || "Untitled"}
										</h3>
										{formattedDate && (
											<p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
												{formattedDate}
											</p>
										)}
									</Link>
								);
							})}
						</div>
					</div>
				)}

				{/* Writing -- remaining posts */}
				{writingTail.length > 0 && (
					<section aria-label="More writing" className="mb-16">
						<WritingList items={writingTail} />
					</section>
				)}
			</div>
		);
	} catch (error) {
		console.error("Error loading homepage:", error);

		return (
			<div className="my-16 pb-16 lg:my-24 max-w-7xl mx-auto px-4 lg:px-8">
				<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
					<h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">
						Unable to load content
					</h2>
					<p className="text-red-600 dark:text-red-300 mb-4">
						We&apos;re having trouble loading the homepage content. Please try refreshing the page.
					</p>
					{process.env.NODE_ENV === "development" && (
						<details className="mt-4">
							<summary className="text-sm font-medium text-red-700 dark:text-red-300 cursor-pointer">
								Technical details
							</summary>
							<pre className="mt-2 text-xs text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 p-2 rounded">
								{error instanceof Error ? error.message : "Unknown error occurred"}
							</pre>
						</details>
					)}
				</div>
			</div>
		);
	}
}
