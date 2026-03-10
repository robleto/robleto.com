import React from "react";

type GroupTitleProps = {
	title: string;
	subtitle?: string;
};

const GroupTitle: React.FC<GroupTitleProps> = ({ title, subtitle }) => {
	return (
		<section className="relative my-8">
			<div className="flex items-center justify-center">
				<span className="flex-grow h-px bg-gray-300"></span>
				<h3 className="px-4 text-lg tracking-[.25em] uppercase font-semibold  text-gray-500 dark:text-gray-200">
					{title}
				</h3>
				<span className="flex-grow h-px bg-gray-300"></span>
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
