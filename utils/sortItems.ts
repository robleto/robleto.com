import { compareAsc, compareDesc, parseISO } from "date-fns";

// Sort by Pinned and Date (Pinned items first, then by date descending)
export const sortByPinnedAndDate = (items: any[]) => {
	return items.sort((a, b) => {
		if (a.isPinned !== b.isPinned) {
			return a.isPinned ? -1 : 1; // Pinned items go at the top
		}
		// Sort by date descending, use fallback for invalid dates
		return compareDesc(
			parseISO(a.pubdate || '2000-01-01'), 
			parseISO(b.pubdate || '2000-01-01')
		);
	});
};

// Sort by Date only (sorted by date descending)
export const sortByDate = (items: any[]) => {
	return items.sort((a, b) => {
		// Handle undefined or invalid dates
		const dateA = a.pubDate ? parseISO(a.pubDate) : new Date(0); // Fallback to epoch for undefined date
		const dateB = b.pubDate ? parseISO(b.pubDate) : new Date(0); // Fallback to epoch for undefined date
		// Sort by date descending, use fallback for invalid dates
		return compareDesc(
			parseISO(a.pubdate || "2000-01-01"),
			parseISO(b.pubdate || "2000-01-01")
		);
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
		const orderA = a.sortOrder ?? Infinity; // Fallback to Infinity for undefined
		const orderB = b.sortOrder ?? Infinity;

		// Sort in ascending order
		return orderA - orderB;
	});
};
