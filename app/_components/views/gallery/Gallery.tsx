"use client";

import { useEffect, useState, useMemo } from "react";
import GalleryCard from "./GalleryCard";
import { GalleryLoading } from "@/app/_components/common/Loading";
import type { GalleryProps, BaseItem } from "@/types";

// Enhanced Gallery Props with better type safety
interface EnhancedGalleryProps<T = BaseItem> extends GalleryProps<T> {
	loading?: boolean;
	error?: Error | null;
	emptyStateMessage?: string;
	emptyStateComponent?: React.ComponentType;
	onItemClick?: (item: T) => void;
}

const EmptyState: React.FC<{message: string}> = ({ message }) => (
	<div className="text-center py-12">
		<div className="text-4xl mb-4">📭</div>
		<p className="text-gray-500 dark:text-gray-400">{message}</p>
	</div>
);

const Gallery = <T extends BaseItem = BaseItem>({
	items,
	gridCols = "grid-cols-1",
	smGridCols = "sm:grid-cols-1",
	mdGridCols = "md:grid-cols-2",
	lgGridCols = "lg:grid-cols-3",
	pageKey = "page",
	titleKey = "title" as keyof T,
	linkKey = "url" as keyof T,
	slugKey = "slug" as keyof T,
	pubDateKey = "pubdate" as keyof T,
	descriptionKey = "description" as keyof T,
	tagsKey = "tags" as keyof T,
	urlKey = "url" as keyof T,
	cityStateKey = "cityState" as keyof T,
	animatedKey = "animated" as keyof T,
	groupByKey = null,
	minHeight = "300px",
	sortItem,
	filterItem,
	loading = false,
	error = null,
	emptyStateMessage = "No items to display",
	emptyStateComponent: EmptyStateComponent,
	onItemClick,
}: EnhancedGalleryProps<T>): JSX.Element => {
	const [clientItems, setClientItems] = useState<T[]>(items);

	// Memoize processed items for performance
	const processedItems = useMemo(() => {
		let updatedItems = [...items];

		// Apply filtering if a filter function is provided
		if (filterItem) {
			updatedItems = filterItem(updatedItems);
		}

		// Apply sorting if a sort function is provided
		if (sortItem) {
			updatedItems = sortItem(updatedItems);
		}

		return updatedItems;
	}, [items, filterItem, sortItem]);

	// Update client items when processed items change
	useEffect(() => {
		setClientItems(processedItems);
	}, [processedItems]);

	// Handle loading state
	if (loading) {
		return <GalleryLoading count={6} />;
	}

	// Handle error state
	if (error) {
		return (
			<div className="text-center py-12">
				<div className="text-4xl mb-4">⚠️</div>
				<p className="text-red-500 dark:text-red-400">
					Error loading content: {error.message}
				</p>
			</div>
		);
	}

	// Handle empty state
	if (!Array.isArray(clientItems) || clientItems.length === 0) {
		return EmptyStateComponent ? (
			<EmptyStateComponent />
		) : (
			<EmptyState message={emptyStateMessage} />
		);
	}

	return (
		<div className="container mx-auto">
			<div
				className={`grid ${gridCols} ${smGridCols} ${mdGridCols} ${lgGridCols} gap-6 -z-10`}
			>
				{clientItems.map((item: T, index: number) => (
					<div 
						key={item.id || index}
						onClick={() => onItemClick?.(item)}
						className={onItemClick ? "cursor-pointer" : ""}
					>
						<GalleryCard
							item={{ ...item, index }}
							pageKey={pageKey}
							titleKey={titleKey as string}
							linkKey={linkKey as string}
							slugKey={slugKey as string}
							pubDateKey={pubDateKey as string}
							descriptionKey={descriptionKey as string}
							tagsKey={tagsKey as string}
							urlKey={linkKey as string}
							cityStateKey={cityStateKey as string}
							animatedKey={animatedKey as string}
							lgGridCols={lgGridCols}
							minHeight={minHeight}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Gallery;
