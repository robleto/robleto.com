// utils/sortbyOrder.tsx
export const sortByOrder = (items: any[], orderKey: string = "SortOrder") => {
	return items.sort((a: any, b: any) => {
		// Check if properties and orderKey exist on both items
		const orderA = a?.properties?.[orderKey]?.number ?? Infinity; // Default to Infinity if undefined
		const orderB = b?.properties?.[orderKey]?.number ?? Infinity; // Default to Infinity if undefined

		return orderA - orderB; // Sort in ascending order
	});
};
