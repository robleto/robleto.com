import React from "react";
import Tag from "../components/Tag";

type ReadingListCardProps = {
	title: string;
	favicon: string;
	url: string;
	tags: string[];
};

const ReadingListCard: React.FC<ReadingListCardProps> = ({
	title,
	favicon,
	url,
	tags,
}) => {
	return (
		<div className="flex flex-col justify-between h-full card-link p-4 border bg-white dark:bg-gray-700 border-gray-100 dark:border-gray-700 rounded-md shadow text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:underline hover:dark:bg-gray-600">
			{/* Favicon and Title */}
			<div className="flex items-center">
				<img
					src={favicon}
					alt={`${title} Favicon`}
					className="h-5 w-5 rounded"
				/>
				<a href={url} target="_blank" rel="noopener noreferrer">
					<h3 className="text-md font-semibold leading-5 px-4">
						{title}
					</h3>
				</a>
			</div>

			{/* Tags aligned to the bottom */}
			<div className="flex space-x-2 mt-4">
				{tags.map((tag) => (
					<Tag key={tag} tag={tag} />
				))}
			</div>
		</div>
	);
};

export default ReadingListCard;
