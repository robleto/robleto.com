"use client"; // This makes the component a Client Component

import React from "react";

// Function to extract initials from the name
const getInitials = (name: string) => {
	const nameParts = name.split(" ");
	if (nameParts.length > 1) {
		return nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase();
	}
	return nameParts[0][0].toUpperCase();
};

// ProfileImage component to handle displaying image or initials
const ProfileImage = ({ src, alt }: { src: string; alt: string }) => {
	// Handle fallback to initials if the image fails to load
	const handleImageError = (
		e: React.SyntheticEvent<HTMLImageElement, Event>
	) => {
		console.error("Image failed to load:", e.currentTarget.src);
		e.currentTarget.src = ""; // Clear the image source to prevent further errors
		e.currentTarget.onerror = null; // Prevent infinite loop
		e.currentTarget.closest("div")!.textContent = getInitials(alt); // Set the initials in the image container
	};

	return (
		<div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold">
			<img
				src={src}
				alt={alt}
				onError={handleImageError}
				className="object-cover h-full w-full rounded-full"
			/>
		</div>
	);
};

export default ProfileImage;
