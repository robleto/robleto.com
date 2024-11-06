"use client";

import React from "react";
import { renderBlock } from "@/utils/renderItems"; // Adjust the import path as needed

interface PageHeaderProps {
	title: string;
	pageContent: any[]; // Adjust the type based on your actual data structure
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, pageContent }) => {
	return (
		<div
			className="
				flex flex-col flex-grow max-w-screen-xl -z-20 pl-[20%] md:pl-[25%] lg:w-auto align-left justify-center relative
				mx-auto p-4 transition-all duration-300 text-gray-100 dark:text-white bg-white dark:bg-gray-900 min-h-[20em] shadow-md
			"
		>
			{/* Page Title */}
			<h1 className="text-6xl -z-10 relative md:text-7xl tracking-tight font-semibold font-oswald text-gray-800 dark:text-gray-200">
				{title}
			</h1>

			{/* Subhead */}
			<section className="notion-page-content -z-10 relative font-medium text-lg md:text-xl italic font-bodoni max-w-prose mx-auto mt-0 md:pr-[40%] leading-5 md:leading-6 text-gray-800 dark:text-gray-200">
				{/* Loop over pageContent and render each block using renderBlock */}
				{pageContent.map((block: any) => renderBlock(block))}
			</section>
		</div>
	);
};

export default PageHeader;
