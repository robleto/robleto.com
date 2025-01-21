"use client";

import React, { useState, useEffect } from "react";
import ViewToggle from "./Tabs";

type PostsContainerProps<T> = {
	sortedItems: T[];
	ListComponent: React.FC<{ items: T[]; isLast: boolean; [key: string]: any }>;
	GalleryComponent: React.FC<{ items: T[]; isLast: boolean; [key: string]: any }>;
	listProps?: { [key: string]: any };
	galleryProps?: { [key: string]: any };
};

const PostsContainer = <T,>({
	sortedItems,
	ListComponent,
	GalleryComponent,
	listProps,
	galleryProps,
}: PostsContainerProps<T>) => {
	const [viewMode, setViewMode] = useState<"list" | "gallery">("gallery"); // Default to "gallery"

	useEffect(() => {
		// Runs only on the client
		if (typeof window !== "undefined") {
			const storedViewMode = localStorage.getItem("viewMode") as
				| "list"
				| "gallery";
			console.log("Stored view mode:", storedViewMode); // Log retrieved value
			setViewMode(storedViewMode || "gallery"); // Update state with localStorage value
		}
	}, []); // Only runs on mount

	useEffect(() => {
		// This will run on the client to update localStorage when viewMode changes
		if (typeof window !== "undefined") {
			console.log("Setting view mode in localStorage:", viewMode); // Debugging log
			localStorage.setItem("viewMode", viewMode);
		}
	}, [viewMode]); // Runs when viewMode changes

	const handleToggle = (newViewMode: "list" | "gallery") => {
		setViewMode(newViewMode);
	};

	return (
		<div>
			<ViewToggle onToggle={handleToggle} viewMode={viewMode} />
			{viewMode === "list" ? (
				<ListComponent items={sortedItems} isLast={false} {...listProps} />
			) : (
				<GalleryComponent items={sortedItems} isLast={false} {...galleryProps} />
			)}
		</div>
	);
};

export default PostsContainer;
