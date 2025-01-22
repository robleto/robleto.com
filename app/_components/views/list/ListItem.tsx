"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaThumbtack, FaImage, FaStar } from "react-icons/fa";
import Tags from "../common/Tags"; // Import your Tags component

// Define the ListItemProps type
type ListItemProps = {
	item: any;
	isLast?: boolean;
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
	isLast = false,
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
	const itemRef = useRef<HTMLLIElement>(null); // Reference for GSAP animation

	useEffect(() => {
		if (pageKey === "following" && item[slugKey]) {
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
			className={`relative flex flex-col md:flex-row items-center text-left py-4 px-6 bg-transparent ${
				isLast
					? "" // No border for the last item
					: "border-b border-gray-200 dark:border-gray-700"
			}`}
		>
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

			<div className="flex-grow mt-4 mb-0 md:mt-0 md:pl-4">
				<h3 className="text-md leading-5 font-semibold text-gray-900 dark:text-gray-100">
					{item[titleKey] || "Untitled"}
				</h3>
				{item[descriptionKey] && (
					<p className="text-sm my-0 py-0 text-gray-600 dark:text-gray-300">
						{item[descriptionKey]}
					</p>
				)}
				{item[urlKey] && (
					<p className="truncate max-w-72 md:max-w-96 text-sm text-gray-600 dark:text-gray-300 py-1">
						{item[urlKey]}
					</p>
				)}
			</div>
		</div>
	);

	return (
		<li ref={itemRef} className="block w-full">
			{item[linkKey] ? (
				<a
					href={item[linkKey]}
					target="_blank"
					rel="noopener noreferrer"
					className="block w-full"
				>
					{itemContent}
				</a>
			) : (
				itemContent
			)}
		</li>
	);
};

export default ListItem;
