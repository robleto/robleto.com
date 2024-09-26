import { useState, useEffect } from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import {
	groupItemsByVariable,
	sortGroupsAlphabetically,
} from "@/utils/groupItems";

const useGalleryData = (
	databaseId: string,
	pageId: string,
	groupByKey: string | null,
	mapEntry: (entry: any) => any // Function to map data structure
) => {
	const [items, setItems] = useState<any[]>([]);
	const [groupedItems, setGroupedItems] = useState<{ [key: string]: any[] }>(
		{}
	);
	const [sortedGroupNames, setSortedGroupNames] = useState<string[]>([]);

	useEffect(() => {
		const loadData = async () => {
			const { listItems } = await fetchNotionData({
				databaseId,
				pageId,
				mapEntry,
			});

			setItems(listItems);

			if (groupByKey) {
				const grouped = groupItemsByVariable(listItems, groupByKey);
				const sortedGroups = sortGroupsAlphabetically(grouped);
				setGroupedItems(grouped);
				setSortedGroupNames(sortedGroups);
			} else {
				// Set items without grouping if no groupByKey
				setGroupedItems({ "": listItems });
				setSortedGroupNames([""]);
			}
		};

		loadData();
	}, [databaseId, pageId, groupByKey]);

	return { items, groupedItems, sortedGroupNames };
};

export default useGalleryData;
