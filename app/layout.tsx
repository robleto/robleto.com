import React from "react";
import type { Metadata } from "next";
import { Nunito_Sans, Oswald, Libre_Bodoni, Source_Serif_4 } from "next/font/google";
import SideNav from "./_components/layout/sidebar/SideNav";
import Footer from "./_components/layout/chrome/Footer";
import ErrorBoundary from "./_components/common/ErrorBoundary";
import { ThemeProvider } from "next-themes";
import "./_style/globals.css";

// Self-hosted via next/font — eliminates render-blocking @import
// 800 added for the article title's extrabold weight; 400/600/700 are the body/UI workhorses.
const nunitoSans = Nunito_Sans({
	subsets: ["latin"],
	weight: ["400", "600", "700", "800"],
	display: "swap",
	variable: "--font-nunito-sans",
});

const oswald = Oswald({
	subsets: ["latin"],
	weight: ["400", "700"],
	display: "swap",
	variable: "--font-oswald",
});

const libreBodoni = Libre_Bodoni({
	subsets: ["latin"],
	weight: ["400", "700"],
	display: "swap",
	variable: "--font-bodoni",
});

// Body serif for long-form reading on /posts/[slug]. Used only inside the
// article content; the rest of the site stays in Nunito Sans.
const sourceSerif = Source_Serif_4({
	subsets: ["latin"],
	weight: ["400", "600"],
	style: ["normal", "italic"],
	display: "swap",
	variable: "--font-source-serif",
});

export const metadata: Metadata = {
	title: "Greg Robleto – Design / Marketing / Product / Technology",
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
		<html
			lang="en"
			suppressHydrationWarning
			className={`${nunitoSans.variable} ${oswald.variable} ${libreBodoni.variable} ${sourceSerif.variable}`}
		>
			<head></head>
			<body className="font-sans overflow-x-hidden antialiased bg-background dark:bg-dark_background">
				<ThemeProvider attribute="class" defaultTheme="system">
					<ErrorBoundary>
						<div className="flex flex-col min-h-screen">
							<SideNav />
							<main className="flex-grow w-full max-w-screen-xl mx-auto pr-4 pl-24 sm:pr-6 sm:pl-28 md:pr-[5%] md:pl-56 lg:pl-60 transition-all duration-300 dark:text-white">
								<ErrorBoundary>
									{children}
								</ErrorBoundary>
							</main>
							<Footer />
						</div>
					</ErrorBoundary>
				</ThemeProvider>
			</body>
		</html>
	);
}
