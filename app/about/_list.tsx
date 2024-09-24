import React from "react";
import { FaThumbtack } from "react-icons/fa"; // Import the FontAwesome pin icon
import { sortByPinnedAndDate } from "../../utils/sortItems"; // Import the sorting function

type ListItem = {
	id: string;
	name: string;
	tags: string[];
	description: string;
	slug: string;
	image: string;
	date: Date;
	isPinned: boolean;
};

type ListsProps = {
	items: ListItem[];
};

const Lists: React.FC<ListsProps> = ({ items }) => {
	// Apply the sorting function to sort items by pinned and date
	const sortedItems = sortByPinnedAndDate(items);

	// Helper function to format the date as "Dec. 2022"
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
			{sortedItems.map((item) => (
				<div
					key={item.id}
					className="flex z-[-10] items-center relative justify-between space-x-4 border p-4 rounded-lg bg-white dark:bg-gray-700 border-gray-100 dark:border-gray-700 shadow text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
				>
					{/* Display Image or Placeholder */}
					<img
						src={
							item.image ||
							`./about/${item.slug}.svg`
						}
						alt={`${item.name} Avatar`}
						className="w-12 h-12 rounded-full"
					/>

					{/* User Details */}
					<div className="flex-grow">
						<h3 className="font-bold">{item.name}</h3>
						<p className="text-sm text-gray-600">
							{item.description}
						</p>
					</div>

					{/* Tags and Date */}
					<div className="flex space-x-2 items-center">
						{/* Display the formatted date */}
						<span className="px-2 py-1 text-gray-500 text-sm">
							{formatDate(item.date)}
						</span>

						{/* Pin icon */}
						{item.isPinned && (
							<FaThumbtack className="absolute top-[-8px] right-[-8px] text-gray-300 h-6 w-6 rotate-45" />
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export default Lists;
