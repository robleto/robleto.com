import React from "react";
import Tag from "../../components/Tag"; // Import the Tag component with lowercase 'tag'
import { FaThumbtack } from "react-icons/fa"; // Import the FontAwesome pin icon

type ListItem = {
	id: string;
	name: string;
	tags: string[];
	website: string;
	image: string;
	pubDate: Date;
	isPinned: boolean;
};

type ListsProps = {
	items: ListItem[];
};

const Lists: React.FC<ListsProps> = ({ items }) => {
	// Helper function to format the date as "Dec. 2024"
	const formatDate = (date: Date) => {
		return date
			.toLocaleDateString("en-US", {
				month: "short",
				year: "numeric",
			})
			.replace(".", "."); // Ensure the month abbreviation has a period (e.g., "Dec.")
	};

	return (
		<div className="space-y-4">
			{items.map((item) => (
				<div
					key={item.id}
					className="relative z-[-10] flex items-center space-x-4 border p-4 rounded-lg  bg-white dark:bg-gray-700 border-gray-100 dark:border-gray-700 shadow text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-blue-700  hover:dark:bg-gray-600"
				>
					{/* Pin icon */}
					{item.isPinned && (
						<FaThumbtack className="absolute top-[-8px] right-[-8px] text-gray-300 h-6 w-6 rotate-45" />
					)}

					{/* Image (not circular, with rounded corners) */}
					<img
						src={
							item.image ||
							`https://ui-avatars.com/api/?name=${item.name}&background=random`
						}
						alt={`${item.name} Image`}
						className="h-16 w-16 rounded-md"
					/>

					{/* Post Details */}
					<div className="flex-grow">
						{/* Title wrapped with URL */}
						<h3 className="font-bold">
							<a href={item.website} className="text-blue-500">
								{item.name}
							</a>
						</h3>

						{/* Display formatted Pub-Date */}
						<p className="text-sm text-gray-500">
							{formatDate(item.pubDate)}
						</p>
					</div>

					{/* Tags (now using the Tag component) */}
					<div className="flex space-x-2">
						{item.tags.map((tag) => (
							<Tag key={tag} tag={tag} />
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default Lists;
