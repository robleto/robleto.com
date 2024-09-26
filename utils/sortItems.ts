// Sort by Pinned and Date (Pinned items first, then by date descending)
export const sortByPinnedAndDate = (items: any[]) => {
	return items.sort((a, b) => {
		if (a.isPinned !== b.isPinned) {
			return a.isPinned ? -1 : 1; // Pinned items go at the top
		}
		// Sort by date descending for non-pinned items
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});
};


// Sort by Pinned and Name (Pinned items first, then by name alphabetically)
export const sortByPinnedAndName = (items: any[]) => {
	return items.sort((a, b) => {
		if (a.isPinned !== b.isPinned) {
			return a.isPinned ? -1 : 1; // Pinned items go at the top
		}
		return a.name.localeCompare(b.name);
	});
};


// Sort by Date only (just sorted by date descending)
export const sortByDate = (items: any[]) => {
	return items.sort((a, b) => {
		return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
	});
};


// Sort by Name only (just sorted by name alphabetically)
export const sortByName = (items: any[]) => {
	return items.sort((a, b) => {
		return a.name.localeCompare(b.name);
	});
};

// Sort by a specific property alphabetically
export const sortItemsByAlpha = (items: any[], property: string) => {
	return items.sort((a, b) => {
		const propA = a[property]?.toLowerCase() || "";
		const propB = b[property]?.toLowerCase() || "";

		// Handle sorting when either value is undefined
		if (!propA) return 1;
		if (!propB) return -1;

		return propA.localeCompare(propB);
	});
};


// Sort by Order key (defaults to "SortOrder")
export const sortByOrder = (items: any[]) => {
	return items.sort((a, b) => {
		const orderA = a.sortOrder; // Access sortOrder directly
		const orderB = b.sortOrder; // Access sortOrder directly

		// Handle cases where order is undefined (push undefined to the end)
		if (orderA === undefined || orderA === null) return 1;
		if (orderB === undefined || orderB === null) return -1;

		// Sort in ascending order
		return orderA - orderB;
	});
};




