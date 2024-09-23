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
				{/* Close button */}
				<button
					onClick={onClose}
					className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
				>
					X
				</button>

				{/* Modal title */}
				<h2 className="text-2xl font-bold mb-4">{title}</h2>

				{/* Modal body */}
				<div>{children}</div>
			</div>
		</div>
	);
};

export default Modal;
