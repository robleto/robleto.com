import React from "react";

interface TagProps {
	tag: string;
}

// Map specific tags to Tailwind color classes
const tagColors: { [key: string]: string } = {
	css: "bg-blossom text-gravel",
	"css art": "bg-whisper text-gravel",
	design: "bg-ferra text-white",
	leadership: "bg-sapling text-gravel",
	management: "bg-strikemaster text-white",
	marketing: "bg-emperor text-white",
	product: "bg-iron text-white",
	typography: "bg-spindle text-gravel",
	"web design": "bg-oracle text-white",
	// Add more tags as needed
};

const Tag: React.FC<TagProps> = ({ tag }) => {
	// Convert the tag to lowercase and assign color class, default to gray if tag not found
	const colorClass = tagColors[tag.toLowerCase()] || "bg-gray-500 text-white";

	return (
		<span
			className={`px-2 py-1 rounded text-[12px] font-medium  whitespace-nowrap ${colorClass}`}
		>
			{tag}
		</span>
	);
};

export default Tag;
