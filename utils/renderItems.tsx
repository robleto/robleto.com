import React from "react";

// Helper function to render rich text
export const renderRichText = (richTextArray: any) => {
	if (!richTextArray || !Array.isArray(richTextArray)) {
		// If richTextArray is undefined or not an array, return an empty fragment or a fallback
		return <></>;
	}

	return richTextArray.map((textObj: any, index: number) => {
		const { annotations, plain_text, href } = textObj;

		let content = plain_text;

		// Handle text annotations (bold, italic, underline)
		if (annotations.bold) {
			content = <strong key={index}>{content}</strong>;
		}

		if (annotations.italic) {
			content = <em key={index}>{content}</em>;
		}

		if (annotations.underline) {
			content = <u key={index}>{content}</u>;
		}

		// Handle links
		if (href) {
			content = (
				<a
					key={index}
					href={href}
					className="text-blue-500 underline"
					target="_blank"
					rel="noopener noreferrer"
				>
					{content}
				</a>
			);
		}

		return content;
	});
};

// Helper function to render different Notion block types
export const renderBlock = (block: any) => {
	switch (block.type) {
		case "paragraph":
			return (
				<p key={block.id}>
					{renderRichText(block.paragraph.rich_text)}
				</p>
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

		case "synced_block":
			// Check if the block has children and recursively render them
			return (
				<div key={block.id}>
					{block.children?.map((childBlock: any) =>
						renderBlock(childBlock)
					)}
				</div>
			);

		case "link":
			return (
				<a
					key={block.id}
					href={block.link.url}
					target="_blank"
					rel="noopener noreferrer"
				>
					{block.link.title}
				</a>
			);

		default:
			// Handle unsupported block types
			return <p key={block.id}>Unsupported block type: {block.type}</p>;
	}
};
