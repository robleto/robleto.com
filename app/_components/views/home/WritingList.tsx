"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { PostItem } from "@/types";

gsap.registerPlugin(ScrollTrigger);

type WritingListProps = {
	items: PostItem[];
};

const WritingListItem: React.FC<{ item: PostItem }> = ({ item }) => {
	const rowRef = useRef<HTMLDivElement | null>(null);
	const [imageError, setImageError] = useState(false);

	const slug = item.slug ?? "";
	const href = slug ? `/posts/${slug}` : "#";
	const localImage = slug ? `/posts/${slug}.png` : "";
	const notionImage = typeof item.image === "string" ? item.image.trim() : "";
	const [imageSrc, setImageSrc] = useState(localImage || notionImage);

	const category =
		Array.isArray(item.tags) && item.tags.length > 0 ? item.tags[0] : null;

	const formattedDate = item.pubdate
		? new Date(item.pubdate).toLocaleDateString("en-US", {
				month: "short",
				year: "numeric",
		  })
		: null;

	useEffect(() => {
		gsap.fromTo(
			rowRef.current,
			{ opacity: 0, y: 12 },
			{
				opacity: 1,
				y: 0,
				duration: 0.6,
				scrollTrigger: {
					trigger: rowRef.current,
					start: "top 92%",
					toggleActions: "play none none none",
				},
			}
		);
	}, []);

	const handleImageError = () => {
		if (notionImage && imageSrc !== notionImage) {
			setImageSrc(notionImage);
			return;
		}
		setImageError(true);
	};

	return (
		<div ref={rowRef}>
			<Link href={href} className="block group">
				<article className="flex flex-col-reverse sm:flex-row items-start gap-4 sm:gap-6 py-5 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200 group-hover:bg-gray-50/50 dark:group-hover:bg-gray-800/30 -mx-3 px-3 rounded-lg">
					{/* Text content */}
					<div className="flex-1 min-w-0">
						<h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 leading-snug line-clamp-2 group-hover:text-link transition-colors duration-200">
							{item.title || "Untitled"}
						</h3>
						{item.description && (
							<p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
								{item.description}
							</p>
						)}
						<div className="mt-2 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
							{category && (
								<>
									<span className="uppercase tracking-wide font-medium text-gray-500 dark:text-gray-400">
										{category}
									</span>
									<span aria-hidden="true">&middot;</span>
								</>
							)}
							{formattedDate && <span>{formattedDate}</span>}
						</div>
					</div>

					{/* Thumbnail */}
					<div className="w-full sm:w-[30%] sm:max-w-[200px] flex-shrink-0 aspect-[16/10] sm:aspect-[3/2] relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
						{!imageError && imageSrc ? (
							<Image
								src={imageSrc}
								alt={item.title || "Article image"}
								fill
								sizes="(max-width: 640px) 100vw, 200px"
								quality={60}
								loading="lazy"
								className="object-cover transition-transform duration-300 group-hover:scale-105"
								onError={handleImageError}
							/>
						) : (
							<div className="w-full h-full bg-gray-200 dark:bg-gray-700" />
						)}
					</div>
				</article>
			</Link>
		</div>
	);
};

const WritingList: React.FC<WritingListProps> = ({ items }) => {
	return (
		<div className="container mx-auto">
			{items.map((item) => (
				<WritingListItem key={item.id} item={item} />
			))}
		</div>
	);
};

export default WritingList;
