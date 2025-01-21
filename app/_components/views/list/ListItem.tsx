import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaThumbtack, FaImage, FaStar } from "react-icons/fa";
import Tags from "../common/Tags"; // Import your Tags component

// Define the ListItemProps type
type ListItemProps = {
	item: any;
	isLast?: boolean; // Optional prop
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

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ListItem: React.FC<ListItemProps> = ({
	item,
	isLast = false, // Default to false
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
	const itemRef = useRef<HTMLDivElement>(null); // Reference for the GSAP animation

	// Fetch the appropriate image based on pageKey
	useEffect(() => {
		if (pageKey === "following" && item[slugKey]) {
			const twitterProfileImageUrl = `https://unavatar.io/twitter/${item[slugKey]}`;
			setImageSrc(twitterProfileImageUrl);
		} else if (item[slugKey]) {
			const src = `./${item[pageKey] || pageKey}/${item[slugKey]}.png`;
			setImageSrc(src);
		}
	}, [item, pageKey, slugKey]);

	// Fetch favicon for reading list or bookmarks
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

	// GSAP animation for fading in the cards on scroll
	useEffect(() => {
		const el = itemRef.current;
		if (el) {
			gsap.fromTo(
				el,
				{ opacity: 0 },
				{
					opacity: 1,
					duration: 1,
					scrollTrigger: {
						trigger: el,
						start: "top 100%",
						end: "bottom 85%",
						toggleActions: "play none none none",
					},
				}
			);
		}
	}, []);

	// Render the appropriate image
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
					onError={() => setImageSrc("")}
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
		<div
			ref={itemRef}
			className={`relative flex flex-col md:flex-row -z-30 md:items-center text-left py-2 px-4 rounded-md bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-blue-700 hover:dark:bg-gray-600 ${
				isLast
					? ""
					: "border-b-[0.1rem] border-b-gray-200 dark:border-gray-700"
			}`}
		>
			{/* Pin icon */}
			{item.isPinned && (
				<div className="absolute top-[-8px] right-[-8px]">
					<FaThumbtack className="text-gray-300 h-6 w-6 rotate-45" />
				</div>
			)}

			{(pageKey === "reading-list" || pageKey === "bookmarks") &&
			favicon ? (
				<img
					src={favicon}
					alt={`${item[titleKey]} Favicon`}
					className="hidden md:inline-block h-5 w-5 rounded"
				/>
			) : (
				renderImage()
			)}

			{/* Post Details */}
			<div className="flex-grow mt-4 mb-0 md:mt-0 md:pl-4">
				<h3 className="text-md leading-5 font-semibold text-gray-900 dark:text-gray-100">
					{item[titleKey] || "Untitled"}
				</h3>
				{(pageKey === "home" || pageKey === "about") &&
				item[descriptionKey] ? (
					<p className="text-sm my-0 py-0 text-gray-600 dark:text-gray-300">
						{item[descriptionKey]}
					</p>
				) : item[pubDateKey] ? (
					<p className="text-sm text-gray-600 dark:text-gray-300">
						{new Date(item[pubDateKey]).toLocaleDateString(
							"en-US",
							{
								month: "short",
								year: "numeric",
							}
						)}
					</p>
				) : null}
				{item[urlKey] && (
					<p className="truncate max-w-72 md:max-w-96 text-sm text-gray-600 dark:text-gray-300 py-1">
						{item[urlKey]}
					</p>
				)}
			</div>

			{/* Tags or Date Display */}
			{(pageKey === "home" || pageKey === "about") && item[pubDateKey] ? (
				<p className="text-sm text-gray-600 dark:text-gray-300 py-1">
					{new Date(item[pubDateKey]).toLocaleDateString("en-US", {
						month: "short",
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
			href={
				item[linkKey].startsWith("http://") ||
				item[linkKey].startsWith("https://")
					? item[linkKey]
					: `https://${item[linkKey]}`
			}
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
