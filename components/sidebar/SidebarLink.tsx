import React from "react";

type SidebarLinkProps = {
	slug: string;
	title: string;
	isCollapsed: boolean; // Handle collapsed state
};

const SidebarLink: React.FC<SidebarLinkProps> = ({
	slug,
	title,
	isCollapsed,
}) => {
	return (
		<li
			className={`flex items-center hover:shadow-sm hover:bg-white hover:border-nobel hover:dark:bg-gray-700 px-2 py-2 rounded-lg ${
				isCollapsed ? "justify-center" : "justify-start"
			}`}
		>
			{/* Wrap both the icon and text in the anchor tag so it's clickable in both states */}
			<a
				href={`/${slug}`}
				className="flex items-center space-x-2 hover:text-gray-600 hover:dark:text-gray-200"
			>
				<img
					src={`/_icons/${slug}.svg`}
					alt={`${title} icon`}
        className="h-4 w-4 svg-icon"
				/>
				{!isCollapsed && (
					<span className="text-sm font-medium">{title}</span>
				)}
			</a>
		</li>
	);
};

export default SidebarLink;
