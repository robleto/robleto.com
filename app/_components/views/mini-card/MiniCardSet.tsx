"use client";

import React from "react";
import MiniCard from "./MiniCard";

interface MiniCardProps {
	items: any[];
	gridCols?: string;
	smGridCols?: string;
	mdGridCols?: string;
	lgGridCols?: string;
	pageKey?: string;
	titleKey?: string;
	slugKey?: string;
	linkKey?: string;
	pubDateKey?: string;
	tagsKey?: string;
	pinnedKey?: string;
}

const MiniCardView: React.FC<MiniCardProps> = ({
	items,
	gridCols = "grid-cols-1",
	smGridCols = "sm:grid-cols-1",
	mdGridCols = "md:grid-cols-2",
	lgGridCols = "lg:grid-cols-3",
	pageKey = "page",
	titleKey = "title",
	linkKey = "",
	slugKey = "slug",
	pubDateKey = "",
	tagsKey = "",
}) => {
	// Render the grid layout
	return (
		<div
			className={`grid ${gridCols} ${smGridCols} ${mdGridCols} ${lgGridCols} gap-6`}
		>
			{items.map((item: any, index: number) => (
				<MiniCard
					key={index}
					item={item}
					pageKey={pageKey}
					titleKey={titleKey}
					slugKey={slugKey}
					linkKey={linkKey}
					pubDateKey={pubDateKey}
					tagsKey={tagsKey}
				/>
			))}
		</div>
	);
};

export default MiniCardView;
