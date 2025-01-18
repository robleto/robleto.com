import React from "react";
import { socialLinks } from "./SocialLinks";

type SocialCardsProps = {
	className?: string; // Optional className for custom styling
	iconClassName?: string; // Custom className for styling the individual icons
};

const SocialCards: React.FC<SocialCardsProps> = ({ className, iconClassName }) => {
	return (
		<div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 ${className}`}>
			{socialLinks.map((social) => (
				<a
					key={social.name}
					href={social.url}
					target="_blank"
					rel="noopener noreferrer"
					className="social-card flex flex-col items-center justify-center border border-gray-300 dark:border-gray-700 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
					aria-label={social.name}
				>
					{/* Icon inside a white circle */}
					<div className="social-card-icon flex my-2 items-center justify-center">
						<div className={`text-2xl text-gray-400 group-hover:${
							social.color
						} transition-colors ${iconClassName || ""} dark:group-hover:text-white`}
          >
							{social.icon}
						</div>
					</div>

					{/* Social name */}
					<div className="social-card-text my-2 text-center">
						<span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
							{social.name}
						</span>
					</div>
				</a>
			))}
		</div>
	);
};

export default SocialCards;
