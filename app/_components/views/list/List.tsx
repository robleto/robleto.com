"use client";

import React from "react";
import ListItem from "./ListItem";

type ListsProps = {
	items: any[];
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
	tagsKey = "",
	urlKey = "",
}) => {
	return (
		<div className="container mx-auto">
			{/* List Layout */}
			<div className={`grid grid-cols-1 gap-6`}>
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
						tagsKey={tagsKey}
						urlKey={urlKey}
					/>
				))}
			</div>
		</div>
	);
};

export default Lists;
