import React, { useState, useEffect } from "react";
import { FaImage } from "react-icons/fa";
import Tags from "./Tags"; // Component to display tags

type GalleryCardProps = {
	item: any;
	pageKey?: string;
	titleKey?: string;
	slugKey?: string;
	linkKey?: string;
	descriptionKey?: string;
	tagsKey?: string;
	urlKey?: string;
	cityStateKey?: string;
	animatedKey?: string;
};

const GalleryCard: React.FC<GalleryCardProps> = ({
	item,
	pageKey = "page",
	titleKey = "title",
	slugKey = "slug",
	linkKey = "",
	descriptionKey = "description",
	tagsKey = "tags",
	urlKey = "url",
	cityStateKey = "cityState",
	animatedKey = "animated", // Ensure animated images are handled
}) => {
	const [imageError, setImageError] = useState(false); // Track image load errors
	const [imageSrc, setImageSrc] = useState(""); // Set the image source dynamically

	// Determine the file extension based on whether the item is animated
	let fileExtension = "png"; // Default to png for most
	if (item?.[animatedKey]) {
		fileExtension = "gif"; // Use gif for animated
	} else if (pageKey === "library" || pageKey === "travel") {
		fileExtension = "jpg"; // Use jpg for library and travel
	}

	// Dynamically add padding for "library" page
	const imageContainerClass =
		pageKey === "library" ? "object-contain" : "object-cover h-full w-full";

	// Set the image source URL
	useEffect(() => {
		if (item[slugKey]) {
			const src = `./${item[pageKey] || pageKey}/${
				item[slugKey]
			}.${fileExtension}`;
			setImageSrc(src);
		}
	}, [item, pageKey, slugKey, fileExtension]);

	// Build the card content
	const cardContent = (
		<div className="gallery-card bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col h-full">
			{/* Image */}
			<div
				className={`relative h-48 w-full flex items-center justify-center overflow-hidden rounded-t-md bg-gray-200 dark:bg-gray-800 ${
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

	// If `linkKey` is provided, wrap the card content in a link
	return item[linkKey] ? (
		<a
			href={item[linkKey]}
			target="_blank"
			rel="noopener noreferrer"
			className="block"
		>
			{cardContent}
		</a>
	) : (
		<div>{cardContent}</div>
	);
};

export default GalleryCard;
