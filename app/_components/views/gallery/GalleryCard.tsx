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
};

const GalleryCard: React.FC<GalleryCardProps> = ({
	item,
	pageKey = "page",
	titleKey = "title",
	slugKey = "slug",
	linkKey = "",
	pubDateKey = "pubDate",
	descriptionKey = "description",
	tagsKey = "tags",
	urlKey = "url",
	cityStateKey = "cityState",
	animatedKey = "animated",
	lgGridCols,
}) => {
	const [imageError, setImageError] = useState(false);
	const [imageSrc, setImageSrc] = useState("");
	const cardRef = useRef<HTMLDivElement | null>(null); // Ref for the card

	// Determine the file extension based on whether the item is animated or a photo
	let fileExtension = "png";
	if (item?.[animatedKey]) {
		fileExtension = "gif"; // Use gif for animated
	} else if (pageKey === "library" || pageKey === "travel") {
		fileExtension = "jpg"; // Use jpg for library and travel
	}

	const imageContainerClass =
		pageKey === "library" ? "object-contain" : "object-cover h-full w-full";

	useEffect(() => {
		if (item[slugKey]) {
			const src = `./${item[pageKey] || pageKey}/${
				item[slugKey]
			}.${fileExtension}`;
			setImageSrc(src);
		}
	}, [item, pageKey, slugKey, fileExtension]);

	// GSAP animation effect
	useEffect(() => {
		gsap.fromTo(
			cardRef.current,
			{ opacity: 0 }, // Initial state
			{
				opacity: 1,
				duration: 1,
				scrollTrigger: {
					trigger: cardRef.current,
					start: "top 90%", // When the card enters the viewport
					end: "bottom 75%", // When it exits
					toggleActions: "play none none none", // Play animation once
				},
			}
		);
	}, []);

	// Format the date using native JavaScript
	const formatDate = (dateString?: string) => {
		if (!dateString) return "Date Not Available";
		return new Date(dateString).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	const cardContent = (
		<div
			ref={cardRef} // Attach the ref to the card container
			className="gallery-card relative bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col h-full"
		>
			{/* Image */}
			<div
				className={`relative ${
					lgGridCols === "lg:grid-cols-1" ? "h-72" : "h-48"
				} w-full flex items-center justify-center overflow-hidden rounded-t-md bg-gray-200 dark:bg-gray-800 ${
					pageKey === "library" ? "p-4" : ""
				}`}
			>
				{!imageError && imageSrc ? (
					<img
						src={imageSrc}
						alt={item[titleKey] || "Image"}
						className={`h-full w-full ${imageContainerClass}`}
						onError={() => setImageError(true)} // Handle image load failure
					/>
				) : (
					<div className="h-full w-full bg-gray-200 flex items-center flex-col justify-center">
						<FaImage className="text-4xl text-gray-400" />
						<span className="text-gray-400 text-lg mt-2 font-oswald">
							Image Not Available
						</span>
					</div>
				)}
			</div>

			{/* Title */}
			<div className="p-4 flex-grow">
				<h3 className="text-lg leading-5 font-semibold text-gray-900 dark:text-gray-100">
					{item[titleKey] || "Untitled"}
				</h3>
				{/* Description */}
				{item[descriptionKey] && (
					<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
						{item[descriptionKey]}
					</p>
				)}
				{/* Tags */}
				{item[tagsKey] && (
					<div className="mt-4 flex flex-wrap gap-2">
						<Tags tags={item[tagsKey]} />
					</div>
				)}
				{/* City & State */}
				{item[cityStateKey] && (
					<p className="mt-4 text-sm text-gray-500">
						{item[cityStateKey]}
					</p>
				)}
				{/* Pub Date  */}
				{item[pubDateKey] && (
					<p className="mt-4 text-sm text-gray-500">
						{formatDate(item[pubDateKey])}
					</p>
				)}
				{/* URL */}
				{item[urlKey] && (
					<p className="mt-4 text-sm text-blue-600">
						<a
							href={item[urlKey]}
							target="_blank"
							rel="noopener noreferrer"
						>
							{item[urlKey]}
						</a>
					</p>
				)}
			</div>
		</div>
	);

	return item[linkKey] ? (
		<a
			href={
				item[linkKey].startsWith("http://") ||
				item[linkKey].startsWith("https://")
					? item[linkKey]
					: `https://${item[linkKey]}`
			}
			target="_blank"
			rel="noopener noreferrer"
			className="block relative"
		>
			{/* Pin icon */}
			{item.isPinned && (
				<div className="absolute top-[-8px] right-[-8px] z-10">
					<FaThumbtack className="text-gray-300 h-6 w-6 rotate-45" />
				</div>
			)}

			{cardContent}
		</a>
	) : (
		<div>{cardContent}</div>
	);
};

export default GalleryCard;
