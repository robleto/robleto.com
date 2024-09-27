import React from "react";
import Tag from "../common/Tags";


interface MiniCardProps {
	items: any[];
	key: string;
	titleKey: string;
	linkKey: string;
	urlKey: string;
	pubDateKey: string;
	pageKey: string;
	tagsKey: string;
	slugKey: string;
	favicon: string;
}


const MiniCardView: React.FC<MiniCardProps> = ({
	items,
	key,
	titleKey,
	linkKey,
	urlKey,
	pubDateKey,
	pageKey,
	tagsKey,
	slugKey,
	favicon,

}) => {
	return (
		<div
			className="flex flex-col justify-between h-full p-4 border bg-white dark:bg-gray-700 border-gray-100 dark:border-gray-700 rounded-md shadow text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:underline hover:dark:bg-gray-600"
		>
			{/* Favicon and Title */}
			<div className="flex items-center">
				{favicon && (
					<img
						src={favicon}
						alt="*"
						className="h-5 w-5 rounded"
					/>
				)}
				<a href={items[0][urlKey]} target="_blank" rel="noopener noreferrer">
					<h3 className="text-md font-semibold leading-5 px-4">
						{items[0][titleKey]}
					</h3>
				</a>
			</div>

			{/* Tags aligned to the bottom */}
			{items[0][tagsKey].length > 0 && (
				<div className="flex space-x-2 mt-4">
					{items[0][tagsKey].map((tag: string) => (
						<Tag key={tag} tags={[tag]} />
					))}
				</div>
			)}
		</div>
	);
};

export default MiniCardView;
