import React from "react";
import GalleryCard from "./_destination";

type GalleryItem = {
	id: string;
	title: string;
	image: string;
	url: string; // This will be the custom "Url" from the Notion property
	cityState: string;
};

type GalleryCardProps = {
	id: string;
	title: string;
	image: string;
	url: string;
	cityState: string; // Add the cityState property
};

type GalleryProps = {
	items: GalleryItem[]; // Array of items to display
	columns?: string; // Optional: grid column classes (default: 3 columns)
};

const Gallery: React.FC<GalleryProps> = ({ items }) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
			{/* Map through the items array and render a GalleryCard for each item */}
			{items.map((item) => (
				<GalleryCard
					key={item.id}
					id={item.id}
					title={item.title}
					image={item.image}
					url={item.url}
					cityState={item.cityState} // Pass the cityState property
				/>
			))}
		</div>
	);
};

export default Gallery;
