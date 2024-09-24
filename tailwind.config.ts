import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: "class", // Enable class-based dark mode
	theme: {
		extend: {
			colors: {
				background: "#F5F7FB", // Light mode background
				foreground: "#2d333b", // Dark mode background

				ferra: "#714950", //Dark purple
				valencia: "#DA3832", //Red
				iron: "#D9D9D9", //Light grey
				mercury: "#e9ecf2", //Light blue
				nobel: "#B6B6B6", //Mid grey
				emperor: "#524C49", //Dark grey
				oracle: "#3E7075", //Dark teal
				gunpowder: "#49495C", //Dark blue
				whisper: "#F2F2F6", //Very Light grey
				gravel: "#42414D", //Darker grey
				sapling: "#E6DFA7", //Light yellow
				strikemaster: "#956387", //Light purple
				blossom: "#D6A7B8", //Light pink
				asphalt: "#4A4A4A", //Dark grey
				spindle: "#A3C1DA",	//Light blue
				
			},
			fontFamily: {
				nunito: ["var(--font-nunito-sans)", "sans-serif"],
				oswald: ["var(--font-oswald)", "sans-serif"],
				bodoni: ["var(--font-libre-bodoni)", "sans-serif"],
			},
		},
	},
	plugins: [],
};

export default config;
