"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config"; // Adjust the path to your tailwind.config.js

// Resolve Tailwind config to get the theme values
const fullConfig = resolveConfig(tailwindConfig);

// Extract the colors from the Tailwind theme
const colors = fullConfig.theme?.colors as unknown as {
	emperor: string;
	ferra: string;
	gunpowder: string;
	nobel: string;
	oracle: string;
	sapling: string;
	spindle: string;
	strikemaster: string;
};

const words = [
	{ text: "Creative Director", color: colors.ferra },
	{ text: "CSS Artist", color: colors.oracle },
	{ text: "Design Director", color: colors.strikemaster },
	{ text: "UI Engineer", color: colors.sapling },
	{ text: "Marketing Creative", color: colors.emperor },
	{ text: "Product Lead", color: colors.gunpowder },
	{ text: "UX Designer", color: colors.nobel },
	{ text: "Brand Strategist", color: colors.spindle },
];

const FlippingWords = () => {
	const [currentWord, setCurrentWord] = useState(words[0].text);
	const textRef = useRef<HTMLHeadingElement>(null);
	const blockRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const tl = gsap.timeline({ repeat: -1 });

		words.forEach((word) => {
			tl.to(blockRef.current, {
				backgroundColor: word.color,
				duration: 1,
				ease: "power2.inOut",
				onStart: () => {
					// Change the text when the background color animation starts
					setCurrentWord(word.text);
				},
			}).to({}, { duration: 3 }); // Pause for 3 seconds after changing text and color
		});

		return () => {
			tl.kill();
		};
	}, []);

	return (
		<div
			ref={blockRef}
			className="relative bg-ferra rounded-lg w-full mt-2 p-4 flex justify-center items-center"
		>
			{/* Left-aligned "Is a" text */}
			<span className="absolute left-4 text-white text-xs md:text-sm lg:text-base uppercase opacity-70">
				Is a
			</span>

			{/* Dynamic flipping word in the center */}
			<h2
				ref={textRef}
				className="text-whisper text-center leading-6 text-2xl md:text-4xl lg:text-5xl font-bold"
			>
				{currentWord}
			</h2>
		</div>
	);
};

export default FlippingWords;
