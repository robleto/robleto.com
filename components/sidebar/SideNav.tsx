"use client"; // Needed since we're using useState

import React, { useState, useEffect } from "react";
import SidebarLink from "./SidebarLink";
import SidebarSectionHeader from "./SidebarSectionHeader";
import Logo from "./Logo";
import SidebarToggle from "./SidebarToggle";
import DarkLightToggle from "../sidebar/DarkLightToggle";

export default function SideNav() {
	// State to track sidebar collapse/expand status
	const [isCollapsed, setIsCollapsed] = useState(false);
	// State to prevent rendering until window size is determined
	const [isReady, setIsReady] = useState(false);

	// Set the default state based on the screen width
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 768) {
				setIsCollapsed(true); // Default to collapsed on mobile
			} else {
				setIsCollapsed(false); // Default to expanded on desktop
			}
		};

		// Set the initial state based on the current screen width and prevent flickering
		handleResize();
		setIsReady(true); // Mark as ready to render after checking window size

		// Add event listener to update state on window resize
		window.addEventListener("resize", handleResize);

		// Cleanup the event listener on component unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	// Prevent rendering until the correct state is determined
	if (!isReady) {
		return null; // Or you can return a loading spinner, etc.
	}

	return (
		<div className="flex h-screen fixed min-h-[100vh] overflow-scroll">
			{/* Sidebar Navigation */}
			<nav
				className={`bg-mercury  text-gray-900 flex flex-col transition-all duration-300 ease-in-out dark:bg-gray-800 dark:text-gray-200 ${
					isCollapsed ? "w-16" : "w-48"
				}`}
			>
				{/* Sidebar Toggle */}
				<SidebarToggle
					isCollapsed={isCollapsed}
					toggleCollapse={() => setIsCollapsed(!isCollapsed)}
				/>

				<div className="flex-grow overflow-y-auto mt-8">
					{/* Logo */}
					<Logo isCollapsed={isCollapsed} />

					{/* Sidebar Links */}
					<div className="px-4">
						<SidebarSectionHeader
							title="Biography"
							isCollapsed={isCollapsed}
						/>
						<ul>
							<SidebarLink
								slug="projects"
								title="Projects"
								isCollapsed={isCollapsed}
							/>
							<SidebarLink
								slug="art"
								title="Art"
								isCollapsed={isCollapsed}
							/>
							<SidebarLink
								slug="resources"
								title="Resources"
								isCollapsed={isCollapsed}
							/>
							<SidebarLink
								slug="posts"
								title="Posts"
								isCollapsed={isCollapsed}
							/>
							<SidebarLink
								slug="travel"
								title="Travels"
								isCollapsed={isCollapsed}
							/>
							<SidebarLink
								slug="about"
								title="About"
								isCollapsed={isCollapsed}
							/>
						</ul>
						<SidebarSectionHeader
							title="Collection"
							isCollapsed={isCollapsed}
						/>
						<ul>
							<SidebarLink
								slug="library"
								title="Library"
								isCollapsed={isCollapsed}
							/>
							<SidebarLink
								slug="bookmarks"
								title="Bookmarks"
								isCollapsed={isCollapsed}
							/>
							<SidebarLink
								slug="reading-list"
								title="Reading List"
								isCollapsed={isCollapsed}
							/>
							<SidebarLink
								slug="following"
								title="Following"
								isCollapsed={isCollapsed}
							/>
						</ul>
						<SidebarSectionHeader
							title="Reach Out"
							isCollapsed={isCollapsed}
						/>
						<ul>
							<SidebarLink
								slug="contact"
								title="Contact"
								isCollapsed={isCollapsed}
							/>
							<SidebarLink
								slug="social"
								title="Social"
								isCollapsed={isCollapsed}
							/>
						</ul>
					</div>
				</div>

				{/* Dark/Light Toggle - Fixed at the bottom */}
				{!isCollapsed && (
					<div className="p-4 mt-auto">
						<DarkLightToggle />
					</div>
				)}
			</nav>
		</div>
	);
}
