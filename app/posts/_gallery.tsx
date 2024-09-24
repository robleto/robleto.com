import React from "react";
import GalleryCard from "./_piece"; // Ensure correct import

type GalleryItem = {
	id: string;
	name: string;
	image: string;
	url: string;
	pubDate: Date;
	featured: boolean;
};

type GalleryProps = {
	items: GalleryItem[];
};

const Gallery: React.FC<GalleryProps> = ({ items }) => {
	// Separate featured and non-featured items
	const featuredItems = items.filter((item) => item.featured);
	const regularItems = items.filter((item) => !item.featured);

	// Helper function to format the date
	const formatDate = (date: Date) => {
		return date
			.toLocaleDateString("en-US", {
				month: "short",
				year: "numeric",
			})
			.replace(".", ".");
	};

	return (
		<div className="space-y-8">
			{/* Featured items section */}
			{featuredItems.length > 0 && (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
					{featuredItems.map((item) => (
						<GalleryCard
							key={item.id}
							title={item.name}
							image={item.image}
							pubDate={formatDate(new Date(item.pubDate))}
							url={item.url}
							isPinned={true}
						/>
					))}
				</div>
			)}

			{/* Regular items section */}
			{regularItems.length > 0 && (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{regularItems.map((item) => (
						<GalleryCard
							key={item.id}
							title={item.name}
							image={item.image}
							pubDate={formatDate(new Date(item.pubDate))}
							url={item.url}
							isPinned={false}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default Gallery;
