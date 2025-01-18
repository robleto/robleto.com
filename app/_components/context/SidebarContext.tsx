"use client";

import React, { createContext, useContext, useState } from "react";

// Define the shape of the context
type SidebarContextType = {
	isCollapsed: boolean;
	toggleCollapse: () => void;
};

// Create the context
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Provider component
export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isCollapsed, setIsSidebarCollapsed] = useState(false);

	// Function to toggle the sidebar state
	const toggleCollapse = () => {
		setIsSidebarCollapsed((prev) => !prev);
	};

	return (
		<SidebarContext.Provider value={{ isCollapsed, toggleCollapse }}>
			{children}
		</SidebarContext.Provider>
	);
};

// Custom hook for accessing the sidebar context
export const useSidebar = () => {
	const context = useContext(SidebarContext);
	if (!context) {
		throw new Error("useSidebar must be used within a SidebarProvider");
	}
	return context;
};
