import React, { useState, useEffect, useRef } from "react";
import { FaThumbtack, FaImage } from "react-icons/fa";
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

	// Generate Image Path
	useEffect(() => {
		if (item[slugKey]) {
			const src = `/${item[pageKey] || pageKey}/${
				item[slugKey]
			}.${fileExtension}`;
			console.log(`Generated Image Path: ${src}`);
			setImageSrc(src);
		}
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
				style={{ minHeight, height: minHeight }} // Set height and minHeight dynamically
			>
				{!imageError && imageSrc ? (
					// Check for external URL first, then internal slug
					item[urlKey] && item[urlKey] !== "#" ? (
						<a
							href={item[urlKey].startsWith('http') ? item[urlKey] : `https://${item[urlKey]}`}
							target="_blank"
							rel="noopener noreferrer"
							className="block h-full w-full"
						>
							<img
								src={imageSrc}
								alt={item[titleKey] || "Image"}
								className="h-full w-full object-cover rounded-t-xl transition-transform duration-500 ease-out transform group-hover:scale-110"
								onError={() => setImageError(true)}
							/>
						</a>
					) : item[slugKey] && pageKey === "portfolio" ? (
						<a
							href={`/${pageKey}/${item[slugKey]}`}
							className="block h-full w-full"
						>
							<img
								src={imageSrc}
								alt={item[titleKey] || "Image"}
								className="h-full w-full object-cover rounded-t-xl transition-transform duration-500 ease-out transform group-hover:scale-110"
								onError={() => setImageError(true)}
							/>
						</a>
					) : (
						<img
							src={imageSrc}
							alt={item[titleKey] || "Image"}
							className="h-full w-full object-cover rounded-t-xl transition-transform duration-500 ease-out transform group-hover:scale-110"
							onError={() => setImageError(true)}
						/>
					)
				) : (
					<div className="flex flex-col items-center justify-center w-full h-full bg-gray-200 rounded-t-xl">
						<FaImage className="text-4xl text-gray-400" />
						<span className="mt-2 text-lg text-gray-400 font-oswald">
							Image Not Available
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
				{item[urlKey] && item[urlKey] !== "#" ? (
					<h3 className="font-semibold text-gray-900 dark:text-gray-100">
						<a
							href={item[urlKey].startsWith('http') ? item[urlKey] : `https://${item[urlKey]}`}
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline"
						>
							{item[titleKey] || "Untitled"}
						</a>
					</h3>
				) : item[slugKey] && pageKey === "portfolio" ? (
					<h3 className="font-semibold text-gray-900 dark:text-gray-100">
						<a
							href={`/${pageKey}/${item[slugKey]}`}
							className="hover:underline"
						>
							{item[titleKey] || "Untitled"}
						</a>
					</h3>
				) : (
					<h3 className="font-semibold text-gray-900 dark:text-gray-100">
						{item[titleKey] || "Untitled"}
					</h3>
				)}
				{item[descriptionKey] && (
					<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
						{item[descriptionKey]}
					</p>
				)}
				{item[tagsKey] && (
					<div className="flex flex-wrap gap-2 mt-4">
						<Tags tags={item[tagsKey]} />
					</div>
				)}
				{item[cityStateKey] && (
					<p className="mt-1 text-sm text-gray-500">
						{item[cityStateKey]}
					</p>
				)}
				{item[pubDateKey] && (
					<p className="mt-4 text-sm text-gray-500">
						{new Date(item[pubDateKey]).toLocaleDateString()}
					</p>
				)}
				{/* {item[urlKey] && (
					<p className="mt-4 text-sm text-blue-600">
						<a
							href={`https://${item[urlKey]}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							{item[urlKey]}
						</a>
					</p>
				)} */}
			</div>
			</div>
		</div>
	);
};

export default GalleryCard;
