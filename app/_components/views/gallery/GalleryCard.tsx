import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tags from "../common/Tags"; // Component to display tags

gsap.registerPlugin(ScrollTrigger);

type GalleryCardProps = {
	item: any;
	pageKey?: string;
	titleKey?: string;
	slugKey?: string;
	linkKey?: string;
	pubDateKey?: string;
	descriptionKey?: string;
	tagsKey?: string;
	urlKey?: string;
	cityStateKey?: string;
	animatedKey?: string;
	dateFormat?: "default" | "month-year";
	lgGridCols: string;
	minHeight?: string; // New prop for adjustable height
};

const GalleryCard: React.FC<GalleryCardProps> = ({
	item,
	pageKey = "page",
	titleKey = "title",
	slugKey = "slug",
	linkKey = "linkedURL",
	pubDateKey = "pubDate",
	descriptionKey = "description",
	tagsKey = "tags",
	urlKey = "url",
	cityStateKey = "cityState",
	animatedKey = "animated",
	dateFormat = "default",
	lgGridCols,
	minHeight = "300px", // Default min-height
}) => {
	const [imageError, setImageError] = useState(false);
	const [imageSrc, setImageSrc] = useState("");
	const cardRef = useRef<HTMLDivElement | null>(null);

	// Determine correct file extension based on page type
	let fileExtension = "png";
	if (item?.[animatedKey]) {
		fileExtension = "gif"; // Use gif for animated
	} else if (
		["library", "travel", "lists", "musicals", "board-games"].includes(
			pageKey
		)
	) {
		fileExtension = "jpg"; // Use jpg for specific sections
	}

	// Generate image source: prefer local slug image, fallback to mapped Notion image
	useEffect(() => {
		const notionImage =
			typeof item.image === "string" ? item.image.trim() : "";
		const localImage = item[slugKey]
			? `/${item[pageKey] || pageKey}/${item[slugKey]}.${fileExtension}`
			: "";

		setImageError(false);
		setImageSrc(localImage || notionImage);
	}, [item, pageKey, slugKey, fileExtension]);

	// GSAP animation
	useEffect(() => {
		gsap.fromTo(
			cardRef.current,
			{ opacity: 0 },
			{
				opacity: 1,
				duration: 1,
				scrollTrigger: {
					trigger: cardRef.current,
					start: "top 90%",
					end: "bottom 75%",
					toggleActions: "play none none none",
				},
			}
		);
	}, []);

	// Enable side-by-side layout for `lg:grid-cols-1`
	const enableTwoColumnLayout = lgGridCols === "lg:grid-cols-1";
	const layoutClass = enableTwoColumnLayout
		? `md:flex md:items-center md:gap-6 ${
				item.index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
		  }`
		: "";

	const rawUrl = typeof item[urlKey] === "string" ? item[urlKey].trim() : "";
	const isPlaceholderUrl =
		rawUrl === "#" || rawUrl === "https:/#" || rawUrl === "http:/#";
	const isInternalUrl = rawUrl.startsWith("/");
	const isExternalUrl = /^https?:\/\//i.test(rawUrl);
	const isDomainLikeUrl = rawUrl.length > 0 && !isInternalUrl && !isExternalUrl;
	const hasValidUrl = rawUrl.length > 0 && !isPlaceholderUrl;
	const resolvedUrl = isInternalUrl || isExternalUrl ? rawUrl : isDomainLikeUrl ? `https://${rawUrl}` : "";

	// Posts-card specific: use first tag as primary category
	const isPostsCard = pageKey === "posts";
	const category =
		isPostsCard &&
		Array.isArray(item[tagsKey]) &&
		item[tagsKey].length > 0
			? item[tagsKey][0]
			: null;

	const formattedDate = item[pubDateKey]
		? new Date(item[pubDateKey]).toLocaleDateString(
				"en-US",
				dateFormat === "month-year"
					? { month: "short", year: "numeric" }
					: undefined
		  )
		: null;
	const notionFallbackSrc =
		typeof item.image === "string" ? item.image.trim() : "";

	const handleImageError = () => {
		if (notionFallbackSrc && imageSrc !== notionFallbackSrc) {
			setImageSrc(notionFallbackSrc);
			return;
		}
		setImageError(true);
	};

	const titleClass = `font-semibold text-gray-900 dark:text-gray-100${
		isPostsCard ? " leading-tight line-clamp-3 md:line-clamp-2" : ""
	}`;
	const optimizedCardSizes =
		"(max-width: 768px) 96vw, (max-width: 1280px) 48vw, 520px";

	return (
		<div ref={cardRef} className="relative group">
			{/* Ensure white background in both layouts */}
			<div
				className={`flex flex-col overflow-hidden shadow-lg rounded-xl ${
					enableTwoColumnLayout ? layoutClass : "bg-white dark:bg-gray-800"
				}`}
			>
			{/* Image Section (2/3 width, rounded-xl, transparent if image exists) */}
			<div
				className={`${
					enableTwoColumnLayout ? "md:w-2/3" : "w-full"
				} flex items-center justify-center overflow-hidden ${
					imageError ? "bg-gray-200" : "bg-transparent"
				} relative`}
				style={{ minHeight, height: minHeight }}
			>
				{!imageError && imageSrc ? (
					// Check for external URL first, then internal slug
					hasValidUrl ? (
						<a
							href={resolvedUrl}
							target={isExternalUrl || isDomainLikeUrl ? "_blank" : undefined}
							rel={isExternalUrl || isDomainLikeUrl ? "noopener noreferrer" : undefined}
							className="block h-full w-full"
						>
							<Image
								src={imageSrc}
								alt={item[titleKey] || "Image"}
								fill
								sizes={optimizedCardSizes}
								quality={65}
								loading="lazy"
								className="object-cover rounded-t-xl transition-transform duration-500 ease-out transform group-hover:scale-110"
								onError={handleImageError}
							/>
						</a>
					) : item[slugKey] && pageKey === "portfolio" ? (
						<a
							href={`/${pageKey}/${item[slugKey]}`}
							className="block h-full w-full"
						>
							<Image
								src={imageSrc}
								alt={item[titleKey] || "Image"}
								fill
								sizes={optimizedCardSizes}
								quality={65}
								loading="lazy"
								className="object-cover rounded-t-xl transition-transform duration-500 ease-out transform group-hover:scale-110"
								onError={handleImageError}
							/>
						</a>
					) : (
						<Image
							src={imageSrc}
							alt={item[titleKey] || "Image"}
							fill
							sizes={optimizedCardSizes}
							quality={65}
							loading="lazy"
							className="object-cover rounded-t-xl transition-transform duration-500 ease-out transform group-hover:scale-110"
							onError={handleImageError}
						/>
					)
				) : (
					<div
						className="flex items-center justify-center w-full h-full bg-gray-200 rounded-t-xl"
						aria-hidden="true"
					>
						<FaImage className="text-3xl text-gray-400" />
					</div>
				)}
				{/* Category pill overlay — posts cards only */}
				{isPostsCard && category && (
					<div className="absolute top-2 left-2 z-10 pointer-events-none">
						<span className="bg-black/50 backdrop-blur-sm text-white text-[11px] font-medium leading-none px-2.5 py-1 rounded-full border border-white/20">
							{category}
						</span>
					</div>
				)}
			</div>

			{/* Text Content (1/3 width, no shadow, no extra rounding) */}
			<div
				className={`${
					enableTwoColumnLayout
						? "md:w-1/3 p-6 flex flex-col justify-center bg-white dark:bg-gray-800"
						: "p-6 rounded-xl"
				} w-full`}
			>
				{/* Check for external URL first, then internal slug */}
				{hasValidUrl ? (
					<h3 className={titleClass}>
						<a
							href={resolvedUrl}
							target={isExternalUrl || isDomainLikeUrl ? "_blank" : undefined}
							rel={isExternalUrl || isDomainLikeUrl ? "noopener noreferrer" : undefined}
							className="hover:underline"
						>
							{item[titleKey] || "Untitled"}
						</a>
					</h3>
				) : item[slugKey] && pageKey === "portfolio" ? (
					<h3 className={titleClass}>
						<a
							href={`/${pageKey}/${item[slugKey]}`}
							className="hover:underline"
						>
							{item[titleKey] || "Untitled"}
						</a>
					</h3>
				) : (
					<h3 className={titleClass}>
						{item[titleKey] || "Untitled"}
					</h3>
				)}
				{/* Date meta line directly under title — posts cards only */}
				{isPostsCard && formattedDate && (
					<p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
						{formattedDate}
					</p>
				)}
				{item[descriptionKey] && (
					<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
						{item[descriptionKey]}
					</p>
				)}
				{/* Tags row — hidden on posts cards, shown elsewhere */}
				{!isPostsCard && Array.isArray(item[tagsKey]) && item[tagsKey].length > 0 && (
					<div className="flex flex-wrap gap-2 mt-4">
						<Tags tags={item[tagsKey]} />
					</div>
				)}
				{item[cityStateKey] && (
					<p className="mt-1 text-sm text-gray-500">
						{item[cityStateKey]}
					</p>
				)}
				{/* Date row — non-posts cards only */}
				{!isPostsCard && formattedDate && (
					<p className="mt-4 text-sm text-gray-500">
						{formattedDate}
					</p>
				)}
			</div>
			</div>
		</div>
	);
};

export default GalleryCard;
