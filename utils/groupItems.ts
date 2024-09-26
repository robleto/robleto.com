export const groupItemsByVariable = (
	items: any[],
	groupBy: string = "topics" // Define the property to group by (e.g., 'topics')
) => {
	// Object to store grouped items
	const groupedItems: Record<string, any[]> = {};

	items.forEach((item: any) => {
		const groupValues = item[groupBy]; // Get the values for the groupBy key

		// If it's an array (like 'topics'), loop through each value
		if (Array.isArray(groupValues)) {
			groupValues.forEach((value: string) => {
				if (!groupedItems[value]) {
					groupedItems[value] = [];
				}
				groupedItems[value].push(item);
			});
		} else {
			// If there's a single value, treat it as a single grouping
			const value = groupValues || "Unknown"; // Fallback to 'Unknown' if no value
			if (!groupedItems[value]) {
				groupedItems[value] = [];
			}
			groupedItems[value].push(item);
		}
	});

	// Return the grouped items, sorted alphabetically by group name
	return Object.keys(groupedItems)
		.sort()
		.reduce((acc: any, key: string) => {
			acc[key] = groupedItems[key];
			return acc;
		}, {});
};
