import React, { useState, useEffect } from "react";
import { FaThumbtack, FaImage, FaStar } from "react-icons/fa";
import Tags from "../common/Tags"; // Import your Tags component

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
	urlKey = "url",
}) => {
	const [imageError, setImageError] = useState(false);
	const [imageSrc, setImageSrc] = useState("");
	const [favicon, setFavicon] = useState("");

	// Fetch the appropriate image based on pageKey
	useEffect(() => {
		if (pageKey === "following" && item[slugKey]) {
			// For following, get the Twitter profile image based on slug
			const twitterProfileImageUrl = `https://unavatar.io/twitter/${item[slugKey]}`;
			setImageSrc(twitterProfileImageUrl);
		} else if (item[slugKey]) {
			const src = `./${item[pageKey] || pageKey}/${item[slugKey]}.png`;
			setImageSrc(src);
		}
	}, [item, pageKey, slugKey]);

	useEffect(() => {
		if (
			(pageKey === "reading-list" || pageKey === "bookmarks") &&
			item[urlKey]
		) {
			try {
				const domain = new URL(item[urlKey]).hostname;
				const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
				setFavicon(faviconUrl);
			} catch (error) {
				console.error("Invalid URL", error);
			}
		}
	}, [item, urlKey, pageKey]);

	const renderImage = () => {
		if (pageKey === "following" && imageSrc) {
			return (
				<img
					src={imageSrc}
					alt={`${item[titleKey] || "Twitter Profile Image"}`}
					className="w-12 h-12 rounded-full"
					onError={() => setImageError(true)}
				/>
			);
		} else if (pageKey === "about" && imageSrc) {
			return (
				<img
					src={imageSrc}
					alt={item[titleKey] || "Image"}
					className="w-12 h-12 rounded-full"
					onError={() => setImageSrc("")} // Reset the imageSrc if the image fails to load
				/>
			);
		} else if (!imageError && imageSrc) {
			return (
				<img
					src={imageSrc}
					alt={item[titleKey] || "Image"}
					className="h-full w-full object-cover hidden sm:inline max-w-36"
					onError={() => setImageError(true)}
				/>
			);
		}
		return (
			<div className="h-16 w-16 rounded-md bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
				<FaImage className="text-4xl text-gray-400" />
			</div>
		);
	};

	const itemContent = (
		<div className="relative flex -z-30 items-center border p-4 rounded-lg bg-white dark:bg-gray-700 border-gray-100 dark:border-gray-700 shadow text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-blue-700 hover:dark:bg-gray-600">
			{/* Pin icon */}
			{item.isPinned && (
				<div className="absolute top-[-8px] right-[-8px]">
					<FaThumbtack className="text-gray-300 h-6 w-6 rotate-45" />
				</div>
			)}

			{(pageKey === "reading-list" || pageKey === "bookmarks") && favicon ? (
				<img
					src={favicon}
					alt={`${item[titleKey]} Favicon`}
					className="h-5 w-5 rounded"
				/>
			) : (
				renderImage()
			)}

			{/* Post Details */}
			<div className="flex-grow pl-4">
				<h3 className="text-lg leading-5 font-semibold text-gray-900 dark:text-gray-100">
					{item[titleKey] || "Untitled"}
				</h3>
				{/* Conditional Rendering for Description and Pub-Date */}
				{(pageKey === "home" || pageKey === "about") &&
				item[descriptionKey] ? (
					<p className="text-sm text-gray-600 dark:text-gray-300 py-1">
						{item[descriptionKey]}
					</p>
				) : item[pubDateKey] ? (
					<p className="text-sm text-gray-600 dark:text-gray-300 py-1">
						{new Date(item[pubDateKey]).toLocaleDateString(
							"en-US",
							{
								month: "short",
								// day: "numeric",
								year: "numeric",
							}
						)}
					</p>
				) : null}
				{/* URL */}
				{item[urlKey] && (
					<p className="text-sm text-gray-600 dark:text-gray-300 py-1">
						{item[urlKey]}
					</p>
				)}
			</div>

			{/* Tags or Date Display */}
			{(pageKey === "home" || pageKey === "about") && item[pubDateKey] ? (
				<p className="text-sm text-gray-600 dark:text-gray-300 py-1">
					{new Date(item[pubDateKey]).toLocaleDateString("en-US", {
						month: "short",
						// day: "numeric",
						year: "numeric",
					})}
				</p>
			) : (
				item[tagsKey] && (
					<div className="flex space-x-2">
						<Tags tags={item[tagsKey]} />
					</div>
				)
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
