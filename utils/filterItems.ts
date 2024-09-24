// Utility to filter items based on a specified property and value
export const filterItemsByProperty = (
	items: any[],
	property: string, // The property to filter by (e.g., "Seen")
	value: string // The value to match (e.g., "Been there")
) => {
	return items.filter((item) => {
		// Access the property dynamically
		const itemProperty = item?.[property]; // Use the dynamically passed property

		// Return true if the item's property matches the desired value
		return itemProperty === value;
	});
};
