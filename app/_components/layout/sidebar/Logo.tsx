import React from "react";
import Link from "next/link"; // Import Link from Next.js


const Logo: React.FC<{}> = () => {
	return (
		<div className="bg-gray-900 fixed min-h-[20px] z-[99999] min-w-[100vw] ">
			<Link
				href="/"
				className="flex flex-row bg-transparent items-center p-2 space-x-2"
			>
				<img
					src="/_brand/gr-1.svg"
					alt="gr"
					className="w-8 h-8 text-white ml-2"
				/>
				<h1 className="font-oswald uppercase font-medium text-xl text-gray-100 dark:text-gray-200">
					Greg Robleto
				</h1>
			</Link>
		</div>
	);
};

export default Logo;
