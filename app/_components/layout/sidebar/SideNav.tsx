"use client"; // Add this directive to mark it as a client component

import React, { useState, useEffect } from "react";
import Link from "next/link"; // Import Link from Next.js
import SidebarLink from "./SidebarLink";
import SidebarSectionHeader from "./SidebarSectionHeader";
import SidebarToggle from "./SidebarToggle";
import DarkLightToggle from "./DarkLightToggle";
import Modal from "../../common/Modal";
import ContactModal from "../../../about/_contact";
import SocialModal from "../../../about/_social";
import { usePathname } from "next/navigation"; // Import usePathname hook

export default function SideNav() {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isReady, setIsReady] = useState(false);
	const [isListsOpen, setIsListsOpen] = useState(false); // Add state for Lists submenu

	const pathname = usePathname(); // Get the current path using usePathname

	// Modal state
	const [isContactModalOpen, setIsContactModalOpen] = useState(false);
	const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);

	useEffect(() => {
		// Auto-collapse on mobile screens
		const handleResize = () => {
			if (window.innerWidth < 768) {
				setIsCollapsed(true); // Default to collapsed on mobile
			} else {
				setIsCollapsed(false); // Default to expanded on desktop
			}
		};

		handleResize();
		setIsReady(true);

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	// Check the current path and auto-open Lists submenu if necessary
	useEffect(() => {
		if (pathname.startsWith("/lists")) {
			setIsListsOpen(true); // Keep Lists submenu open when on /lists or any subpage
		}
	}, [pathname]);

	if (!isReady) {
		return null;
	}

	return (
		<div className="flex h-screen z-50 fixed min-h-[90vh] w-auto overflow-scroll">
			<nav
				className={`bg-mercury text-gray-900 flex flex-col transition-all duration-300 ease-in-out dark:bg-gray-800 dark:text-gray-200  pt-8 ${
					isCollapsed ? "w-16" : "w-48"
				}`}
			>
				<SidebarToggle
					isCollapsed={isCollapsed}
					toggleCollapse={() => setIsCollapsed(!isCollapsed)}
				/>

				<Link
					href="/"
					className="opacity-70 hover:opacity-100 dark:invert"
				>
					<img
						src="/_brand/gr-logo.svg"
						alt="gr"
						className={` ml-4  ${
							isCollapsed
								? "w-8 h-8 mt-[.5rem]"
								: "w-10 h-10 mt-[-1rem]"
						}`}
					/>
				</Link>

				<div className="flex-grow overflow-y-auto">
					<div className="px-4">
						<SidebarSectionHeader
							title="Biography"
							isCollapsed={isCollapsed}
						/>
						<ul>
							<SidebarLink
								link="portfolio"
								slug="portfolio"
								title="Portfolio"
								isCollapsed={isCollapsed}
								onOpenContact={() => {}}
								onOpenSocial={() => {}}
							/>
							<SidebarLink
								link="projects"
								slug="projects"
								title="Projects"
								isCollapsed={isCollapsed}
								onOpenContact={() => {}}
								onOpenSocial={() => {}}
							/>
							<SidebarLink
								link="art"
								slug="art"
								title="Art"
								isCollapsed={isCollapsed}
								onOpenContact={() => {}}
								onOpenSocial={() => {}}
							/>
							<SidebarLink
								link="resources"
								slug="resources"
								title="Resources"
								isCollapsed={isCollapsed}
								onOpenContact={() => {}}
								onOpenSocial={() => {}}
							/>
							<SidebarLink
								link="posts"
								slug="posts"
								title="Posts"
								isCollapsed={isCollapsed}
								onOpenContact={() => {}}
								onOpenSocial={() => {}}
							/>

							{/* Lists parent link */}
							<li>
								<div
									onClick={() => setIsListsOpen(!isListsOpen)}
								>
									<SidebarLink
										link="lists"
										slug="lists"
										title="Lists"
										isCollapsed={isCollapsed}
										onOpenContact={() => {}}
										onOpenSocial={() => {}}
									/>
								</div>

								{/* Submenu for Lists */}
								{isListsOpen && (
									<ul
										className={`pl-4 ${
											isCollapsed ? "hidden" : "block"
										}`}
									>
										<SidebarLink
											link="lists/travel"
											slug="travel"
											title="Travel"
											isCollapsed={isCollapsed}
											onOpenContact={() => {}}
											onOpenSocial={() => {}}
										/>
										<SidebarLink
											link="lists/board-games"
											slug="board-games"
											title="Board Games"
											isCollapsed={isCollapsed}
											onOpenContact={() => {}}
											onOpenSocial={() => {}}
										/>
										<SidebarLink
											link="lists/musicals"
											slug="musical"
											title="Musicals"
											isCollapsed={isCollapsed}
											onOpenContact={() => {}}
											onOpenSocial={() => {}}
										/>
										<SidebarLink
											link="lists/shakespeare"
											slug="shakespeare"
											title="Shakespeare"
											isCollapsed={isCollapsed}
											onOpenContact={() => {}}
											onOpenSocial={() => {}}
										/>
									</ul>
								)}
							</li>

							<SidebarLink
								link="about"
								slug="about"
								title="About"
								isCollapsed={isCollapsed}
								onOpenContact={() => {}}
								onOpenSocial={() => {}}
							/>
						</ul>

						<SidebarSectionHeader
							title="Collection"
							isCollapsed={isCollapsed}
						/>
						<ul>
							<SidebarLink
								link="library"
								slug="library"
								title="Library"
								isCollapsed={isCollapsed}
								onOpenContact={() => {}}
								onOpenSocial={() => {}}
							/>
							<SidebarLink
								link="reading-list"
								slug="reading-list"
								title="Reading List"
								isCollapsed={isCollapsed}
								onOpenContact={() => {}}
								onOpenSocial={() => {}}
							/>
							<SidebarLink
								link="bookmarks"
								slug="bookmarks"
								title="Bookmarks"
								isCollapsed={isCollapsed}
								onOpenContact={() => {}}
								onOpenSocial={() => {}}
							/>
							<SidebarLink
								link="following"
								slug="following"
								title="Following"
								isCollapsed={isCollapsed}
								onOpenContact={() => {}}
								onOpenSocial={() => {}}
							/>
						</ul>
						<SidebarSectionHeader
							title="Reach Out"
							isCollapsed={isCollapsed}
						/>
						<ul>
							<SidebarLink
								link="contact"
								slug="contact"
								title="Contact"
								isCollapsed={isCollapsed}
								onOpenContact={() =>
									setIsContactModalOpen(true)
								} // Open Contact modal
								onOpenSocial={() => {}}
							/>
							<SidebarLink
								link="social"
								slug="social"
								title="Social"
								isCollapsed={isCollapsed}
								onOpenContact={() => {}}
								onOpenSocial={() => setIsSocialModalOpen(true)} // Open Social modal
							/>
						</ul>
					</div>
				</div>

				{!isCollapsed && (
					<div className="p-4 mt-auto">
						<DarkLightToggle />
					</div>
				)}
			</nav>

			{/* Contact Modal */}
			<Modal
				isOpen={isContactModalOpen}
				onClose={() => setIsContactModalOpen(false)} // Close modal function
				title="Contact"
			>
				<ContactModal onClose={() => setIsContactModalOpen(false)} />
			</Modal>

			{/* Social Modal */}
			<Modal
				isOpen={isSocialModalOpen}
				onClose={() => setIsSocialModalOpen(false)}
				title="Social Links"
			>
				<SocialModal onClose={() => setIsSocialModalOpen(false)} />
			</Modal>
		</div>
	);
}
