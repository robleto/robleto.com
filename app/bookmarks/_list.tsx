import React from "react";
import Tag from "../../components/Tag"; // Import the Tag component with lowercase 'tag'

type ListItem = {
	id: string;
	name: string;
	tags: string[];
	website: string;
	slug: string;
	favicon: string;
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
					className="relative flex items-center space-x-4 border p-4 rounded-lg bg-white dark:bg-gray-700 border-gray-100 dark:border-gray-700 shadow text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-blue-700 hover:dark:bg-gray-600"
				>
					{/* Favicon */}
					<img
						src={item.favicon}
						alt={`${item.name} favicon`}
						className="h-5 w-5 rounded"
					/>

					{/* User Details */}
					<div className="flex-grow">
						<h3 className="font-bold">{item.name}</h3>

						{/* Strip 'https://' from the displayed URL and truncate */}
						<a
							href={item.website}
							className="text-blue-500 block overflow-hidden text-ellipsis"
							style={{
								display: "-webkit-box",
								WebkitBoxOrient: "vertical",
								WebkitLineClamp: 1,
							}}
						>
							{item.website.replace(/^https?:\/\//, "").length >
							60
								? item.website
										.replace(/^https?:\/\//, "")
										.slice(0, 60) + "..."
								: item.website.replace(/^https?:\/\//, "")}
						</a>
					</div>

					{/* Tags (now using the Tag component) */}
					<div className="flex space-x-2">
						{item.tags.map((tag) => (
							<Tag key={tag} tag={tag} />) 
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export default Lists;
