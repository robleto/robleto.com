import React from "react";
import { fetchNotionData } from "@/lib/notionContentFetcher";
import PageHeader from "@/app/_components/layout/page/PageHeader";
import { sortByPinnedAndDate } from "@/utils/sortItems";
import Lists from "../_components/views/list/List"; // Import Lists component
import Gallery from "../_components/views/gallery/Gallery"; // Import Gallery component

interface ParentComponentProps {
  ListComponent: React.ComponentType;
  GalleryComponent: React.ComponentType;
}

const ParentComponent: React.FC<ParentComponentProps> = ({ ListComponent, GalleryComponent }) => (
  <div>
    <ListComponent />
    <GalleryComponent />
  </div>
);

const PostsContainer = ({ sortedItems, ListComponent, GalleryComponent, listProps, galleryProps }) => {
    return (
        <div>
            <ListComponent items={sortedItems} {...listProps} />
            <GalleryComponent items={sortedItems} {...galleryProps} />
        </div>
    );
};

const Page: React.FC = () => (
  <ParentComponent ListComponent={Lists} GalleryComponent={Gallery} />
);

export default Page;
