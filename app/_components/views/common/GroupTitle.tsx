import React from "react";

type GroupTitleProps = {
	title: string;
};

const GroupTitle: React.FC<GroupTitleProps> = ({ title }) => {
	return (
		<section className="relative flex items-center justify-center my-8">
			<span className="flex-grow h-px bg-gray-300"></span>
			<h3 className="px-4 text-lg tracking-[.25em] uppercase font-semibold  text-gray-500 dark:text-gray-200">
				{title}
			</h3>
			<span className="flex-grow h-px bg-gray-300"></span>
		</section>
	);
};

export default GroupTitle;
