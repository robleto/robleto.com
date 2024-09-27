"use client"

import { useEffect, useState } from 'react';
import GalleryCard from './GalleryCard';

type GalleryProps = {
  items: any[];
  gridCols?: string;
  smGridCols?: string;
  mdGridCols?: string;
  lgGridCols?: string;
  pageKey?: string;
  titleKey?: string;
  linkKey?: string;
  slugKey?: string;
  pubDateKey?: string;
  descriptionKey?: string;
  tagsKey?: string;
  urlKey?: string;
  cityStateKey?: string;
  animatedKey?: string;
  groupByKey?: string | null;
  sortItem?: (items: any[]) => any[];
  filterItem?: (items: any[]) => any[];
};

const Gallery: React.FC<GalleryProps> = ({
  items,
  gridCols = 'grid-cols-1',
  smGridCols = 'sm:grid-cols-1',
  mdGridCols = 'md:grid-cols-2',
  lgGridCols = 'lg:grid-cols-3',
  pageKey = 'page',
  titleKey = 'title',
  linkKey = '',
  slugKey = '',
  pubDateKey = '',
  descriptionKey = '',
  tagsKey = '',
  urlKey = '',
  cityStateKey = '',
  animatedKey = '',
  groupByKey = null,
  sortItem,
  filterItem,
}) => {
  const [clientItems, setClientItems] = useState(items);

  useEffect(() => {
    setClientItems(items);
  }, [items]);

  return (
		<div className="container mx-auto">
			<div
				className={`grid ${gridCols} ${smGridCols} ${mdGridCols} ${lgGridCols} gap-6`}
			>
				{Array.isArray(clientItems) &&
					clientItems.map((item: any, index: number) => (
						<GalleryCard
							key={index}
							item={item}
							pageKey={pageKey}
							titleKey={titleKey}
							linkKey={linkKey}
							slugKey={slugKey}
							pubDateKey={pubDateKey}
							descriptionKey={descriptionKey}
							tagsKey={tagsKey}
							urlKey={urlKey}
							cityStateKey={cityStateKey}
							animatedKey={animatedKey}
							lgGridCols={lgGridCols}
						/>
					))}
			</div>
		</div>
  );
};

export default Gallery;
