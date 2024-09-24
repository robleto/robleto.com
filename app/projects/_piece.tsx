import React from "react";

type GalleryCardProps = {
	id: string;
	title: string;
	image: string;
	description: string;
	url: string;
};

const GalleryCard: React.FC<GalleryCardProps> = ({
	id,
	title,
	image,
	description,
	url,
}) => {
	return (
		<div
			key={id}
			className="card-link z-[-10] border bg-white dark:bg-gray-700 border-gray-100 dark:border-gray-700 rounded-md shadow text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:dark:bg-gray-600"
		>
			{/* Image wrapper with z-index explicitly set lower */}
			{image && (
				<div className="relative  h-64 w-full overflow-hidden rounded-t-md bg-gray-200 dark:bg-gray-800">
					<a href={url} target="_blank" rel="noopener noreferrer">
						<img
							src={image}
							alt={title}
							className="absolute inset-0 object-cover w-full h-full"
						/>
					</a>
				</div>
			)}

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
