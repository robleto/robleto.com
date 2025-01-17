import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx}", // Adjust paths based on your project
	],
	darkMode: "class", // Enable class-based dark mode
	theme: {
		extend: {
			colors: {
				background: "#F5F7FB", // Light mode background
				foreground: "#2d333b", // Dark mode background
				link: "#2B6CB0", // Blue
				lightlink: "#3182CE", // Light blue

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
				spindle: "#A3C1DA", //Light blue
				rosewater: "#f8e1e5", // Whisper Pink
				mauvewood: "#815C5C", // Ferra Mauve
				softkhaki: "#D9D5A7", // Sapling Khaki
				plumwine: "#996478", // Strikemaster Plum
				deepcharcoal: "#51414F", // Emperor Charcoal
				stormcloud: "#6D6D72", // Iron Gray
				seamist: "#B8C7CE", // Spindle Blue
				darkslate: "#363636", // Oracle Slate
				oceanblue: "#1E40AF", // Dark Blue
				goldenyellow: "#F59E0B", // Golden Yellow
				forestgreen: "#047857", // Forest Green
				purplehaze: "#6B21A8", // Purple Haze
				tropicalteal: "#14B8A6", // Tropical Teal
				firetruckred: "#EF4444", // Firetruck Red
				midnightindigo: "#4F46E5", // Midnight Indigo
				hotpink: "#EC4899", // Hot Pink
				icycyan: "#06B6D4", // Icy Cyan
				lemongrass: "#84CC16", // Lemongrass Green
			},
			fontFamily: {
				nunito: ["var(--font-nunito-sans)", "sans-serif"],
				oswald: ["var(--font-oswald)", "sans-serif"],
				bodoni: ["var(--font-libre-bodoni)", "sans-serif"],
			},
		},
	},
	plugins: [],
	safelist: [
		"group-hover:text-blue-600",
		"group-hover:text-black",
		"group-hover:text-pink-500",
		"group-hover:text-gray-900",
		"group-hover:text-blue-400",
		"group-hover:text-purple-500",
		"group-hover:text-red-600",
	],
};

export default config;
