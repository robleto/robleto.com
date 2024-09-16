import React, { useState, useEffect } from "react";

const DarkLightToggle = () => {
	const [theme, setTheme] = useState("system");

	// Detect system dark mode
	const isDarkMode = () =>
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: dark)").matches;

	// Detect system light mode
	const isLightMode = () => !isDarkMode();

	// Apply the appropriate theme when the component mounts or the theme changes
	useEffect(() => {
		if (theme === "light") {
			document.documentElement.classList.remove("dark");
		} else if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			// For 'system', apply based on system preference
			const systemDark = isDarkMode();
			document.documentElement.classList.toggle("dark", systemDark);
		}
	}, [theme]);

	// Handle theme changes on button click
	const handleThemeChange = (newTheme: string) => {
		setTheme(newTheme);
	};

	return (
		<div className="flex w-full opacity-50 divide-x divide-gray-300 border border-gray-300 dark:divide-gray-700 dark:border-gray-700 rounded">
			{/* Light mode option */}
			<button
				className={`flex-1 p-2 flex justify-center items-center rounded-l ${
					theme === "light" ? "bg-gray-200 dark:bg-gray-600" : ""
				}`}
				onClick={() => handleThemeChange("light")}
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
				onClick={() => handleThemeChange("system")}
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
				onClick={() => handleThemeChange("dark")}
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
