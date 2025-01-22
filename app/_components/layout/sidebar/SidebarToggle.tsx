import React from "react";

type SidebarToggleProps = {
	isCollapsed: boolean;
	toggleCollapse: () => void;
};

const SidebarToggle: React.FC<SidebarToggleProps> = ({
	isCollapsed,
	toggleCollapse,
}) => {
	return (
		<div
			className={`absolute top-2 ${
				isCollapsed ? "left-1/2 transform -translate-x-1/2" : "right-2"
			}`}
		>
			<button id="sidebarToggle" aria-label="sidebarToggle" onClick={toggleCollapse}>
				{isCollapsed ? (
					// Right double arrow for collapsed state (centered)
					<svg
						className="w-4 h-4 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M13 19l7-7-7-7M5 19l7-7-7-7"
						/>
					</svg>
				) : (
					// Left double arrow for expanded state (right-aligned)
					<svg
						className="w-4 h-4 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M11 5l-7 7 7 7M19 5l-7 7 7 7"
						/>
					</svg>
				)}
			</button>
		</div>
	);
};

export default SidebarToggle;
