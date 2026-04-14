import React from "react";

type GroupTitleProps = {
	title: string;
	subtitle?: string;
	/** "centered" (default): horizontal rules + centered caps — for featured/primary sections.
	 *  "left": minimal left-aligned label — for secondary/supplementary sections. */
	variant?: "centered" | "left";
};

const GroupTitle: React.FC<GroupTitleProps> = ({
	title,
	subtitle,
	variant = "centered",
}) => {
	if (variant === "left") {
		return (
			<div className="mb-4 mt-10">
				<h3 className="text-xs tracking-[.25em] uppercase font-semibold text-gray-400 dark:text-gray-500">
					{title}
				</h3>
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
				<h3 className="px-4 text-lg tracking-[.25em] uppercase font-semibold text-gray-500 dark:text-gray-200">
					{title}
				</h3>
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
