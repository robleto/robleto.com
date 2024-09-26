"use client";

import React from "react";
import GalleryCard from "./GalleryCard";
import { groupItemsByVariable } from "@/utils/groupItems";

type GalleryProps = {
	items: any[];
	gridCols?: string;
	smGridCols?: string;
	mdGridCols?: string;
	lgGridCols?: string;
	pageKey?: string;
	titleKey?: string;
	linkKey?: string;
	slugKey?: string;
	descriptionKey?: string;
	tagsKey?: string;
	urlKey?: string;
	cityStateKey?: string;
	animatedKey?: string;
	groupByKey?: string | null;
	sortItem?: (items: any[]) => any[];
	filterItem?: (items: any[]) => any[];
};

const Gallery: React.FC<GalleryProps> = ({
	items,
	gridCols = "grid-cols-1",
	smGridCols = "sm:grid-cols-1",
	mdGridCols = "md:grid-cols-2",
	lgGridCols = "lg:grid-cols-3",
	pageKey = "page",
	titleKey = "title",
	linkKey = "",
	slugKey = "",
	descriptionKey = "",
	tagsKey = "",
	urlKey = "",
	cityStateKey = "",
	animatedKey = "",
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
						className={`grid ${gridCols} ${smGridCols} ${mdGridCols} ${lgGridCols} gap-6`}
					>
						{groupedItems[group].map((item: any, index: number) => (
							<GalleryCard
								key={index}
								item={item}
								pageKey={pageKey}
								titleKey={titleKey}
								linkKey={linkKey}
								slugKey={slugKey}
								descriptionKey={descriptionKey}
								tagsKey={tagsKey}
								urlKey={urlKey}
								cityStateKey={cityStateKey}
								animatedKey={animatedKey}
							/>
						))}
					</div>
				</section>
			))}
		</div>
	);
};

export default Gallery;
