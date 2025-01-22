import React from "react";

type SidebarLinkProps = {
	link: string;
	slug: string;
	title: string;
	isCollapsed: boolean; // Handle collapsed state
	onOpenContact: () => void; // Handler to open Contact modal
	onOpenSocial: () => void; // Handler to open Social modal
};

const SidebarLink: React.FC<SidebarLinkProps> = ({
	link,
	slug,
	title,
	isCollapsed,
	onOpenContact,
	onOpenSocial,
}) => {
	// Determine if the slug is "contact" or "social"
	const isModalLink = slug === "contact" || slug === "social";

	// Handle the modal button click
	const handleClick = () => {
		if (slug === "contact") {
			onOpenContact();
		} else if (slug === "social") {
			onOpenSocial();
		}
	};

	return (
		<li
			className={`flex items-center hover:shadow-sm hover:bg-white hover:border-nobel hover:dark:bg-gray-700 px-2 py-2 rounded-lg ${
				isCollapsed ? "justify-center" : "justify-start"
			}`}
		>
			{isModalLink ? (
				<button
					id={`${title} icon`}
					aria-label={`${title} icon`}
					onClick={handleClick}
					className="flex items-center space-x-2 hover:text-gray-600 hover:dark:text-gray-200 w-full text-left"
				>
					<img
						src={`/_icons/${slug}.svg`}
						alt={`${title} icon`}
						className="h-4 w-4 svg-icon"
					/>
					{!isCollapsed && (
						<span className="text-sm font-medium">{title}</span>
					)}
				</button>
			) : (
				<a
					href={`/${link}`}
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
			)}
		</li>
	);
};

export default SidebarLink;
