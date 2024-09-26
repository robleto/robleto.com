import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const DarkLightToggle = () => {
	const { theme, setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false); // Track if the component is mounted

	// Ensure the component is mounted before rendering
	useEffect(() => {
		setMounted(true);
	}, []);

	// Prevent rendering on the server to avoid mismatch
	if (!mounted) return null;

	return (
		<div className="flex w-full opacity-50 divide-x divide-gray-300 border border-gray-300 dark:divide-gray-700 dark:border-gray-700 rounded">
			{/* Light mode option */}
			<button
				className={`flex-1 p-2 flex justify-center items-center rounded-l ${
					theme === "light" ? "bg-gray-200 dark:bg-gray-600" : ""
				}`}
				onClick={() => setTheme("light")}
			>
				<img
					src={`/_icons/sun.svg`}
					alt="Sun icon"
					className="h-4 w-4 svg-icon"
				/>
			</button>

			{/* System mode option */}
			<button
				className={`flex-1 p-2 flex justify-center items-center ${
					theme === "system" ? "bg-gray-200 dark:bg-gray-500" : ""
				}`}
				onClick={() => setTheme("system")}
			>
				<img
					src={`/_icons/system.svg`}
					alt="System icon"
					className="h-4 w-4 svg-icon"
				/>
			</button>

			{/* Dark mode option */}
			<button
				className={`flex-1 p-2 flex justify-center items-center rounded-r ${
					theme === "dark" ? "bg-gray-500 dark:bg-gray-500" : ""
				}`}
				onClick={() => setTheme("dark")}
			>
				<img
					src={`/_icons/moon.svg`}
					alt="Moon icon"
					className="h-4 w-4 svg-icon"
				/>
			</button>
		</div>
	);
};

export default DarkLightToggle;
