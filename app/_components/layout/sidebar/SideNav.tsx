"use client"; // Add this directive to mark it as a client component

import React, { useState, useEffect } from "react";
import SidebarLink from "./SidebarLink";
import SidebarSectionHeader from "./SidebarSectionHeader";
import Logo from "./Logo";
import SidebarToggle from "./SidebarToggle";
import DarkLightToggle from "./DarkLightToggle";
import Modal from "../../common/Modal"; 
import ContactModal from "../../../about/_contact"; 
import SocialModal from "../../../about/_social"; 

export default function SideNav() {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isReady, setIsReady] = useState(false);

	// Modal state
	const [isContactModalOpen, setIsContactModalOpen] = useState(false);
	const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);

	useEffect(() => {
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

	if (!isReady) {
		return null;
	}

	return (
		<div className="flex h-screen fixed min-h-[100vh] overflow-scroll">
			<nav
				className={`bg-mercury text-gray-900 flex flex-col transition-all duration-300 ease-in-out dark:bg-gray-800 dark:text-gray-200 ${
					isCollapsed ? "w-16" : "w-48"
				}`}
			>
				<SidebarToggle
					isCollapsed={isCollapsed}
					toggleCollapse={() => setIsCollapsed(!isCollapsed)}
				/>

				<div className="flex-grow overflow-y-auto mt-8">
					<Logo isCollapsed={isCollapsed} />

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
								onOpenContact={() => {}}
								onOpenSocial={() => {}}
							/>
							<SidebarLink
								slug="art"
								title="Art"
								isCollapsed={isCollapsed}
								onOpenContact={() => {}}
								onOpenSocial={() => {}}
							/>
							<SidebarLink
								slug="resources"
								title="Resources"
								isCollapsed={isCollapsed}
								onOpenContact={() => {}}
								onOpenSocial={() => {}}
							/>
							<SidebarLink
								slug="posts"
								title="Posts"
								isCollapsed={isCollapsed}
								onOpenContact={() => {}}
								onOpenSocial={() => {}}
							/>
							<SidebarLink
								slug="travel"
								title="Travels"
								isCollapsed={isCollapsed}
								onOpenContact={() => {}}
								onOpenSocial={() => {}}
							/>
							<SidebarLink
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
								slug="library"
								title="Library"
								isCollapsed={isCollapsed}
								onOpenContact={() => {}}
								onOpenSocial={() => {}}
							/>
							<SidebarLink
								slug="bookmarks"
								title="Bookmarks"
								isCollapsed={isCollapsed}
								onOpenContact={() => {}}
								onOpenSocial={() => {}}
							/>
							<SidebarLink
								slug="reading-list"
								title="Reading List"
								isCollapsed={isCollapsed}
								onOpenContact={() => {}}
								onOpenSocial={() => {}}
							/>
							<SidebarLink
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
								slug="contact"
								title="Contact"
								isCollapsed={isCollapsed}
								onOpenContact={() =>
									setIsContactModalOpen(true)
								} // Open Contact modal
								onOpenSocial={() => {}}
							/>
							<SidebarLink
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
