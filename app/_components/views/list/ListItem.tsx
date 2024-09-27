import React, { useState, useEffect } from "react";
import { FaThumbtack, FaImage } from "react-icons/fa";
import Tags from "@/app/_components/views/common/Tags";
import { format } from "date-fns";

type ListItemProps = {
	item: any;
	pageKey?: string;
	titleKey?: string;
	slugKey?: string;
	linkKey?: string;
	descriptionKey?: string;
	pubDateKey?: string;
	tagsKey?: string;
	imageKey?: string;
	pinnedKey?: string;
	urlKey?: string;
};

const ListItem: React.FC<ListItemProps> = ({
	item,
	pageKey = "page",
	titleKey = "title",
	slugKey = "slug",
	linkKey = "url",
	descriptionKey = "description",
	pubDateKey = "pubDate",
	tagsKey = "tags",
	imageKey = "image",
	pinnedKey = "pinned",
	urlKey = "url",
}) => {
	const [imageError, setImageError] = useState(false); // Track image load errors
	const [imageSrc, setImageSrc] = useState(""); // Set the image source dynamically
	const [favicon, setFavicon] = useState(""); // Store favicon URL

	// Determine the image source
	useEffect(() => {
		if (item[slugKey]) {
			const src = `./${item[pageKey] || pageKey}/${item[slugKey]}.png`;
			setImageSrc(src);
		}
	}, [item, pageKey, slugKey]);

	// Extract domain and set favicon URL for "reading-list"
	useEffect(() => {
		if (pageKey === "reading-list" && item[urlKey]) {
			try {
				const domain = new URL(item[urlKey]).hostname;
				const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
				setFavicon(faviconUrl);
			} catch (error) {
				console.error("Invalid URL", error);
			}
		}
	}, [item, urlKey, pageKey]);

	const isPinned = item[pinnedKey];

	// Build the card content
	const itemContent = (
		<div
			key={item.id}
			className="relative flex items-center space-x-4 border p-4 rounded-lg bg-white dark:bg-gray-700 border-gray-100 dark:border-gray-700 shadow text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-blue-700 hover:dark:bg-gray-600"
		>
			{/* Pin icon */}
			{isPinned && (
				<FaThumbtack className="absolute top-[-8px] right-[-8px] text-gray-300 h-6 w-6 rotate-45" />
			)}

			{/* Use favicon for ReadingList, Twitter-like avatar for Following, otherwise image */}
			{pageKey === "reading-list" && favicon ? (
				<img
					src={favicon}
					alt={`${item[titleKey]} Favicon`}
					className="h-5 w-5 rounded"
				/>
			) : pageKey === "following" ? (
				<img
					src={
						item[imageKey] ||
						`https://ui-avatars.com/api/?name=${item[titleKey]}&background=random`
					}
					alt={`${item[titleKey]} Avatar`}
					className="w-12 h-12 rounded-full"
				/>
			) : !imageError && imageSrc ? (
				<div className="h-16 w-16 rounded-md bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
					<img
						src={imageSrc}
						alt={item[titleKey] || "Image"}
						className="h-full w-full object-cover"
						onError={() => setImageError(true)} // Handle image load failure
					/>
				</div>
			) : (
				<div className="h-16 w-16 rounded-md bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
					<FaImage className="text-4xl text-gray-400" />
				</div>
			)}

			{/* Post Details */}
			<div className="flex-grow">
				<h3 className="text-lg leading-5 font-semibold text-gray-900 dark:text-gray-100">
					{item[titleKey] || "Untitled"}
				</h3>

				{/* Pub-Date */}
				{item[pubDateKey] && (
					<p className="text-sm text-gray-600 dark:text-gray-300 py-1">
						{item[pubDateKey]
							? format(new Date(item[pubDateKey]), "MMM dd, yyyy")
							: "Date Not Available"}
					</p>
				)}

				{/* URL */}
				{item[urlKey] && (
					<p className="text-sm text-gray-600 dark:text-gray-300 py-1">
						{item[urlKey] || ""}
					</p>
				)}
			</div>

			{/* Tags */}
			{item[tagsKey] && (
				<div className="flex space-x-2">
					<Tags tags={item[tagsKey]} />
				</div>
			)}
		</div>
	);

	// If `linkKey` is provided, wrap the item content in a link
	return item[linkKey] ? (
		<a
			href={item[linkKey]}
			target="_blank"
			rel="noopener noreferrer"
			className="block"
		>
			{itemContent}
		</a>
	) : (
		<div>{itemContent}</div>
	);
};

export default ListItem;
