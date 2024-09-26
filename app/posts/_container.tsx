"use client"; // Ensure this component runs client-side

import React, { useState } from "react";
import Lists from "./_list"; // Import the Lists component
import Gallery from "./_gallery"; // Import Gallery view (you can create this if needed)
import ViewToggle from "../components/ViewToggle"; // Import the toggle component

type PostsContainerProps = {
	sortedItems: any[]; // You can improve the typing here based on your data structure
};

const PostsContainer: React.FC<PostsContainerProps> = ({ sortedItems }) => {
	const [viewMode, setViewMode] = useState<"list" | "gallery">("gallery");

	// Function to handle the toggle between list and gallery
	const handleToggle = (newViewMode: "list" | "gallery") => {
		setViewMode(newViewMode);
	};

	return (
		<div>
			{/* Render the ViewToggle to switch between list and gallery views */}
			<ViewToggle onToggle={handleToggle} viewMode={viewMode} />

			{/* Conditionally render based on the selected view mode */}
			{viewMode === "list" ? (
				<Lists items={sortedItems} />
			) : (
				<Gallery items={sortedItems} /> // Make sure to implement Gallery if it's missing
			)}
		</div>
	);
};

export default PostsContainer;
