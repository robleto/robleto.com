import React from "react";
import GalleryCard from "./_book"; 

type BookshelfItem = {
	id: string;
	title: string;
	image: string;
	url: string; // This will be the custom "Url" from the Notion property
};

type BookshelfProps = {
	items: BookshelfItem[]; // Array of items to display
	columns?: string; // Optional: grid column classes (default: 3 columns)
};

const Bookshelf: React.FC<BookshelfProps> = ({ items }) => {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
			{/* Map through the items array and render a GalleryCard for each item */}
			{items.map((item) => (
				<GalleryCard
					key={item.id}
					id={item.id}
					title={item.title}
					image={item.image}
					url={item.url}
				/>
			))}
		</div>
	);
};

export default Bookshelf;
