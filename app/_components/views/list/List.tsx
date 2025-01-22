import React from "react";
import ListItem from "./ListItem";

// Define the ListsProps type
type ListsProps = {
	items: any[]; // The array of items to render
	pageKey?: string;
	titleKey?: string;
	linkKey?: string;
	slugKey?: string;
	pubDateKey?: string;
	descriptionKey?: string;
	tagsKey?: string;
	urlKey?: string;
};

const Lists: React.FC<ListsProps> = ({
	items,
	pageKey,
	titleKey = "title",
	linkKey = "",
	slugKey = "slug",
	pubDateKey = "",
	descriptionKey = "",
	tagsKey = "tags",
	urlKey = "",
}) => {
	return (
		<div className="container mx-auto">
			<ul className="list-none grid grid-cols-1 gap-2">
				{items.map((item: any, index: number) => (
					<ListItem
						key={index}
						item={item}
						pageKey={pageKey}
						titleKey={titleKey}
						linkKey={linkKey}
						slugKey={slugKey}
						pubDateKey={pubDateKey}
						descriptionKey={descriptionKey}
						tagsKey={tagsKey} // Ensure tagsKey is passed
						urlKey={urlKey}
						isLast={index === items.length - 1} // Determine isLast dynamically
					/>
				))}
			</ul>
		</div>
	);
};

export default Lists;
