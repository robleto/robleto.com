"use client"; // Add this directive to mark it as a client component

import React, { useState, useEffect } from "react";
import Link from "next/link"; // Import Link from Next.js
import SidebarLink from "./SidebarLink";
import SidebarToggle from "./SidebarToggle";
import DarkLightToggle from "./DarkLightToggle";
import Modal from "../../common/Modal";
import ContactModal from "../../../about/_contact";
import SocialModal from "../../../about/_social";
import { usePathname } from "next/navigation"; // Import usePathname hook

const COLLAPSED_LANDING_PATHS = ["/portfolio"];

export default function SideNav() {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isReady, setIsReady] = useState(false);
	const [isArtOpen, setIsArtOpen] = useState(false); // Art submenu

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

		// Direct visits to these pages (e.g. a link from a résumé) open with the
		// nav collapsed so the content leads. Sidebar links are full page loads,
		// so use the referrer to skip the rule when arriving from elsewhere on
		// this site.
		const cameFromThisSite = (() => {
			try {
				return (
					document.referrer !== "" &&
					new URL(document.referrer).origin === window.location.origin
				);
			} catch {
				return false;
			}
		})();
		if (
			!cameFromThisSite &&
			COLLAPSED_LANDING_PATHS.some((path) => pathname.startsWith(path))
		) {
			setIsCollapsed(true);
		}

		setIsReady(true);

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
		// Intentionally first-load only: pathname is read once for the landing rule.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Expose nav state to the page so the main column can reclaim the space
	// (see .site-main rules in globals.css)
	useEffect(() => {
		document.documentElement.dataset.nav = isCollapsed ? "collapsed" : "expanded";
	}, [isCollapsed]);

	// Keep the Art submenu open on /art and its sub-pages
	useEffect(() => {
		if (pathname.startsWith("/art")) {
			setIsArtOpen(true);
		}
	}, [pathname]);

	// Render with opacity-0 during SSR/hydration to prevent layout flash
	return (
		<div
			className={`fixed z-50 flex h-screen min-h-[90vh] overflow-y-auto overflow-x-hidden transition-opacity duration-150 ${
				!isReady ? "opacity-0 pointer-events-none" : ""
			}`}
		>
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
								? "w-8 h-8 mt-[1.5rem] mb-4"
								: "w-10 h-10 mt-[-1rem] mb-6"
						}`}
					/>
				</Link>

				<div className="flex-grow overflow-y-auto">
					<div className="px-4">
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
							{/* Art parent — disclosure pattern: link navigates, chevron toggles submenu */}
							<li>
								<div
									className={`flex items-center hover:shadow-sm hover:bg-white hover:border-nobel hover:dark:bg-gray-700 px-2 py-2 rounded-lg ${
										isCollapsed ? "justify-center" : "justify-start"
									}`}
								>
									<a
										href="/art"
										className="flex items-center space-x-2 hover:text-gray-600 hover:dark:text-gray-200 flex-1 min-w-0"
									>
										<img
											src="/_icons/art.svg"
											alt=""
											aria-hidden="true"
											className="h-4 w-4 svg-icon shrink-0"
										/>
										{!isCollapsed && (
											<span className="text-sm font-medium">Art</span>
										)}
									</a>
									{!isCollapsed && (
										<button
											onClick={() => setIsArtOpen(!isArtOpen)}
											aria-expanded={isArtOpen}
											aria-label={isArtOpen ? "Collapse art submenu" : "Expand art submenu"}
											className="ml-auto p-1 rounded hover:text-gray-600 dark:hover:text-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-1"
										>
											<svg
												className={`h-3 w-3 transition-transform duration-200 ${isArtOpen ? "rotate-90" : ""}`}
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												aria-hidden="true"
											>
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
											</svg>
										</button>
									)}
								</div>

								{/* Submenu for Art */}
								{isArtOpen && !isCollapsed && (
									<ul className="pl-4">
										<SidebarLink
											link="art/css"
											slug="css"
											title="CSS Art"
											isCollapsed={isCollapsed}
											onOpenContact={() => {}}
											onOpenSocial={() => {}}
										/>
<SidebarLink
											link="art/digital"
											slug="digital"
											title="Digital Art"
											isCollapsed={isCollapsed}
											onOpenContact={() => {}}
											onOpenSocial={() => {}}
										/>
<SidebarLink
											link="art/ai"
											slug="ai"
											title="AI-Assisted Art"
											isCollapsed={isCollapsed}
											onOpenContact={() => {}}
											onOpenSocial={() => {}}
										/>
									</ul>
								)}
							</li>
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
								title="Writing"
								isCollapsed={isCollapsed}
								onOpenContact={() => {}}
								onOpenSocial={() => {}}
							/>

<SidebarLink
								link="about"
								slug="about"
								title="About"
								isCollapsed={isCollapsed}
								onOpenContact={() => {}}
								onOpenSocial={() => {}}
							/>
						</ul>

					</div>
				</div>

				{/* Reach Out — pinned to the bottom of the nav, above the theme toggle */}
				<div className="px-4">
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

				{!isCollapsed && (
					<div className="p-4">
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
