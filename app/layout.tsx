import React from "react";
import type { Metadata } from "next";
import TopNav from "./components/TopNav"; // Import TopNav component
import "./globals.css"; // Import global styles
import { Nunito_Sans, Oswald, Libre_Bodoni, Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const oswald = Oswald({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Greg Robleto | Greg Robleto - Design / Marketing / Product / Technology ",
	description:
		"Greg Robleto is a creative leader versed in design, marketing, product, branding, and technology. He has a passion for creating experiences that make an impact in people's lives and tinkering with things that make the web just a bit more fun.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${oswald.className} ${inter.className}`}>

				<TopNav />
				{children}
			</body>
		</html>
	);
}
