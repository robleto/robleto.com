// app/_components/views/common/ViewToggle.tsx
"use client"; // Mark this component as a client component

import React from "react";

type ViewToggleProps = {
	onToggle: (newViewMode: "list" | "gallery") => void; // Callback to handle view mode change
	viewMode: "list" | "gallery"; // Current view mode
};

const ViewToggle: React.FC<ViewToggleProps> = ({ onToggle, viewMode }) => {
	return (
		<div className="flex space-x-4 mb-4">
			<button
				onClick={() => onToggle("list")}
				className={`py-2 px-4 rounded ${
					viewMode === "list"
						? "bg-blue-500 text-white"
						: "bg-gray-200 text-black"
				}`}
			>
				List View
			</button>
			<button
				onClick={() => onToggle("gallery")}
				className={`py-2 px-4 rounded ${
					viewMode === "gallery"
						? "bg-blue-500 text-white"
						: "bg-gray-200 text-black"
				}`}
			>
				Gallery View
			</button>
		</div>
	);
};

export default ViewToggle;
