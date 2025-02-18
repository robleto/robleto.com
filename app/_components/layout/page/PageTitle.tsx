"use client"; // Needed since we're using useState

import React from "react";

type PageTitleProps = {
	title: string,
};

export default function Header({ title }: PageTitleProps) {
	return (
			<h1 className="text-6xl -z-10 relative md:text=-9xl tracking-tight font-semibold font-oswald text-gray-800 dark:text-gray-200">
				{title}
			</h1>
	);
}
