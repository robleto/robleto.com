import React from "react";
import Link from "next/link"; // Import Link from Next.js


const Logo: React.FC<{}> = () => {
	return (
		<div className="fixed top-2 right-2 z-50">
			<Link href="/">
				<img
					src="/_brand/gr-logo.svg"
					alt="gr"
					className="w-8 h-8 mt-2 mr-4 "
				/>
			</Link>
		</div>
	);
};

export default Logo;
