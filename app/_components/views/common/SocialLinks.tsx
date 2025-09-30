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
} from "react-icons/fa";

type SocialLink = {
	name: string;
	icon: React.ReactElement;
	url: string;
	color: string; // Tailwind color class for hover state
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
];

type SocialLinksProps = {
	className?: string; // Custom className for styling the wrapper
	iconClassName?: string; // Custom className for styling the individual icons
	center?: boolean; // New prop to control alignment
};

const SocialLinks: React.FC<SocialLinksProps> = ({
	className,
	iconClassName,
	center = false, // Default alignment is not centered
}) => {
	return (
		<div
			className={`flex space-x-4 ${
				center ? "justify-center" : "justify-start"
			} ${className || ""}`}
		>
			{socialLinks.map((social) => (
				<a
					key={social.name}
					href={social.url}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={social.name}
					className={`group transition-transform transform hover:scale-110`}
				>
					{/* Icon */}
					<div
						className={`text-2xl text-gray-400 group-hover:${
							social.color
						} transition-colors ${
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
