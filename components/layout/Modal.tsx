import React from "react";

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
	if (!isOpen) return null; // Do not render if modal is not open

	return (
		<div className="fixed inset-0 z-[1000] flex items-center justify-center">
			{/* Backdrop with lower opacity */}
			<div
				className="absolute inset-0 bg-black bg-opacity-70"
				onClick={onClose} // Close the modal if clicked outside
			></div>

			{/* Modal Content */}
			<div
				className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-[90%] max-w-lg"
				onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
			>
				{/* Close button with the SVG icon */}
				<button
					onClick={onClose}
					className="absolute top-2 right-2"
				>
					<img
						src="/_icons/close.svg" // Make sure the path is correct
						alt="Close"
						className="h-6 w-6 mr-2 mt-2 svg-icon opacity-50 hover:opacity-100"
					/>
				</button>

				{/* Modal title */}
				<h1 className="text-4xl text-center py-4 tracking-tight font-semibold font-oswald text-gray-800 dark:text-gray-200">
					{title}
				</h1>

				{/* Modal body */}
				<div>{children}</div>
			</div>
		</div>
	);
};

export default Modal;
