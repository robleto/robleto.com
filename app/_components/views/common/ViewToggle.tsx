// app/_components/views/common/ViewToggle.tsx
"use client";

import React from "react";

type ViewToggleProps = {
	onToggle: (newViewMode: "list" | "gallery") => void;
	viewMode: "list" | "gallery";
};

const ViewToggle: React.FC<ViewToggleProps> = ({ onToggle, viewMode }) => {
	return (
		<div className="flex space-x-4 mb-4">
			<button
				onClick={() => onToggle("list")}
				aria-pressed={viewMode === "list"}
				className={`py-2 px-4 rounded transition-colors ${
					viewMode === "list"
						? "bg-link text-white dark:bg-lightlink"
						: "bg-iron text-emperor dark:bg-gray-700 dark:text-gray-200"
				}`}
			>
				List View
			</button>
			<button
				onClick={() => onToggle("gallery")}
				aria-pressed={viewMode === "gallery"}
				className={`py-2 px-4 rounded transition-colors ${
					viewMode === "gallery"
						? "bg-link text-white dark:bg-lightlink"
						: "bg-iron text-emperor dark:bg-gray-700 dark:text-gray-200"
				}`}
			>
				Gallery View
			</button>
		</div>
	);
};

export default ViewToggle;
