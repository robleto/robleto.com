"use client"; // Add this at the very top of the file

import { createContext, useContext, useState, ReactNode } from "react";

// Create the context for collapse state
const CollapseContext = createContext<{
	isCollapsed: boolean;
	toggleCollapse: () => void;
} | null>(null);

// Collapse Provider to wrap the application or component tree
export const CollapseProvider = ({ children }: { children: ReactNode }) => {
	const [isCollapsed, setIsCollapsed] = useState(false);

	const toggleCollapse = () => {
		setIsCollapsed(!isCollapsed);
	};

	return (
		<CollapseContext.Provider value={{ isCollapsed, toggleCollapse }}>
			{children}
		</CollapseContext.Provider>
	);
};

// Custom hook to use collapse context
export const useCollapse = () => {
	const context = useContext(CollapseContext);
	if (!context) {
		throw new Error("useCollapse must be used within a CollapseProvider");
	}
	return context;
};
