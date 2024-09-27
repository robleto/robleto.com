import React, { useState, useEffect } from "react";
import { FaThumbtack, FaImage } from "react-icons/fa";
import Tags from "../common/Tags"; // Assuming you have a Tags component

interface MiniCardProps {
	item: any;
	pageKey?: string;
	titleKey?: string;
	slugKey?: string;
	linkKey?: string;
	pubDateKey?: string;
	tagsKey?: string;
}

const MiniCardView: React.FC<MiniCardProps> = ({
	item,
	pageKey = "page",
	titleKey = "title",
	slugKey = "slug",
	linkKey = "url",
	pubDateKey = "pubDate",
	tagsKey = "tags",
}) => {
	const [imageError, setImageError] = useState(false); // Track image load errors
	const [imageSrc, setImageSrc] = useState(""); // Set the image source dynamically
	const [favicon, setFavicon] = useState(""); // Store favicon URL

	// Extract domain and set favicon URL for "reading-list"
	useEffect(() => {
		if (item[linkKey]) {
			try {
				const domain = new URL(item[linkKey]).hostname;
				const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
				setFavicon(faviconUrl);
			} catch (error) {
				console.error("Invalid URL", error);
			}
		}
	}, [item, linkKey]);


	// Build the card content
	const itemContent = (
		<div className="flex flex-col justify-between h-full p-4 border bg-white dark:bg-gray-700 border-gray-100 dark:border-gray-700 rounded-md shadow text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:underline hover:dark:bg-gray-600">
			{/* Favicon and Title */}
			<div key={item.id} className="flex items-center">
				{favicon && (
					<img src={favicon} alt="*" className="h-5 w-5 rounded" />
				)}
				<a
					href={item[linkKey]}
					target="_blank"
					rel="noopener noreferrer"
				>
					<h3 className="text-md font-semibold leading-5 px-4">
						{item[titleKey]}
					</h3>
				</a>
			</div>

			{/* Tags aligned to the bottom */}
			{item[tagsKey] && Array.isArray(item[tagsKey]) && (
				<div className="flex space-x-2 mt-4">
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

export default MiniCardView;
