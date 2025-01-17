import React from "react";
import SocialCards from "@/app/_components/views/common/SocialCards";

type SocialModalProps = {
	onClose: () => void;
};

const SocialModal: React.FC<SocialModalProps> = ({ onClose }) => {
	return (
		<div className="p-6 z-50">
			<SocialCards />
			<button
				onClick={onClose}
				className="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
			>
				Close
			</button>
		</div>
	);
};

export default SocialModal;
