import React from "react";
import type { Metadata } from "next";
import Logo from "./_components/layout/sidebar/Logo";
import SideNav from "./_components/layout/sidebar/SideNav"; // Import SideNav
import Footer from "./_components/layout/chrome/Footer"; // Import Footer
import { ThemeProvider } from "next-themes"; // Import ThemeProvider for theme switching
import "./_style/globals.css"; // Import global styles


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
				className="antialiased bg-background dark:bg-dark_background">
				{/* Wrapping the app in ThemeProvider for theme toggling */}
				<ThemeProvider attribute="class" defaultTheme="system">
					<div className="flex flex-col min-h-screen">
						{/* SideNav is collapsed by default on mobile and expanded on larger screens */}
						<SideNav />
						{/* Main content */}
						<main className="flex-grow max-w-screen-xl pr-[5%] pl-[20%]  md:pl-[25%] lg:w-auto mx-auto transition-all duration-300  dark:text-white">
							{children}
						</main>
						{/* Footer */}
						<Footer />
					</div>
				</ThemeProvider>
		</body>
		</html>
	);
}
