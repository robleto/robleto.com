"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CaseStudyItem = {
	id: string;
	title?: string;
	slug?: string;
	subtitle?: string;
	image?: string;
	tags?: string[];
};

type CaseStudyListProps = {
	items: CaseStudyItem[];
};

const CaseStudyCard: React.FC<{ item: CaseStudyItem }> = ({ item }) => {
	const cardRef = useRef<HTMLDivElement | null>(null);
	const [imageError, setImageError] = useState(false);

	const slug = item.slug ?? "";
	const href = slug ? `/portfolio/${slug}` : "#";
	const localImage = slug ? `/portfolio/${slug}.png` : "";
	const notionImage = typeof item.image === "string" ? item.image.trim() : "";
	const [imageSrc, setImageSrc] = useState(localImage || notionImage);

	const tags = Array.isArray(item.tags) ? item.tags : [];

	useEffect(() => {
		gsap.fromTo(
			cardRef.current,
			{ opacity: 0, y: 16 },
			{
				opacity: 1,
				y: 0,
				duration: 0.7,
				scrollTrigger: {
					trigger: cardRef.current,
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
		<div ref={cardRef}>
			<Link href={href} className="block group">
				<article className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-0 overflow-hidden rounded-lg bg-white/50 dark:bg-gray-800/30 shadow-sm transition-shadow duration-200 group-hover:shadow-md">
					{/* Image */}
					<div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
						{!imageError && imageSrc ? (
							<Image
								src={imageSrc}
								alt={item.title || "Case study image"}
								fill
								sizes="(max-width: 768px) 100vw, 55vw"
								quality={70}
								loading="lazy"
								className="object-cover transition-transform duration-500 group-hover:scale-105"
								onError={handleImageError}
							/>
						) : (
							<div className="w-full h-full bg-gray-200 dark:bg-gray-700" />
						)}
					</div>

					{/* Text content */}
					<div className="flex flex-col justify-center p-6 md:p-8">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 leading-snug group-hover:text-link transition-colors duration-200">
							{item.title || "Untitled"}
						</h3>
						{item.subtitle && (
							<p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
								{item.subtitle}
							</p>
						)}
						{tags.length > 0 && (
							<div className="mt-3 flex flex-wrap gap-2">
								{tags.slice(0, 3).map((tag) => (
									<span
										key={tag}
										className="text-[11px] uppercase tracking-wide font-medium text-gray-500 dark:text-gray-400"
									>
										{tag}
									</span>
								))}
							</div>
						)}
					</div>
				</article>
			</Link>
		</div>
	);
};

const CaseStudyList: React.FC<CaseStudyListProps> = ({ items }) => {
	return (
		<div className="bg-gray-50 dark:bg-gray-800/20 rounded-2xl p-6 md:p-10">
			<div className="grid grid-cols-1 gap-6">
				{items.map((item) => (
					<CaseStudyCard key={item.id} item={item} />
				))}
			</div>
		</div>
	);
};

export default CaseStudyList;
