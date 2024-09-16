import React from "react";

type GalleryItem = {
	id: string;
	title: string;
	description?: string;
	cover?: string;
	url: string; // This will be the custom "Url" from the Notion property
};

type GalleryProps = {
	items: GalleryItem[]; // Array of items to display
	columns?: string; // Optional: grid column classes (default: 3 columns)
};

const Gallery: React.FC<GalleryProps> = ({
	items,
	columns = "md:grid-cols-3",
}) => {
	return (
		<div className={`grid grid-cols-1 sm:grid-cols-2 ${columns} gap-6`}>
			{items.map((item) => (
				<div key={item.id} className="border p-4 rounded shadow">
					{/* Image wrapper with uniform size */}
					{item.cover && (
						<div className="h-48 w-full overflow-hidden">
							<img
								src={item.cover}
								alt={item.title}
								className="object-cover h-full w-full"
							/>
						</div>
					)}

					{/* Display title */}
					<h3 className="font-bold text-lg mb-2">{item.title}</h3>

          {/* Display description if available */}
          {item.description && <p>{item.description}</p>}

          {/* Use the custom Url property */}
          {item.url && (
            <a
              href={item.url}
              className="text-blue-500 underline mt-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.url}
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default Gallery;
