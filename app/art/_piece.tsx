import React from "react";
import { FaImage } from "react-icons/fa";

type GalleryCardProps = {
	key: string;
	id: string;
	title: string;
	image: string;
	url: string;
	slug: string;
	animated: boolean;
};

const GalleryCard: React.FC<GalleryCardProps> = ({
	id,
	title,
	image,
	url,
	slug,
	animated,
}) => {
	// Determine the file extension based on the `animated` boolean
	const fileExtension = animated ? "gif" : "png";

	return (
		<a
			href={url}
			key={id}
			target="_blank"
			rel="noopener noreferrer"
			className="card-link border bg-white dark:bg-gray-700 border-gray-100 dark:border-gray-700 rounded-md shadow text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-blue-700 hover:underline hover:dark:bg-gray-600"
		>
			{/* Image wrapper with uniform height and clipping from sides if needed */}
			<div className="aspect-w-5 aspect-h-4 h-64 w-full flex items-center justify-center overflow-hidden rounded-t-md bg-gray-200 dark:bg-gray-800  ">
				{slug ? (
					<img
						// Use template literals to dynamically insert the slug and file extension
						src={`./art/${slug}.${fileExtension}`}
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
