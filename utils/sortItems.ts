export const sortByPinnedAndDate = (items: any[], dateKey: string) => {
	return items.sort((a, b) => {
		// Prioritize pinned items first
		if (a.isPinned && !b.isPinned) return -1;
		if (!a.isPinned && b.isPinned) return 1;

		// Sort by date descending
		const dateA = a[dateKey] ? new Date(a[dateKey]) : new Date(0);
		const dateB = b[dateKey] ? new Date(b[dateKey]) : new Date(0);
		return dateB.getTime() - dateA.getTime(); // Newest first
	});
};


export const sortByDate = (items: any[], dateKey: string) => {
	return items.sort((a, b) => {
		// Sort by date descending
		const dateA = a[dateKey] ? new Date(a[dateKey]) : new Date(0);
		const dateB = b[dateKey] ? new Date(b[dateKey]) : new Date(0);
		return dateB.getTime() - dateA.getTime(); // Newest first
	});
};

// Sort by Pinned and Name (Pinned items first, then by name alphabetically)
export const sortByPinnedAndName = (items: any[]) => {
	return items.sort((a, b) => {
		if (a.isPinned !== b.isPinned) {
			return a.isPinned ? -1 : 1; // Pinned items at the top
		}
		return a.name.localeCompare(b.name);
	});
};

// Sort by Name only (sorted by name alphabetically)
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
		// Handle Infinity consistently on both server and client
		const orderA = a.sortOrder === Infinity ? 9999 : a.sortOrder;
		const orderB = b.sortOrder === Infinity ? 9999 : b.sortOrder;

		// Sort in ascending order
		return orderA - orderB;
	});
};
