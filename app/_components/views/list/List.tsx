"use client";

import React from "react";
import ListItem from "./ListItem";
import { groupItemsByVariable } from "@/utils/groupItems";

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
	groupByKey?: string | null;
	sortItem?: (items: any[]) => any[];
	filterItem?: (items: any[]) => any[];
};

const Lists: React.FC<ListsProps> = ({
	items,
	pageKey = "page",
	titleKey = "title",
	linkKey = "",
	slugKey = "slug",
	pubDateKey = "",
	descriptionKey = "",
	tagsKey = "",
	urlKey = "",
	groupByKey = null,
	sortItem,
	filterItem,
}) => {
	// Step 1: Apply filtering and sorting
	let displayItems = items;
	if (filterItem) displayItems = filterItem(displayItems);
	if (sortItem) displayItems = sortItem(displayItems);

	// Step 2: Group items if groupByKey is provided
	let groupedItems: { [key: string]: any[] } = {};
	let sortedGroups: string[] = [];
	if (groupByKey) {
		groupedItems = groupItemsByVariable(displayItems, groupByKey);
	} else {
		groupedItems[""] = displayItems;
		sortedGroups = [""];
	}

	return (
		<div className="container mx-auto">
			{sortedGroups.map((group: string) => (
				<section key={group}>
					{/* Section Header for Grouped Items */}
					{groupByKey && (
						<section className="relative flex items-center justify-center my-8">
							<span className="flex-grow h-px bg-gray-300"></span>
							<h3 className="px-4 text-2xl uppercase font-bold font-oswald text-gray-700 dark:text-gray-200">
								{group}
							</h3>
							<span className="flex-grow h-px bg-gray-300"></span>
						</section>
					)}

					{/* Grid Layout */}
					<div
						className={`grid grid-cols-1 gap-6`}
					>
						{groupedItems[group].map((item: any, index: number) => (
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
				</section>
			))}
		</div>
	);
};

export default Lists;
