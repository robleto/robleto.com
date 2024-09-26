/**
 * Utility to filter items based on a specified property and its boolean value.
 *
 * This function filters an array of objects (e.g., entries) by checking whether
 * a specific property of each object matches the provided boolean value.
 *
 * Example use case: filtering for "featured" items (property = "featured", value = true).
 *
 * @param {any[]} items - The array of items to filter (e.g., entries from a database).
 * @param {string} property - The property of each item to filter by (e.g., "featured").
 * @param {boolean} value - The value to match (true or false).
 *
 * @returns {any[]} A filtered array of items where the specified property matches the given value.
 */
export const filterItemsByProperty = (
	items: any[], // The list of items to filter (e.g., entries from a Notion database)
	property: string, // The property to check (e.g., "featured")
	value: boolean // The value to match (true or false)
) => {
	// Use Array's filter method to return only items where the property matches the value
	return items.filter((item) => {
		// Safely access the specified property dynamically from each item
		const itemProperty = item?.[property]; // Handles cases where the property may not exist

		// Return true if the item's property matches the desired value (true/false)
		return itemProperty === value;
	});
};
