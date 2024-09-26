import React from "react";

type SidebarSectionHeaderProps = {
	title: string;
	isCollapsed: boolean;
};

const SidebarSectionHeader: React.FC<SidebarSectionHeaderProps> = ({
	title,
	isCollapsed,
}) => {
	return (
		<h3
			className={`uppercase text-xs font-semibold text-gray-400 mt-6 ${
				isCollapsed ? "invisible" : "block"
			}`}
		>
			{title}
		</h3>
	);
};

export default SidebarSectionHeader;
