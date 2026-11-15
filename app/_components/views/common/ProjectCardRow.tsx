import React from "react";
import Image from "next/image";
import Link from "next/link";

// Horizontal-scroll row of project cards (Featured Apps, Featured Sites)
const ProjectCardRow = ({ items }: { items: any[] }) => (
	<div className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
		<div className="flex gap-4 snap-x snap-mandatory">
			{items.map((item: any) => {
				// No URL: render the card unlinked (there is no /projects/[slug] route)
				let href = item.url && item.url !== "#" ? item.url : "";

				if (href && /^www\./i.test(href)) {
					href = `https://${href}`;
				}

				// Prefer the local image: Notion file URLs are presigned and expire
				// after ~1h, which breaks on statically cached pages.
				const imageSrc = (item.slug ? `/projects/${item.slug}.png` : "") || item.image || "";
				const isExternal = /^https?:\/\//i.test(href);

				const card = (
					<article className="motion-card h-[18.5rem] rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg group-hover:shadow-xl border border-gray-100 dark:border-gray-700">
						<div className="h-32 w-full bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
							{imageSrc ? (
								<Image
									src={imageSrc}
									alt={item.title || "Project image"}
									fill
									sizes="(max-width: 640px) 240px, 256px"
									quality={60}
									loading="lazy"
									className="motion-card-media object-cover"
								/>
							) : (
								<div className="h-full w-full" />
							)}
						</div>
						<div className="h-[10.5rem] p-3.5 flex flex-col">
							<h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 min-h-[2.5rem]">
								{item.title || "Untitled"}
							</h3>
							<p className="mt-1.5 text-xs text-gray-600 dark:text-gray-400 line-clamp-5 min-h-[5rem]">
								{item.description || ""}
							</p>
						</div>
					</article>
				);

				return (
					<div key={item.id} className="snap-start w-[13rem] sm:w-[16rem] shrink-0 group">
						{!href ? (
							card
						) : isExternal ? (
							<a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
								{card}
							</a>
						) : (
							<Link href={href} className="block h-full">
								{card}
							</Link>
						)}
					</div>
				);
			})}
		</div>
	</div>
);

export default ProjectCardRow;
