	"use client"; // Ensure this is a Client Component

	import React from "react";
	import { FaImage } from "react-icons/fa";
	import Tags from "./Tags"; // Component to display tags
	import {
		groupItemsByVariable,
		sortGroupsAlphabetically,
	} from "@/utils/groupItems"; // Utilities for grouping and sorting

	// Define the prop types for the Gallery component
	type GalleryProps = {
		items: any[]; // The items to be displayed in the gallery
		gridCols?: string; // Tailwind grid column classes for the main grid
		smGridCols?: string; // Tailwind small screen grid column classes
		mdGridCols?: string; // Tailwind medium screen grid column classes
		lgGridCols?: string; // Tailwind large screen grid column classes
		pageKey?: string; // Optional key for the page name (e.g., 'art', 'projects')
		titleKey?: string; // Key for the title (e.g., item.title)
		linkKey?: string; // Key for the link (e.g., item.url)
		slugKey?: string; // Key for the slug (e.g., item.slug)
		descriptionKey?: string; // Key for the description (e.g., item.description)
		tagsKey?: string; // Key for the tags (e.g., item.tags)
		urlKey?: string; // Key for the URL to display at the bottom
		cityStateKey?: string; // Key for the city and state (e.g., item.cityState)
		animatedKey?: string; // Key for animated items (to differentiate .gif vs .png)
		groupByKey?: string | null; // Key to group items by (e.g., 'topics', 'state')
		sortItem?: (items: any[]) => any[]; // Optional sorting function
		filterItem?: (items: any[]) => any[]; // Optional filtering function
	};

	// Define the Gallery component
	const Gallery: React.FC<GalleryProps> = ({
		items,
		gridCols = "grid-cols-1", // Default grid layout (can be overridden)
		smGridCols = "sm:grid-cols-1", // Grid layout for small screens
		mdGridCols = "md:grid-cols-2", // Grid layout for medium screens
		lgGridCols = "lg:grid-cols-3", // Grid layout for large screens
		pageKey = "page", // Default key for the page (used in image URLs)
		titleKey = "title", // Default key for the title (e.g., item.title)
		linkKey = "", // Default key for the link (e.g., item.url)
		slugKey = "", // Default key for the slug (used for image paths)
		descriptionKey = "", // Default key for the description
		tagsKey = "", // Default key for tags (e.g., item.tags)
		urlKey = "", // Default key for the URL to display at the bottom
		cityStateKey = "", // Default key for the city/state
		animatedKey = "", // Key for detecting animated items (for .gif vs .png)
		groupByKey = null, // If set, the component will group by this key, otherwise no grouping
		sortItem,
		filterItem,
	}) => {
		// Step 1: Filter, group, or sort the items if corresponding functions are provided
		let displayItems = items;

		// Optional filtering
		if (filterItem) {
			displayItems = filterItem(displayItems);
		}

		// Optional sorting
		if (sortItem) {
			displayItems = sortItem(displayItems);
		}

		// Step 2: Conditionally group items if `groupByKey` is provided
		let groupedItems: { [key: string]: any[] } = {};
		let sortedGroups: string[] = [];

		if (groupByKey) {
			// Group items by the groupByKey
			groupedItems = groupItemsByVariable(displayItems, groupByKey);

			// Sort the group names alphabetically
			sortedGroups = sortGroupsAlphabetically(groupedItems);
		} else {
			// If no grouping, treat all items as a single group
			groupedItems[""] = displayItems;
			sortedGroups = [""];
		}

		return (
			<div className="gallery container mx-auto p-4">
				{/* Step 3: Loop through the sorted groups and display each section */}
				{sortedGroups.map((group: string) => (
					<section key={group}>
						{/* Conditionally render the section header if `groupByKey` is present */}
						{groupByKey && (
							<section className="relative flex items-center justify-center my-8">
								<span className="flex-grow h-px bg-gray-300"></span>
								<h3 className="px-4 text-2xl uppercase font-bold text-gray-700 dark:text-gray-200 oswald font-oswald">
									{group}
								</h3>
								<span className="flex-grow h-px bg-gray-300"></span>
							</section>
						)}

						{/* Step 4: Create a responsive grid layout for the gallery */}
						<div
							className={`grid ${gridCols} ${smGridCols} ${mdGridCols} ${lgGridCols} gap-6`}
						>
							{groupedItems[group].map((item: any, index: number) => {
								// Determine the file extension based on whether the item is animated
								const fileExtension = item[animatedKey]
									? "gif"
									: "png";

								// Build the card content (image, title, description, tags, etc.)
								const cardContent = (
									<div className="gallery-card bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
										{/* Image */}
										<div className="relative h-48">
											{item[slugKey] ? (
												<img
													// Use slug and pageKey to build the image URL
													src={`./${
														item[pageKey] || pageKey
													}/${
														item[slugKey]
													}.${fileExtension}`}
													alt={item[titleKey] || "Image"}
													className="object-cover h-full w-full"
													onError={(e) => {
														// Fallback image if the provided image URL fails
														e.currentTarget.src =
															"/path/to/placeholder-image.png"; // Replace with actual placeholder
													}}
												/>
											) : (
												// Placeholder for items without images
												<div className="h-full w-full bg-gray-200 flex items-center justify-center">
													<FaImage className="text-4xl text-gray-400" />
													<span className="text-gray-400 text-lg mt-2">
														Image Not Available
													</span>
												</div>
											)}
										</div>

										{/* Details */}
										<div className="p-4">
											<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
												{item[titleKey] || "Untitled"}
											</h3>
											{item[descriptionKey] && (
												<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
													{item[descriptionKey]}
												</p>
											)}

											{/* Tags */}
											{item[tagsKey] && (
												<div className="mt-4 flex flex-wrap gap-2">
													<Tags tags={item[tagsKey]} />
												</div>
											)}

											{/* City & State */}
											{item[cityStateKey] && (
												<p className="mt-4 text-sm text-gray-500">
													{item[cityStateKey]}
												</p>
											)}

											{/* URL */}
											{item[urlKey] && (
												<p className="mt-4 text-sm text-blue-600">
													<a
														href={item[urlKey]}
														target="_blank"
														rel="noopener noreferrer"
													>
														{item[urlKey]}
													</a>
												</p>
											)}
										</div>
									</div>
								);

								// If `linkKey` is provided, wrap the card content in a link; otherwise, return the card content
								return item[linkKey] ? (
									<a
										href={item[linkKey]}
										target="_blank"
										rel="noopener noreferrer"
										key={index}
										className="block"
									>
										{cardContent}
									</a>
								) : (
									<div key={index}>{cardContent}</div>
								);
							})}
						</div>
					</section>
				))}
			</div>
		);
	};

	export default Gallery;
