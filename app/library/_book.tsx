"use client";
import React from "react";

type GalleryCardProps = {
	id: string;
	title: string;
	image: string;
	url: string;
	className?: string; // Make className an optional prop
};

const GalleryCard: React.FC<GalleryCardProps> = ({
	id,
	title,
	image,
	url,
	className,
}) => {
	return (
		<a
			href={url}
			key={id}
			target="_blank"
			rel="noopener noreferrer"
			className={`card-link border bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-md shadow text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-blue-700 hover:underline ${className}`} // Append className for GSAP
		>
			{/* Image wrapper with uniform height and clipping from sides if needed */}
			{image && (
				<div className="h-64 w-full flex items-center justify-center overflow-hidden rounded-t-md bg-gray-200 dark:bg-gray-800 p-6 ">
					<img
						src={image}
						alt={title}
						className="object-contain h-full w-full "
					/>
				</div>
			)}
			{/* Title */}
			<div className="px-4 pb-2 text-lg mt-3 mb-4 text-left">
				<h3 className="text-xl font-medium font-oswald leading-5">
					{title}
				</h3>
			</div>
		</a>
	);
};

export default GalleryCard;
