"use client"

import React, { useState, useEffect } from "react";
import Lists from "../list/List";
import Gallery from "../gallery/Gallery";
import ViewToggle from "./Tabs";

type PostsContainerProps = {
  sortedItems: any[];
};

const PostsContainer: React.FC<PostsContainerProps> = ({ sortedItems }) => {
  const [viewMode, setViewMode] = useState<"list" | "gallery">(() => {
    // Load the viewMode from localStorage, default to 'gallery'
    return (localStorage.getItem("viewMode") as "list" | "gallery") || "gallery";
  });

  useEffect(() => {
    // Save the selected view mode in localStorage
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  const handleToggle = (newViewMode: "list" | "gallery") => {
    setViewMode(newViewMode);
  };

	return (
		<div>
			{/* Render the ViewToggle to switch between list and gallery views */}
			<ViewToggle onToggle={handleToggle} viewMode={viewMode} />

			{/* Conditionally render based on the selected view mode */}
			{viewMode === "list" ? (
				<Lists
					items={sortedItems}
					linkKey="url"
					pubDateKey="pubdate"
					pageKey="posts"
					tagsKey="tags"
					slugKey="slug" // Ensure the slug key is passed for image paths
				/>
			) : (
				<Gallery
					items={sortedItems}
					lgGridCols="lg:grid-cols-2"
					linkKey="url"
					pubDateKey="pubdate"
					pageKey="posts"
					tagsKey="tags"
					slugKey="slug" // Ensure the slug key is passed for image paths
				/>
			)}
		</div>
	);
};

export default PostsContainer;
