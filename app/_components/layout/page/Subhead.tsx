"use server"; // This component runs on the client

import React from "react";
import { renderBlock } from "@/utils/renderItems"; // Adjust the import path as needed

interface SubheadProps {
	pageContent: any[]; // Adjust the type based on your actual data structure
}

const Subhead: React.FC<SubheadProps> = ({ pageContent }) => {
	return (
		<section className="notion-page-content -z-10 relative font-medium text-lg md:text-xl italic font-bodoni text-center max-w-prose mx-auto mt-0 pb-4 mb-8 md:px-[20%] leading-5 md:leading-6 text-gray-800 dark:text-gray-200">
			{/* Loop over the pageContent and render each block using renderBlock */}
			{pageContent.map((block: any) => renderBlock(block))}
		</section>
	);
};

export default Subhead;
