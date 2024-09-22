import type { Metadata } from "next";
import "./globals.css"; // Import Page Title
import SideNav from "../components/sidebar/SideNav";
import { Nunito_Sans, Oswald, Libre_Bodoni } from "next/font/google";
import { ThemeProvider } from "next-themes"; // Import ThemeProvider for theme switching


// Import Libri Bodini for the sub head text
const libreBodoni = Libre_Bodoni({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"], // Select appropriate weights
	variable: "--font-libre-bodoni", // CSS variable for subheads
});

// Import Nunito Sans for the body text
const nunitoSans = Nunito_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-nunito-sans", // CSS variable to use with Tailwind
});

// Import Oswald for the headline text
const oswald = Oswald({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"], // Select appropriate weights
	variable: "--font-oswald", // CSS variable for headlines
});

export const metadata: Metadata = {
	title: "Greg Robleto | Greg Robleto – Design / Marketing / Product / Technology ",
	description:
		"Greg Robleto is a creative leader versed in design, marketing, product, branding and technology. He has a passion for creating experiences that make an impact in people's lives and tinkering with things that make the web just a bit more fun.",
};

export default function RootLayout({
	children,
	title, // Add title prop to the layout
}: {
	children: React.ReactNode;
	title: string; // Define title prop type as a string
}) {
	return (
		<html lang="en">
			<head></head>
			<body
				className={`${nunitoSans.variable} ${oswald.variable} antialiased bg-background dark:bg-dark_background`}
			>
				{/* Wrapping the app in ThemeProvider for theme toggling */}
				<ThemeProvider attribute="class" defaultTheme="system">
					<div className="flex min-h-screen">
						{/* Sidebar - Takes up a dynamic space */}
						<SideNav />

							{/* Main content - Flex-grow ensures it fills the remaining space */}
							<main className="flex-grow max-w-screen-lg pl-[200px] mx-auto p-8 transition-all duration-300 dark:text-white">
								{children}
							</main>
						</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
