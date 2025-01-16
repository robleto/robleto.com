"use client";

import React, { useState } from "react";
import Link from "next/link";

const TopNav: React.FC = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<nav className="bg-transparent fixed w-full top-0 z-50">
			<div className="flex items-center justify-between md:justify-center max-w-7xl mx-auto p-4">
				{/* Logo for mobile (visible only on small screens) */}
				<div className="md:hidden flex items-center">
					<img
						src="/_brand/gr-white.svg"
						alt="Logo"
						className="h-12"
					/>
				</div>

				{/* Left nav items (hidden on small screens) */}
				<div className="hidden md:flex space-x-8 font-oswald uppercase text-slate-200 text-base md:text-lg lg:text-xl tracking-wider">
					<Link
						href="/portfolio"
						className="hover:scale-105 transition-transform"
					>
						PORTFOLIO
					</Link>
					<Link
						href="/designs"
						className="hover:scale-105 transition-transform"
					>
						DESIGNS
					</Link>
					<Link
						href="/resources"
						className="hover:scale-105 transition-transform"
					>
						RESOURCES
					</Link>
				</div>

				{/* Centered logo for larger screens */}
				<div className="hidden md:flex md:mx-10">
					<img
						src="/_brand/gr-white.svg"
						alt="Logo"
						className="h-12 md:h-14 lg:h-16"
					/>
				</div>

				{/* Right nav items (hidden on small screens) */}
				<div className="hidden md:flex space-x-8 font-oswald uppercase text-slate-200 text-base md:text-lg lg:text-xl tracking-wider">
					<Link
						href="/collections"
						className="hover:scale-105 transition-transform"
					>
						COLLECTIONS
					</Link>
					<Link
						href="/about"
						className="hover:scale-105 transition-transform"
					>
						ABOUT
					</Link>
					<Link
						href="/contact"
						className="hover:scale-105 transition-transform"
					>
						CONTACT
					</Link>
				</div>

				{/* Hamburger menu for mobile */}
				<div className="md:hidden flex items-center">
					<button
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="text-slate-200 focus:outline-none"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
				</div>
			</div>

			{/* Mobile menu */}
			{isMobileMenuOpen && (
				<div className="absolute top-16 right-0 w-full bg-black bg-opacity-90 flex flex-col items-center space-y-4 py-6 text-slate-200 font-oswald uppercase tracking-wider">
					<Link
						href="/portfolio"
						onClick={() => setIsMobileMenuOpen(false)}
					>
						PORTFOLIO
					</Link>
					<Link
						href="/designs"
						onClick={() => setIsMobileMenuOpen(false)}
					>
						DESIGNS
					</Link>
					<Link
						href="/resources"
						onClick={() => setIsMobileMenuOpen(false)}
					>
						RESOURCES
					</Link>
					<Link
						href="/collections"
						onClick={() => setIsMobileMenuOpen(false)}
					>
						COLLECTIONS
					</Link>
					<Link
						href="/about"
						onClick={() => setIsMobileMenuOpen(false)}
					>
						ABOUT
					</Link>
					<Link
						href="/contact"
						onClick={() => setIsMobileMenuOpen(false)}
					>
						CONTACT
					</Link>
				</div>
			)}
		</nav>
	);
};

export default TopNav;
