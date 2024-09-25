import React from "react";
import { FaImage } from "react-icons/fa";

type GalleryCardProps = {
	id: string;
	title: string;
	image: string;
	description: string;
	slug: string;
	url: string;
};

const GalleryCard: React.FC<GalleryCardProps> = ({
	id,
	title,
	image,
	description,
	url,
	slug,
}) => {
	return (
		<div
			key={id}
			className="card-link z-[-10] border bg-white dark:bg-gray-700 border-gray-100 dark:border-gray-700 rounded-md shadow text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:dark:bg-gray-600"
		>
			{/* Image wrapper with z-index explicitly set lower */}
			<div className="aspect-w-5 aspect-h-4 h-64 w-full flex items-center justify-center overflow-hidden rounded-t-md bg-gray-200 dark:bg-gray-800  ">
				{slug ? (
					<img
						// Use template literals to dynamically insert the slug and file extension
						src={`./projects/${slug}.png`}
						alt={title}
						className="object-cover h-full w-full "
					/>
				) : (
					// Fallback if the image is not available
					<div className="flex flex-col items-center justify-center h-full w-full text-gray-400">
						<FaImage className="text-4xl" />{" "}
						{/* Image icon from React Icons */}
						<p className="text-sm mt-2">Image Not Found</p>
					</div>
				)}
			</div>

			{/* Main content area */}
			<div className="flex-grow my-4 px-4 pb-0">
				{/* Title */}
				<a
					href={url}
					className="text-gray-800 dark:text-gray-200"
					target="_blank"
					rel="noopener noreferrer"
				>
					<h3 className="text-2xl font-medium font-oswald leading-5">
						{title}
					</h3>
				</a>

				{/* Description */}
				{description && (
					<p className="font-normal text-sm my-4 leading-4 text-gray-600 dark:text-gray-400">
						{description}
					</p>
				)}
			</div>

			{/* URL at the bottom */}
			{url && (
				<div className="px-4 my-4 mt-auto">
					<a
						href={url}
						className="text-blue-500 dark:text-blue-300 underline"
						target="_blank"
						rel="noopener noreferrer"
					>
						{url}
					</a>
				</div>
			)}
		</div>
	);
};

export default GalleryCard;
