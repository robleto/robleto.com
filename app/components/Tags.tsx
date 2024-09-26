import React from "react";

// Define the available colors for tags
const availableColors = [
	"bg-ferra: text-white", //Dark purple
	"bg-iron text-gravel", //Light grey
	"bg-mercury text-gravel", //Light blue
	"bg-nobel text-gravel", //Mid grey
	"bg-emperor text-white", //Dark grey
	"bg-oracle text-white", //Dark teal
	"bg-gunpowder text-white", //Dark blue
	"bg-whisper text-gravel", //Very Light grey
	"bg-gravel text-white", //Darker grey
	"bg-sapling text-gravel", //Light yellow
	"bg-strikemaster text-gravel", //Light purple
	"bg-blossom text-gravel", // Blossom Pink
	"bg-rosewater text-gravel", // Rosewater
	"bg-mauvewood text-white", // Mauvewood
	"bg-softkhaki text-gravel", // Soft Khaki
	"bg-plumwine text-white", // Plum Wine
	"bg-deepcharcoal text-white", // Deep Charcoal
	"bg-stormcloud text-white", // Storm Cloud
	"bg-seamist text-gravel", // Seamist
	"bg-darkslate text-white", // Dark Slate
	"bg-oceanblue text-white", // Ocean Blue
	"bg-goldenyellow text-gray-800", // Golden Yellow
	"bg-forestgreen text-white", // Forest Green
	"bg-purplehaze text-white", // Purple Haze
	"bg-tropicalteal text-white", // Tropical Teal
	"bg-firetruckred text-white", // Firetruck Red
	"bg-midnightindigo text-white", // Midnight Indigo
	"bg-hotpink text-white", // Hot Pink
	"bg-icycyan text-gray-800", // Icy Cyan
	"bg-lemongrass text-gray-800", // Lemongrass Green
];
// Hash function to map a tag to a color consistently
const hashStringToIndex = (str: string) => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	return Math.abs(hash % availableColors.length); // Ensure it's within the available colors
};

interface TagsProps {
	tags: string[];
}

const Tags: React.FC<TagsProps> = ({ tags }) => {
	return (
		<div className="flex flex-wrap gap-2">
			{tags.map((tag, index) => {
				const colorClass = availableColors[hashStringToIndex(tag)];
				return (
					<span
						key={index}
						// Apply the filter to desaturate the color by 33%
						className={`px-2 py-1 rounded text-[12px] font-medium whitespace-nowrap ${colorClass}`}
						style={{ filter: "saturate(0.67)" }} // 33% desaturation
					>
						{tag}
					</span>
				);
			})}
		</div>
	);
};

export default Tags;