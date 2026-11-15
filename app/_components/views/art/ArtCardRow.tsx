import React from "react";
import Image from "next/image";
import Link from "next/link";

export type ArtItem = {
	id: string;
	slug?: string;
	title?: string;
	url?: string;
	image?: string;
	animated?: boolean;
};

type ArtCardRowProps = {
	items: ArtItem[];
	/** Folder under /public/art for this collection. Empty for the CSS collection, which sits at /public/art/<slug>. */
	folder?: string;
};

// Horizontal-scroll row of artwork, same scroll behaviour as the home page builds.
const ArtCardRow: React.FC<ArtCardRowProps> = ({ items, folder = "" }) => (
	<div className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
		<div className="flex gap-4 snap-x snap-mandatory">
			{items.map((item) => {
				const ext = item.animated ? "gif" : "png";
				const local = item.slug
					? `/art/${folder ? `${folder}/` : ""}${item.slug}.${ext}`
					: "";
				const src = local || item.image || "";
				const href = item.url && item.url !== "#" ? item.url : "";
				const isExternal = /^https?:\/\//i.test(href);

				const card = (
					<article className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700">
						<div className="relative aspect-[4/3] w-full bg-gray-200 dark:bg-gray-700">
							{src && (
								<Image
									src={src}
									alt={item.title || "Artwork"}
									fill
									sizes="(max-width: 640px) 208px, 256px"
									quality={70}
									loading="lazy"
									className="object-cover"
								/>
							)}
						</div>
						<div className="p-3">
							<h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
								{item.title || "Untitled"}
							</h3>
						</div>
					</article>
				);

				return (
					<div key={item.id} className="snap-start w-[13rem] sm:w-[16rem] shrink-0 group">
						{!href ? (
							card
						) : isExternal ? (
							<a href={href} target="_blank" rel="noopener noreferrer" className="block">
								{card}
							</a>
						) : (
							<Link href={href} className="block">
								{card}
							</Link>
						)}
					</div>
				);
			})}
		</div>
	</div>
);

export default ArtCardRow;
