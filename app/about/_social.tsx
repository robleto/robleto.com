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
	FaFacebook,
	FaMastodon,
} from "react-icons/fa"; // Import from react-icons

type SocialModalProps = {
	onClose: () => void; // Function to close the modal
};

const socialLinks = [
	{
		name: "LinkedIn",
		icon: <FaLinkedin className="text-blue-600" />, // LinkedIn color
		url: "https://linkedin.com/in/robleto",
	},
	{
		name: "CodePen",
		icon: <FaCodepen className="text-black" />, // CodePen color
		url: "https://codepen.io/robleto",
	},
	{
		name: "Dribbble",
		icon: <FaDribbble className="text-pink-500" />, // Dribbble color
		url: "https://dribbble.com/robleto",
	},
	{
		name: "GitHub",
		icon: <FaGithub className="text-gray-900" />, // GitHub color
		url: "https://github.com/robleto",
	},
	{
		name: "Twitter",
		icon: <FaTwitter className="text-blue-400" />, // Twitter color
		url: "https://twitter.com/robleto",
	},
	{
		name: "Instagram",
		icon: <FaInstagram className="text-purple-500" />, // Instagram color
		url: "https://instagram.com/grobleto",
	},
	{
		name: "Pinterest",
		icon: <FaPinterest className="text-red-600" />, // Pinterest color
		url: "https://pinterest.com/robleto",
	},
	{
		name: "YouTube",
		icon: <FaYoutube className="text-red-600" />, // YouTube color
		url: "https://youtube.com/gregrobleto",
	},
];

const SocialModal: React.FC<SocialModalProps> = ({ onClose }) => {
	return (
		<div className="p-6">
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
				{/* Loop over social links to generate the buttons */}
				{socialLinks.map((social) => (
					<a
						key={social.name}
						href={social.url}
						target="_blank"
						rel="noopener noreferrer"
						className="social-card flex flex-col items-center justify-center border border-gray-300 dark:border-gray-700 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
					>
						{/* Icon inside a white circle */}
						<div className="social-card-icon flex my-2 items-center justify-center">
							<div className="text-4xl bg-white p-2 rounded-full">
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
		</div>
	);
};

export default SocialModal;
