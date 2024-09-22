import React from "react";
import GalleryCard from "./_piece";

type GalleryItem = {
	id: string;
	title: string;
	image: string;
	url: string;
	featured: boolean; // Add a featured property
};

type GalleryProps = {
	items: GalleryItem[];
};

const Gallery: React.FC<GalleryProps> = ({ items }) => {
	// Separate featured and non-featured items
	const featuredItems = items.filter((item) => item.featured);
	const regularItems = items.filter((item) => !item.featured);

	return (
		<div className="space-y-8">
			{/* Featured items section (2 columns on desktop) */}
			{featuredItems.length > 0 && (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
					{featuredItems.map((item) => (
						<GalleryCard
							key={item.id}
							id={item.id}
							title={item.title}
							image={item.image}
							url={item.url}
						/>
					))}
				</div>
			)}

			{/* Regular items section (3 columns on desktop) */}
			{regularItems.length > 0 && (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{regularItems.map((item) => (
						<GalleryCard
							key={item.id}
							id={item.id}
							title={item.title}
							image={item.image}
							url={item.url}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default Gallery;
