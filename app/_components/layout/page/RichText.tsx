"use server"; // This component runs on the client

import React from "react";
import { renderBlock } from "../../../../utils/renderItems"; // Adjust the import path as needed

interface RichTextProps {
	pageContent: any[]; // Adjust the type based on your actual data structure
}

const RichText: React.FC<RichTextProps> = ({ pageContent }) => {
	return (
		<div className="page-description my-8">
			{/* Loop over the pageContent and render each block using renderBlock */}
			{pageContent.map((block: any) => renderBlock(block))}
		</div>
	);
};

export default RichText;
