// app/_components/views/common/ViewModeContext.js
"use client"; // Ensure this component runs on the client side

import React, { createContext, useContext, useState, useEffect } from "react";

const ViewModeContext = createContext();

export const ViewModeProvider = ({ children }) => {
    const [viewMode, setViewMode] = useState("gallery"); // Default to gallery

    useEffect(() => {
        // Only runs in the browser
        if (typeof window !== "undefined") {
            const storedViewMode = localStorage.getItem("viewMode");
            if (storedViewMode !== "list" && storedViewMode !== "gallery") {
                storedViewMode = "gallery";
            }
            console.log("Stored view mode:", storedViewMode);
            setViewMode(storedViewMode || "gallery"); // Set view mode from localStorage
        }
    }, []); // Runs once on mount

    useEffect(() => {
        // Runs to update localStorage when viewMode changes
        if (typeof window !== "undefined") {
            console.log("Setting view mode in localStorage:", viewMode);
            localStorage.setItem("viewMode", viewMode);
        }
    }, [viewMode]); // Runs when viewMode changes

    return (
        <ViewModeContext.Provider value={{ viewMode, setViewMode }}>
            {children}
        </ViewModeContext.Provider>
    );
};

export const useViewMode = () => useContext(ViewModeContext);
