// Utility to group items by a specific variable (like 'stateName', 'category', etc.)
export const groupItemsByVariable = (
	items: any[],
	groupBy: string = "topics" // Define the property to group by (e.g., 'stateName')
) => {
	// Reduce to group by the passed-in variable
	const groupedItems = items.reduce((acc: any, item: any) => {
		// Check if the item has the groupBy property
		const groupValues = item[groupBy];

		// If it's an array (like 'topics'), loop through each value
		if (Array.isArray(groupValues)) {
			groupValues.forEach((value: string) => {
				if (!acc[value]) {
					acc[value] = [];
				}
				acc[value].push(item);
			});
		} else {
			// Otherwise, treat it as a single value grouping (e.g., 'stateName')
			const value = groupValues || "Unknown"; // Fallback to 'Unknown' if no value exists
			if (!acc[value]) {
				acc[value] = [];
			}
			acc[value].push(item);
		}
		return acc;
	}, {});

	return groupedItems;
};

// Utility to sort groups alphabetically by their group names
export const sortGroupsAlphabetically = (groupedItems: any) => {
	return Object.keys(groupedItems).sort(); // Alphabetically sort the group keys
};
