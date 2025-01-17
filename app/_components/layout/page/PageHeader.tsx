"use client";

import React from "react";
import { renderBlock } from "@/utils/renderItems"; // Adjust the import path as needed

interface PageHeaderProps {
	title: string;
	icon: string;
	pageContent: any[]; // Adjust the type based on your actual data structure
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, icon, pageContent }) => {
	return (
		<div
			className="
				flex flex-col flex-grow max-w-screen-xl -z-20 pl-[20%] md:pl-[25%] lg:w-auto align-left justify-center relative
				mx-auto p-4 pt-10 transition-all duration-300 min-h-[20em] 
			"
		>
			{/* Page Title */}

			<h1 className="text-xl -z-10 relative md:text-2xl font-medium uppercase tracking-[.25rem]  text-gray-800 dark:text-gray-200 flex items-center">
				<img
					src={`/_icons/${icon}.svg`}
					alt={title}
					className="h-10 w-10 svg-icon mr-2"
				></img>
				{title}
			</h1>

			{/* Subhead */}
			<section className="notion-page-content -z-10 relative font-medium text-md md:text-lg mx-auto mt-0 md:pr-[30%] leading-5 md:leading-6 text-gray-800 dark:text-gray-200">
				{/* Loop over pageContent and render each block using renderBlock */}
				{pageContent.map((block: any) => renderBlock(block))}
			</section>
		</div>
	);
};

export default PageHeader;
