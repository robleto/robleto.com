import React from "react";
import type { Metadata } from "next";
import "./globals.css"; // Import global styles
import SideNav from "../components/sidebar/SideNav"; // Import SideNav
import { Nunito_Sans, Oswald, Libre_Bodoni } from "next/font/google";
import { ThemeProvider } from "next-themes"; // Import ThemeProvider for theme switching

// Import fonts...
const libreBodoni = Libre_Bodoni({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-libre-bodoni",
});

const nunitoSans = Nunito_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-nunito-sans",
});

const oswald = Oswald({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-oswald",
});

export const metadata: Metadata = {
	title: "Greg Robleto | Greg Robleto – Design / Marketing / Product / Technology ",
	description:
		"Greg Robleto is a creative leader versed in design, marketing, product, branding, and technology. He has a passion for creating experiences that make an impact in people's lives and tinkering with things that make the web just a bit more fun.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head></head>
			<body
				className={`${nunitoSans.variable} ${oswald.variable} ${libreBodoni.variable} antialiased bg-background dark:bg-dark_background`}
			>
				{/* Wrapping the app in ThemeProvider for theme toggling */}
				<ThemeProvider attribute="class" defaultTheme="system">
					<div className="flex min-h-screen">
						{/* SideNav is collapsed by default on mobile and expanded on larger screens */}
						<SideNav />
						{/* Main content */}
						<main className="flex-grow max-w-screen-lg pl-[20%] w-[80%] md:pl-[25%] lg:w-auto mx-auto p-8 transition-all duration-300 dark:text-white">
							{children}
						</main>
						
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
