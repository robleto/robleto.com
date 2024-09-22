import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(useGSAP, TextPlugin);

const words = [
	"UX Designer",
	"CSS Artist",
	"Design Director",
	"Marketing Designer",
	"Product Strategist",
];

const FlippingWords = () => {
	const textRef = useRef<HTMLSpanElement>(null); // Ref for the text element
	const cursorRef = useRef<HTMLSpanElement>(null); // Ref for the cursor element

	useEffect(() => {
		const tl = gsap.timeline({ repeat: Infinity, repeatDelay: 1 }); // Timeline with infinite repeat

		words.forEach((word) => {
			// Add typing animation for each word
			tl.to(textRef.current, {
				text: word, // Use GSAP's text plugin to type the word
				duration: word.length * 0.1, // Adjust typing speed
				ease: "none", // Linear typing
				onStart: () => {
					gsap.to(cursorRef.current, { opacity: 1 });
				}, // Show cursor when typing starts
			})
				.to(cursorRef.current, {
					opacity: 0,
					ease: "none",
					duration: 0.5,
				}) // Small pause before deleting
				.to(textRef.current, {
					text: "", // Clear the text
					duration: word.length * 0.1, // Adjust delete speed
					ease: "none",
				});
		});

		// Clean up GSAP animation on component unmount
		return () => {
			tl.kill();
		};
	}, []);

	return (
		<span>
			<span ref={textRef} className="inline-block"></span>
			<span ref={cursorRef} className="blinking-cursor opacity-30 font-light text-white">
				|
			</span>
		</span>
	);
};

export default FlippingWords;
