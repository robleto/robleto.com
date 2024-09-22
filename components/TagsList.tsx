// TagsList.tsx
import React from "react";
import Tag from "./Tag";

interface TagsListProps {
	tags: string[];
}

const TagsList: React.FC<TagsListProps> = ({ tags }) => {
	return (
		<div className="flex flex-wrap">
			{tags.map((tag, index) => (
				<Tag key={index} tag={tag} />
			))}
		</div>
	);
};

export default TagsList;
