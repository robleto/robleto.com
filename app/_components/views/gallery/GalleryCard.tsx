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
	const cardRef = useRef<HTMLDivElement | null>(null);

	// Get the index of this item in the parent array to alternate layout
	const index = item.index ?? 0; // This should be set when mapping items in `Gallery.tsx`

	useEffect(() => {
		if (item[slugKey]) {
			const src = `./${item[pageKey] || pageKey}/${item[slugKey]}.${
				item[animatedKey] ? "gif" : "png"
			}`;
			setImageSrc(src);
		}
	}, [item, pageKey, slugKey, animatedKey]);

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

	// Only apply two-column layout if lgGridCols is "lg:grid-cols-1"
	const enableTwoColumnLayout = lgGridCols === "lg:grid-cols-1";
	const layoutClass = enableTwoColumnLayout
		? `md:flex md:items-center md:gap-6 ${
				index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
		  }`
		: "";

	return (
		<div
			ref={cardRef}
			className={`relative flex flex-col overflow-hidden shadow-lg rounded-xl ${
				enableTwoColumnLayout ? layoutClass : "bg-white"
			} group`}
		>
			{/* Image Section (2/3 width, rounded-xl, transparent if image exists) */}
			<div
				className={`${
					enableTwoColumnLayout ? "md:w-2/3 md:h-[350px]" : "w-full"
				} flex items-center justify-center overflow-hidden ${
					imageError ? "bg-gray-200" : "bg-transparent"
				} min-h-[300px] relative`}
			>
				{!imageError && imageSrc ? (
					<img
						src={imageSrc}
						alt={item[titleKey] || "Image"}
						className={`h-full w-full object-cover rounded-t-xl transition-transform duration-500 ease-out transform group-hover:scale-110`}
						onError={() => setImageError(true)}
					/>
				) : (
					<div className="flex flex-col items-center justify-center w-full h-full bg-gray-200 rounded-xl">
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
						? "md:w-1/3 md:h-[350px] p-6 flex flex-col justify-center"
						: "p-6 bg-white rounded-xl"
				} w-full`}
			>
				<h3 className="font-semibold text-gray-900 dark:text-gray-100">
					{item[titleKey] || "Untitled"}
				</h3>
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
					<p className="mt-4 text-sm text-gray-500">
						{item[cityStateKey]}
					</p>
				)}
				{item[pubDateKey] && (
					<p className="mt-4 text-sm text-gray-500">
						{new Date(item[pubDateKey]).toLocaleDateString()}
					</p>
				)}
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
};

export default GalleryCard;
