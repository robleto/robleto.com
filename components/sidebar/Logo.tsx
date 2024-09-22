import React from "react";
import Link from "next/link"; // Import Link from Next.js

type LogoProps = {
	isCollapsed: boolean;
};

const Logo: React.FC<LogoProps> = ({ isCollapsed }) => {
	return (
		<Link
			href="/"
			className="flex flex-row bg-transparent items-center mt-3 space-x-2"
		>
			<img
				src="/_brand/gr-logo.svg"
				alt="gr"
				className={`h-8 w-auto svg-icon transition-all duration-300 ${
					isCollapsed ? "mx-auto" : "ml-4"
				}`}
			/>
			{/* Greg Robleto Name as H1 in Oswald Font */}
			{!isCollapsed && (
				<h1 className="font-oswald uppercase font-medium text-xl text-gray-900 dark:text-gray-200">
					Greg Robleto
				</h1>
			)}
		</Link>
	);
};

export default Logo;
