import React from "react";
import Tag from "../../components/Tag"; // Import the Tag component with lowercase 'tag'

type ListItem = {
	id: string;
	name: string;
	tags: string[];
	image: string;
	website: string;
	slug: string;
};

type ListsProps = {
	items: ListItem[];
};

const Lists: React.FC<ListsProps> = ({ items }) => {
	return (
		<div className="space-y-4">
			{items.map((item) => (
				<div
					key={item.id}
					className="relative z-[-10]  flex items-center space-x-4 border p-4 rounded-lg  bg-white dark:bg-gray-700 border-gray-100 dark:border-gray-700 shadow text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-blue-700  hover:dark:bg-gray-600"
				>
					{/* Display Twitter Profile Image or Placeholder */}
					<img
						src={
							item.image ||
							`https://ui-avatars.com/api/?name=${item.name}&background=random`
						}
						alt={`${item.name} Avatar`}
						className="w-12 h-12 rounded-full"
					/>

					{/* User Details */}
					<div className="flex-grow">
						<h3 className="font-bold">{item.name}</h3>
						<a href={item.website} className="text-blue-500">
							{item.website}
						</a>
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

//here3
