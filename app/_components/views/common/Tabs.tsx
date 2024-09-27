import React from "react";
import { FaThLarge, FaList } from "react-icons/fa"; // Import icons from react-icons

type ViewToggleProps = {
	onToggle: (viewMode: "list" | "gallery") => void;
	viewMode: "list" | "gallery";
};

const ViewToggle: React.FC<ViewToggleProps> = ({ onToggle, viewMode }) => {
	return (
		<div className="border-b border-gray-300 text-sm mb-4">
			<div className="flex space-x-2">
				{/* Gallery Tab */}
				<button
					className={`flex items-center px-4 py-2 border-b-4 transition-all ${
						viewMode === "gallery"
							? "border-gray-800 text-gray-800 dark:border-gray-200 dark:text-gray-200 font-bold"
							: "border-transparent text-gray-400 hover:text-gray-200"
					} hover:text-gray-700`}
					onClick={() => onToggle("gallery")}
				>
					<FaThLarge className="mr-2" /> Gallery View
				</button>

				{/* List Tab */}
				<button
					className={`flex items-center px-2 py-2 border-b-4  transition-all ${
						viewMode === "list"
							? "border-gray-800 text-gray-800 dark:border-gray-200 dark:text-gray-200 font-bold"
							: "border-transparent text-gray-400 hover:text-gray-200"
					} hover:text-gray-700`}
					onClick={() => onToggle("list")}
				>
					<FaList className="mr-2" /> List View
				</button>
			</div>
		</div>
	);
};

export default ViewToggle;
