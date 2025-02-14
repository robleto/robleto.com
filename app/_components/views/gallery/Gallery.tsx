"use client";

import { useEffect, useState } from "react";
import GalleryCard from "./GalleryCard";

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
	pubDateKey?: string;
	descriptionKey?: string;
	tagsKey?: string;
	urlKey?: string;
	cityStateKey?: string;
	animatedKey?: string;
	minHeight?: string;
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
	pubDateKey = "",
	descriptionKey = "",
	tagsKey = "",
	urlKey = "",
	cityStateKey = "",
	animatedKey = "",
	groupByKey = null,
	minHeight = "300px",
	sortItem,
	filterItem,
}) => {
	const [clientItems, setClientItems] = useState(items);

	// Handle sorting and filtering on items
	useEffect(() => {
		let updatedItems = [...items]; // Create a copy of the items array

		// Apply filtering if a filter function is provided
		if (filterItem) {
			updatedItems = filterItem(updatedItems);
		}

		// Apply sorting if a sort function is provided
		if (sortItem) {
			updatedItems = sortItem(updatedItems);
		}

		// Update the state with sorted/filtered items
		setClientItems(updatedItems);
	}, [items, filterItem, sortItem]);

	return (
		<div className="container mx-auto">
			<div
				className={`grid ${gridCols} ${smGridCols} ${mdGridCols} ${lgGridCols} gap-6 -z-10`}
			>
				{Array.isArray(clientItems) &&
					clientItems.map((item: any, index: number) => (
						<GalleryCard
							key={index}
							item={{ ...item, index }} // Add index for alternating layout
							pageKey={pageKey}
							titleKey={titleKey}
							linkKey={linkKey}
							slugKey={slugKey}
							pubDateKey={pubDateKey}
							descriptionKey={descriptionKey}
							tagsKey={tagsKey}
							urlKey={urlKey}
							cityStateKey={cityStateKey}
							animatedKey={animatedKey}
							lgGridCols={lgGridCols}
							minHeight={minHeight}
						/>
					))}
			</div>
		</div>
	);
};

export default Gallery;
