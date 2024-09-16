// utils/renderBlock.tsx
import { renderRichText } from "./renderRichText"; // Import the rich text utility

export const renderBlock = (block: any) => {
	switch (block.type) {
		case "paragraph":
			return block.paragraph?.rich_text?.length > 0 ? (
				<p key={block.id}>
					{renderRichText(block.paragraph.rich_text)}
				</p>
			) : (
				<p>No text available</p>
			);

		case "heading_1":
			return (
				<h1 key={block.id}>{renderRichText(block.heading_1.text)}</h1>
			);

		case "heading_2":
			return (
				<h2 key={block.id}>{renderRichText(block.heading_2.text)}</h2>
			);

		case "heading_3":
			return (
				<h3 key={block.id}>{renderRichText(block.heading_3.text)}</h3>
			);

		case "child_database":
			return (
				<p key={block.id}>
					Child Database: {block.child_database.title}
				</p>
			);

		default:
			return <p key={block.id}>Unsupported block type: {block.type}</p>;
	}
};
