import React from "react";

type ContactModalProps = {
	onClose: () => void; // Function to close the modal
};

const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
	// Function to copy email to clipboard
	const handleCopyEmail = () => {
		navigator.clipboard.writeText("hello@robleto.com");
		alert("Email address copied!");
	};

	const handleComposeEmail = () => {
		window.location.href = "mailto:hello@robleto.com";
	};

	const handleBookMentoring = () => {
		window.open("https://topmate.io/robleto", "_blank");
	};

	const handleSupport = () => {
		window.open("https://buymeacoffee.com/robleto", "_blank");
	};

	return (
			<div className="grid grid-cols-2 z-40 gap-4 p-6">
				{/* Email Section */}
				<div>
					<h3 className="text-lg font-bold">Email</h3>
					<p className="text-sm">hello@robleto.com</p>
				</div>
				<div className="flex items-center justify-end space-x-3">
					<button
						onClick={handleComposeEmail}
						className="inline-flex items-center justify-center text-sm border border-gray-600 text-gray-600 dark:text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-600 hover:text-white transition-colors"
					>
						Compose
					</button>
					<button
						onClick={handleCopyEmail}
						className="inline-flex items-center justify-center text-sm border border-gray-600 text-gray-600 dark:text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-600 hover:text-white transition-colors"
					>
						Copy
					</button>
				</div>

				{/* Break Line */}
				<hr className="col-span-2 my-4" />

				{/* Let's Chat Section */}
				<div>
					<h3 className="text-lg font-bold">Let's chat</h3>
					<p className="text-sm">
						Sometimes face-time is better
					</p>
				</div>
				<div className="flex items-center justify-end space-x-4">
					<button
						onClick={handleBookMentoring}
						className="inline-flex items-center justify-center text-sm border border-gray-600 text-gray-600 dark:text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-600 hover:text-white transition-colors"
					>
						Book
					</button>
				</div>

				{/* Break Line */}
				<hr className="col-span-2 my-4" />

				{/* Buy Me a Coffee Section */}
				<div>
					<h3 className="text-lg font-bold">Buy me a Coffee</h3>
					<p className="text-sm">Always grateful for the boost.</p>
				</div>
				<div className="flex items-center justify-end space-x-4">
					<button
						onClick={handleSupport}
						className="inline-flex items-center justify-center text-sm border border-gray-600 text-gray-600 dark:text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-600 hover:text-white transition-colors"
					>
						Support
					</button>
				</div>
			</div>
	);
};

export default ContactModal;
