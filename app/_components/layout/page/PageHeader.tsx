"use client";

import React from "react";
import { renderBlock } from "@/utils/renderItems"; // Adjust the import path as needed

interface PageHeaderProps {
	title: string;
	icon: string;
	linkUrl?: string;
	linkText?: string;
	pageContent: any[]; // Adjust the type based on your actual data structure
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, icon, linkUrl, linkText, pageContent }) => {
	return (
		<div
			className="
				flex flex-col z-10 lg:w-auto align-left justify-center relative
				mx-auto  py-10 transition-all duration-300 min-h-[20em] 
			"
		>
			{/* Page Title */}

			<h1 className="text-xl relative md:text-2xl font-medium uppercase tracking-[.25rem]  text-gray-800 dark:text-gray-200 flex items-center">
				<img
					src={`/_icons/${icon}.svg`}
					alt={title}
					className="h-10 w-10 svg-icon mr-2"
				></img>
				{title}
			</h1>

			{/* Subhead */}
			<section className="notion-page-content relative font-medium text-md md:text-lg mx-auto mt-0 md:pr-[30%] leading-5 md:leading-6 text-gray-800 dark:text-gray-200">
				{/* Loop over pageContent and render each block using renderBlock */}
				{pageContent.map((block: any) => renderBlock(block))}
			</section>

			{linkUrl && linkText && (
				<a
					href={linkUrl}
					className="mt-5 z-50 inline-block border border-gray-700 text-gray-700 dark:border-gray-100 dark:text-gray-100 rounded-full px-6 py-2 transition-colors duration-300 self-start hover:bg-gray-700 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-700"
				>
					{linkText}
				</a>
			)}
		</div>
	);
};

export default PageHeader;
