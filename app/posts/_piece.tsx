import React from "react";

type GalleryCardProps = {
	id: string;
	title: string;
	image: string;
	pubDate: string;
	url: string;
};

const GalleryCard: React.FC<GalleryCardProps> = ({
	id,
	title,
	image,
  pubDate,
	url,
}) => {
	return (
		<a
			href={url}
			key={id}
			target="_blank"
			rel="noopener noreferrer"
			className="card-link border bg-white dark:bg-gray-700 border-gray-100 dark:border-gray-700 rounded-md shadow text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-blue-700 hover:underline hover:dark:bg-gray-600"
		>
			{/* Image wrapper with uniform height and clipping from sides if needed */}
			{image && (
				<div className="aspect-w-5 aspect-h-4 h-48 w-full flex items-center justify-center overflow-hidden rounded-t-md bg-gray-200 dark:bg-gray-800  ">
					<img
						src={image}
						alt={title}
						className="object-cover h-full w-full "
					/>
				</div>
			)}
			{/* Title */}

			{/* Main content area */}
			<div className="flex-grow my-4 px-4  pb-0">
				{/* Display title */}
				<h3 className="text-2xl font-medium font-oswald leading-5">
					{title}
				</h3>

				{/* Display description if available */}
				{pubDate && (
					<p className="font-normal text-sm my-4 leading-4 text-gray-600 dark:text-gray-400">
						{pubDate}
					</p>
				)}
			</div>

			{/* Use the custom Url property, aligned to the bottom */}
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
		</a>
	);
};

export default GalleryCard;
