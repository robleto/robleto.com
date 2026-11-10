import React from "react";
import Image from "next/image";
import SocialLinks from "@/app/_components/views/common/SocialLinks";

type ProfileHeroProps = {
	blurb: React.ReactNode;
	subline?: React.ReactNode;
	email?: string;
	/** Show the email link and social icons (homepage); off where a page has its own CTA */
	showContact?: boolean;
};

/**
 * Photo + name + blurb + contact header. Shared by the homepage and the
 * portfolio page so both open with the same identity block.
 */
export default function ProfileHero({
	blurb,
	subline,
	email = "hello@robleto.com",
	showContact = true,
}: ProfileHeroProps) {
	return (
		<div
			className={`flex flex-col align-left relative justify-center mx-auto pt-16 pb-10 mb-2 border-b border-gray-100 dark:border-gray-800 transition-all duration-300 ${
				showContact ? "min-h-[22rem]" : ""
			}`}
		>
			<div className="flex items-center">
				<Image
					src="/_brand/greg-ai.jpg"
					alt="Greg Robleto"
					width={80}
					height={80}
					className="rounded-full mr-5"
					priority
				/>
				<h1 className="relative flex items-center">
					<span className="text-2xl md:text-3xl font-bold uppercase tracking-[.25rem] text-gray-800 dark:text-gray-200">
						Greg Robleto
					</span>
				</h1>
			</div>
			<p className="relative font-medium text-base md:text-lg mt-4 pr-[30%] md:pr-[20%] leading-relaxed text-gray-700 dark:text-gray-300">
				{blurb}
			</p>
			{subline ? (
				<p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
					{subline}
				</p>
			) : null}
			{showContact ? (
				<>
					<a
						href={`mailto:${email}`}
						className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-link dark:text-lightlink hover:underline underline-offset-4"
					>
						{email}
						<span aria-hidden="true">→</span>
					</a>
					<SocialLinks className="mt-4 z-10" />
				</>
			) : null}
		</div>
	);
}
