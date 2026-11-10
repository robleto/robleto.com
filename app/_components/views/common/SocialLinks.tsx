import React from "react";
import {
	FaLinkedin,
	FaCodepen,
	FaDribbble,
	FaGithub,
	FaTwitter,
	FaInstagram,
	FaPinterest,
	FaYoutube,
	FaMedium,
} from "react-icons/fa";

type SocialLink = {
	name: string;
	icon: React.ReactElement;
	url: string;
	color: string; // Tailwind color class for hover state
	hiddenByDefault?: boolean; // Only rendered when requested via `only`
};

export const socialLinks: SocialLink[] = [
	{
		name: "LinkedIn",
		icon: <FaLinkedin />,
		url: "https://linkedin.com/in/robleto",
		color: "text-blue-600",
	},
	{
		name: "CodePen",
		icon: <FaCodepen />,
		url: "https://codepen.io/robleto",
		color: "text-black",
	},
	{
		name: "Dribbble",
		icon: <FaDribbble />,
		url: "https://dribbble.com/robleto",
		color: "text-pink-500",
	},
	{
		name: "GitHub",
		icon: <FaGithub />,
		url: "https://github.com/robleto",
		color: "text-gray-900",
	},
	{
		name: "Twitter",
		icon: <FaTwitter />,
		url: "https://twitter.com/robleto",
		color: "text-blue-400",
	},
	{
		name: "Instagram",
		icon: <FaInstagram />,
		url: "https://instagram.com/grobleto",
		color: "text-purple-500",
	},
	{
		name: "Pinterest",
		icon: <FaPinterest />,
		url: "https://pinterest.com/robleto",
		color: "text-red-600",
	},
	{
		name: "YouTube",
		icon: <FaYoutube />,
		url: "https://youtube.com/gregrobleto",
		color: "text-red-600",
	},
	{
		name: "Medium",
		icon: <FaMedium />,
		url: "https://robleto.medium.com",
		color: "text-black",
		hiddenByDefault: true,
	},
];

type SocialLinksProps = {
	className?: string; // Custom className for styling the wrapper
	iconClassName?: string; // Custom className for styling the individual icons
	center?: boolean; // New prop to control alignment
	only?: string[]; // Render just these links, in this order (by name)
};

const SocialLinks: React.FC<SocialLinksProps> = ({
	className,
	iconClassName,
	center = false, // Default alignment is not centered
	only,
}) => {
	const links = only
		? only
				.map((name) => socialLinks.find((social) => social.name === name))
				.filter((social): social is SocialLink => Boolean(social))
		: socialLinks.filter((social) => !social.hiddenByDefault);

	return (
		<div
			className={`flex flex-wrap gap-4 ${
				center ? "justify-center" : "justify-start"
			} ${className || ""}`}
		>
			{links.map((social) => (
				<a
					key={social.name}
					href={social.url}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={social.name}
					className="group rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
				>
					{/* Icon — color shift on hover, no transform. Stays consistent
					    with the site's "fast color, no jump" motion language. */}
					<div
						className={`text-2xl text-gray-400 group-hover:${
							social.color
						} transition-colors duration-200 ${
							iconClassName || ""
						} dark:group-hover:text-white`}
					>
						{social.icon}
					</div>
				</a>
			))}
		</div>
	);
};

export default SocialLinks;
