/**
 * Utility to filter items based on a specified property and its expected value(s).
 *
 * This function filters an array of objects by checking whether a specific property of each object
 * includes the provided expected value or values (useful for multi-select fields).
 *
 * @param {any[]} items - The array of items to filter (e.g., entries from a Notion database).
 * @param {string} property - The property of each item to filter by (e.g., "tags").
 * @param {string | number | boolean | (string | number | boolean)[]} expectedValue - The value(s) to match.
 *
 * @returns {any[]} A filtered array of items where the specified property includes the expected value(s).
 */
export const filterItemsByProperty = (
	items: any[],
	property: string,
	expectedValue: string | number | boolean | (string | number | boolean)[]
) => {
	return items.filter((item) => {
		const itemProperty = item?.[property]; // Access the specified property dynamically

		// If the property is an array (e.g., multi-select), check if expectedValue is included in it
		if (Array.isArray(itemProperty)) {
			// If expectedValue is also an array, check if there’s any overlap
			if (Array.isArray(expectedValue)) {
				return expectedValue.some((value) =>
					itemProperty.includes(value)
				);
			} else {
				// If expectedValue is a single value, check if it's included in itemProperty array
				return itemProperty.includes(expectedValue);
			}
		}

		// If itemProperty is not an array, check for exact match with expectedValue
		return itemProperty === expectedValue;
	});
};
