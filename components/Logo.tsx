import React from "react";

type LogoProps = {
	isCollapsed: boolean;
};

const Logo: React.FC<LogoProps> = ({ isCollapsed }) => {
	return (
		<div className="flex flex-row items-center mt-3 space-x-2">
			<img
				src="/_brand/gr.svg"
				alt="Logo"
				className={`h-8 w-auto transition-all duration-300 ${
					isCollapsed ? "mx-auto" : "ml-4"
				}`}
			/>
			{/* Greg Robleto Name as H1 in Oswald Font */}
			{!isCollapsed && (
				<h1 className="font-oswald uppercase font-medium text-xl text-gray-900">
					Greg Robleto
				</h1>
			)}
		</div>
	);
};

export default Logo;
