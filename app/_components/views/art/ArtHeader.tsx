import React from "react";

type ArtHeaderProps = {
	title: string;
	icon: string;
	children: React.ReactNode;
};

// Header for the Art section. Same spacing and type as PageHeader on Projects,
// with the copy kept in code so each collection can state its own reason for existing.
const ArtHeader: React.FC<ArtHeaderProps> = ({ title, icon, children }) => (
	<div className="flex flex-col z-10 lg:w-auto align-left justify-center relative mx-auto py-25 transition-all duration-300 min-h-[25rem]">
		<h1 className="text-xl relative md:text-2xl font-medium uppercase tracking-[.25rem] text-gray-800 dark:text-gray-200 flex items-center">
			<img src={`/_icons/${icon}.svg`} alt="" className="h-10 w-10 svg-icon mr-2" />
			{title}
		</h1>
		<section className="relative font-medium text-md md:text-lg mx-auto mt-0 md:pr-[30%] leading-5 md:leading-6 text-gray-800 dark:text-gray-200 space-y-3">
			{children}
		</section>
	</div>
);

export default ArtHeader;
