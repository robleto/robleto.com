import React from "react";
import type { Metadata } from "next";
import SideNav from "./_components/layout/sidebar/SideNav"; // Import SideNav
import Footer from "./_components/layout/chrome/Footer"; // Import Footer
import ErrorBoundary from "./_components/common/ErrorBoundary"; // Import ErrorBoundary
import { ThemeProvider } from "next-themes"; // Import ThemeProvider for theme switching
import "./_style/globals.css"; // Import global styles

export const metadata: Metadata = {
	title: "Greg Robleto | Greg Robleto – Design / Marketing / Product / Technology ",
	description:
		"Greg Robleto is a creative leader versed in design, marketing, product, branding, and technology. He has a passion for creating experiences that make an impact in people's lives and tinkering with things that make the web just a bit more fun.",
	other: {
		"p:domain_verify": "b260cb5b2397df3960113f71292e7176",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head></head>
			<body className="overflow-x-hidden antialiased bg-background dark:bg-dark_background">
				{/* Wrapping the app in ThemeProvider for theme toggling */}
				<ThemeProvider attribute="class" defaultTheme="system">
					<ErrorBoundary>
						<div className="flex flex-col min-h-screen">
							{/* SideNav is collapsed by default on mobile and expanded on larger screens */}
							<SideNav />
							{/* Main content */}
							<main className="flex-grow w-full max-w-screen-xl mx-auto pr-4 pl-24 sm:pr-6 sm:pl-28 md:pr-[5%] md:pl-56 lg:pl-60 transition-all duration-300 dark:text-white">
								<ErrorBoundary>
									{children}
								</ErrorBoundary>
							</main>
							{/* Footer */}
							<Footer />
						</div>
					</ErrorBoundary>
				</ThemeProvider>
			</body>
		</html>
	);
}
