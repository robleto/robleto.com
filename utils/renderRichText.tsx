// utils/renderRichText.tsx
export const renderRichText = (richTextArray: any) => {
	if (!richTextArray || !Array.isArray(richTextArray)) {
		// If richTextArray is undefined or not an array, return an empty fragment or a fallback
		return <></>;
	}

	return richTextArray.map((textObj: any, index: number) => {
		const { annotations, plain_text, href } = textObj;

		let content = plain_text;

		if (annotations.bold) {
			content = <strong key={index}>{content}</strong>;
		}

		if (annotations.italic) {
			content = <em key={index}>{content}</em>;
		}

		if (annotations.underline) {
			content = <u key={index}>{content}</u>;
		}

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
