// import React from "react";
// import GalleryCard from "./_piece"; 

// type PortfolioItem = {
// 	id: string;
// 	title: string;
// 	description: string;
// 	image: string;
// 	slug: string;
// 	url: string; // This will be the custom "Url" from the Notion property
// };

// type PortfolioProps = {
// 	items: PortfolioItem[]; // Array of items to display
// 	columns?: string; // Optional: grid column classes (default: 3 columns)
// };
// const Portfolio: React.FC<PortfolioProps> = ({ items }) => {
// 	return (
// 		<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
// 			{/* Map through the items array and render a GalleryCard for each item */}
// 			{items.map((item) => (
// 				<GalleryCard
// 					key={item.id}
// 					id={item.id}
// 					title={item.title}
// 					description={item.description}
// 					image={item.image}
// 					slug={item.slug}
// 					url={item.url}
// 				/>
// 			))}
// 		</div>
// 	);
// };

// export default Portfolio;
