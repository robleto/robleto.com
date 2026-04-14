"use client";

import React from "react";
import { usePathname } from "next/navigation";

type SidebarLinkProps = {
	link: string;
	slug: string;
	title: string;
	isCollapsed: boolean;
	onOpenContact: () => void;
	onOpenSocial: () => void;
	as?: "li" | "div";
};

const SidebarLink: React.FC<SidebarLinkProps> = ({
	link,
	slug,
	title,
	isCollapsed,
	onOpenContact,
	onOpenSocial,
	as = "li",
}) => {
	const pathname = usePathname();

	const isModalLink = slug === "contact" || slug === "social";

	// Active when path exactly matches or begins with this segment
	const isActive =
		!isModalLink &&
		link !== "" &&
		(pathname === `/${link}` || pathname.startsWith(`/${link}/`));

	const handleClick = () => {
		if (slug === "contact") onOpenContact();
		else if (slug === "social") onOpenSocial();
	};

	const WrapperTag = as;

	const wrapperClass = [
		"flex items-center px-2 py-2 rounded-lg transition-colors",
		isCollapsed ? "justify-center" : "justify-start",
		isActive
			? "bg-white dark:bg-gray-700 shadow-sm"
			: "hover:shadow-sm hover:bg-white hover:border-nobel hover:dark:bg-gray-700",
	].join(" ");

	const textClass = [
		"text-sm",
		isActive ? "font-semibold text-link dark:text-lightlink" : "font-medium",
	].join(" ");

	return (
		<WrapperTag className={wrapperClass}>
			{isModalLink ? (
				<button
					id={`${title} icon`}
					aria-label={title}
					onClick={handleClick}
					className="flex items-center space-x-2 hover:text-gray-600 hover:dark:text-gray-200 w-full text-left"
				>
					<img
						src={`/_icons/${slug}.svg`}
						alt=""
						aria-hidden="true"
						className="h-4 w-4 svg-icon shrink-0"
					/>
					{!isCollapsed && <span className={textClass}>{title}</span>}
				</button>
			) : (
				<a
					href={`/${link}`}
					aria-current={isActive ? "page" : undefined}
					className="flex items-center space-x-2 hover:text-gray-600 hover:dark:text-gray-200 w-full"
				>
					<img
						src={`/_icons/${slug}.svg`}
						alt=""
						aria-hidden="true"
						className="h-4 w-4 svg-icon shrink-0"
					/>
					{!isCollapsed && <span className={textClass}>{title}</span>}
				</a>
			)}
		</WrapperTag>
	);
};

export default SidebarLink;
