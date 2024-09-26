import React from "react";
import Tag from "../components/Tag"; 
import { FaThumbtack } from "react-icons/fa"; 

type GalleryCardProps = {
	title: string;
	image: string;
	pubDate: string; // Ensure this is a formatted string
	url: string;
	isPinned: boolean;
};

const GalleryCard: React.FC<GalleryCardProps> = ({
	title,
	image,
	pubDate,
	url,
	isPinned,
}) => {
	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="card-link border bg-white dark:bg-gray-700 border-gray-100 dark:border-gray-700 rounded-md shadow text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:dark:bg-gray-600"
		>
			{/* Pin icon */}
			{isPinned && (
				<FaThumbtack className="absolute top-[-8px] right-[-8px] text-gray-300 h-6 w-6 rotate-45" />
			)}

			{/* Image wrapper */}
			{image && (
				<div className="aspect-w-5 aspect-h-4 h-48 w-full flex items-center justify-center overflow-hidden rounded-t-md bg-gray-200 dark:bg-gray-800">
					<img
						src={image}
						alt={title}
						className="object-cover h-full w-full"
					/>
				</div>
			)}

			{/* Title and Pub Date */}
			<div className="px-4 py-2">
				<h3 className="text-xl font-medium font-oswald">{title}</h3>
				<p className="text-sm text-gray-500">{pubDate}</p>
			</div>
		</a>
	);
};

export default GalleryCard;
