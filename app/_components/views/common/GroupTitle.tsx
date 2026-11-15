import React from "react";

type GroupTitleProps = {
	title: string;
	subtitle?: string;
	/** "centered" (default): horizontal rules + centered caps — for featured/primary sections.
	 *  "left": minimal left-aligned label — for secondary/supplementary sections. */
	variant?: "centered" | "left";
	/** Semantic heading level depends on the page's heading hierarchy. */
	as?: "h2" | "h3";
};

const GroupTitle: React.FC<GroupTitleProps> = ({
	title,
	subtitle,
	variant = "centered",
	as: Heading = "h3",
}) => {
	if (variant === "left") {
		return (
			<div className="mb-4 mt-10">
				<Heading className="text-xs tracking-[.25em] uppercase font-semibold text-gray-600 dark:text-gray-300">
					{title}
				</Heading>
				{subtitle && (
					<p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
						{subtitle}
					</p>
				)}
			</div>
		);
	}

	return (
		<section className="relative my-8">
			<div className="flex items-center justify-center">
				<span className="flex-grow h-px bg-gray-300 dark:bg-gray-700"></span>
				<Heading className="px-4 text-lg tracking-[.25em] uppercase font-semibold text-gray-500 dark:text-gray-200">
					{title}
				</Heading>
				<span className="flex-grow h-px bg-gray-300 dark:bg-gray-700"></span>
			</div>
			{subtitle && (
				<p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-1 italic">
					{subtitle}
				</p>
			)}
		</section>
	);
};

export default GroupTitle;
