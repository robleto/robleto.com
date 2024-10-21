/**
 * Utility to filter items based on a specified property and its expected value.
 *
 * This function filters an array of objects (e.g., entries from a database) by checking whether
 * a specific property of each object matches the provided expected value (not necessarily boolean).
 *
 * Example use case: filtering for items based on a Notion "status" property (e.g., "Complete").
 *
 * @param {any[]} items - The array of items to filter (e.g., entries from a Notion database).
 * @param {string} property - The property of each item to filter by (e.g., "status").
 * @param {string | number | boolean} expectedValue - The value to match (e.g., "Complete" for a Notion status).
 *
 * @returns {any[]} A filtered array of items where the specified property matches the expected value.
 */
export const filterItemsByProperty = (
	items: any[], // The list of items to filter (e.g., entries from a Notion database)
	property: string, // The property to check (e.g., "status")
	expectedValue: string | number | boolean // The expected value to match
) => {
	// Use Array's filter method to return only items where the property matches the expected value
	return items.filter((item) => {
		// Safely access the specified property dynamically from each item
		const itemProperty = item?.[property]; // Handles cases where the property may not exist

		// Return true if the item's property matches the expected value
		return itemProperty === expectedValue;
	});
};
