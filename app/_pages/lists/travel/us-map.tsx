"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import USMapSVG from "./USMapSVG";
import stateDates from "./statesVisited.json"; // Import the JSON

const USMap = () => {
	useEffect(() => {
		stateDates.forEach((stateData, index) => {
			const stateElement = document.getElementById(stateData.state);

			if (stateElement) {
				gsap.to(stateElement, {
					fill: "#3E7075",
					duration: 1,
					delay: index * 0.5,
				});

				// Directly set the date text content without animating
				const dateElement = document.getElementById("dateDisplay");
				setTimeout(() => {
					if (dateElement) {
						dateElement.textContent = stateData.date;
					}
				}, index * 500); // Delay in milliseconds (index * 0.5 seconds)
			}
		});
	}, []);

	return (
		<div className="us-map-container relative">
			<USMapSVG />

			<div
				id="dateDisplay"
				className="date-display text-oracle text-2xl  md:text-4xl absolute font-semibold right-[27%] mb-[-12px] bottom-[10%]"
			>
				1976
			</div>
		</div>
	);
};

export default USMap;
