// Mapping functions for different entry types
export const mapEntry = (entry: any, entryType: string) => {
	switch (entryType) {
		case "art":
			return mapArtEntry(entry);
		case "about":
			return mapAboutEntry(entry);
		case "board-games":
			return mapBoardGamesEntry(entry);
		case "bookmarks":
			return mapBookmarksEntry(entry);
		case "following":
			return mapFollowingEntry(entry);
		case "library":
			return mapLibraryEntry(entry);
		case "lists":
			return mapListsEntry(entry);
		case "musicals":
			return mapMusicalsEntry(entry);
		case "posts":
			return mapPostsEntry(entry);
		case "portfolio":
			return mapPortfolioEntry(entry);
		case "projects":
			return mapProjectsEntry(entry);
		case "reading-list":
			return mapReadingListEntry(entry);
		case "resources":
			return mapResourcesEntry(entry);
		case "shakespeare":
			return mapShakespeareEntry(entry);
		case "travel":
			return mapTravelEntry(entry);
		default:
			throw new Error(`Unknown entry type: ${entryType}`);
	}
};

// Map the Art data structure
const mapArtEntry = (entry: any) => {
  const imageProperty = entry.properties.Image;
  const imageUrl =
    imageProperty?.files?.[0]?.file?.url || imageProperty?.files?.[0]?.name || "";
  const featured = entry.properties.Featured?.checkbox || false;
  const slug = entry.properties.Slug?.rich_text?.[0]?.plain_text || "";
  const animated = entry.properties.Animated?.checkbox || false;
  const topics = entry.properties.Topics?.multi_select || [];
  const url = entry.properties.URL?.url || "#";
  const title = entry.properties.Name?.title?.[0]?.plain_text || "Untitled";
  const description = entry.properties.Description?.rich_text?.[0]?.plain_text || "";

  return {
    id: entry.id,
    title,
    topics: topics.map((topic: any) => topic.name),
    image: imageUrl,
    url,
    featured,
    slug,
    animated,
    description,
  };
};

// Map the About data structure
const mapAboutEntry = (entry: any) => {
	const id = entry.id;
	const name = entry.properties.Name?.title[0]?.plain_text ?? "Untitled";
	const dateString = entry.properties.Date?.date?.start;
	const date = dateString ? new Date(dateString).toISOString() : null; 
	const description =
		entry.properties.Description?.rich_text[0]?.plain_text ?? "";
	const url = entry.properties.URL?.url || "#";
	const slug = entry.properties.Slug?.rich_text[0]?.plain_text || "";
	const tags =
		entry.properties.Tags?.multi_select.map((topic: any) => topic.name) ||
		[];
	const isPinned = entry.properties.Pinned?.checkbox || false;

	return {
		id,
		name,
		date,
		description,
		url,
		slug,
		tags,
		isPinned,
	};
};


// Map the Board Games data structure
const mapBoardGamesEntry = (entry: any) => {
  const title = entry.properties.Name?.title?.[0]?.plain_text || "Untitled";
  const slug = entry.properties.Slug?.rich_text?.[0]?.plain_text || "";
  const own = entry.properties.Own?.status?.name || ""; 
  const played = entry.properties.Played?.status?.name || ""; 

  return {
    id: entry.id,
    title,
    slug,
		own,
    played, // Include the seen status
  };
};

// Map the Bookmarks data structure
const mapBookmarksEntry = (entry: any) => {
	const id = entry.id;
	const title = entry.properties.Name?.title[0]?.plain_text ?? "Untitled";
	const pubdate = entry.properties.PubDate?.date?.start || null;
	const description =
		entry.properties.Description?.rich_text[0]?.plain_text ?? "";
	const url = entry.properties.URL?.url || "#";
	const sortOrder = entry.properties.SortOrder?.number || Infinity;
	const slug = entry.properties.Slug?.rich_text[0]?.plain_text || "";
	const tags =
		entry.properties.Tags?.multi_select.map((topic: any) => topic.name) ||
		[];

	return {
		id,
		title,
		pubdate,
		description,
		url,
		sortOrder,
		slug,
		tags,
	};
};

// Map the Following data structure
const mapFollowingEntry = (entry: any) => {
	const id = entry.id;
	const title = entry.properties.Name?.title[0]?.plain_text ?? "Untitled";
	const pubdate = entry.properties.PubDate?.date?.start || null;
	const description =
		entry.properties.Description?.rich_text[0]?.plain_text ?? "";
	const url = entry.properties.URL?.url || "#";
	const sortOrder = entry.properties.SortOrder?.number || Infinity;
	const slug = entry.properties.slug?.rich_text[0]?.plain_text || "";
	const tags =
		entry.properties.Tags?.multi_select.map((topic: any) => topic.name) ||
		[];

	return {
		id,
		title,
		pubdate,
		description,
		url,
		sortOrder,
		slug,
		tags,
	};
};



// Map the Library data structure
const mapLibraryEntry = (entry: any) => {
  const imageProperty = entry.properties.Image;
  const imageUrl =
    imageProperty?.files?.[0]?.file?.url || imageProperty?.files?.[0]?.name || "";
  const topics = entry.properties.Topics?.multi_select || [];
  const title = entry.properties.Title?.title?.[0]?.plain_text || "Untitled";
  const slug = entry.properties.Slug?.rich_text?.[0]?.plain_text || "";
  const url = entry.properties.URL?.url || "#";

  return {
    id: entry.id,
    title,
    topics: topics.map((topic: any) => topic.name),
    image: imageUrl,
    url,
    slug,
  };
};

// Map the Lists data structure
const mapListsEntry = (entry: any) => {
	const slug = entry.properties.Slug?.rich_text?.[0]?.plain_text || "";
	const url = entry.properties.URL?.url || "#";
	const title = entry.properties.Name?.title?.[0]?.plain_text || "Untitled";
	const description =
		entry.properties.Description?.rich_text?.[0]?.plain_text || "";
	const sortOrder = entry.properties.SortOrder?.number || Infinity;

	return {
		id: entry.id,
		title,
		url,
		slug,
		description,
		sortOrder,
	};
};


// Map the Musicals data structure
const mapMusicalsEntry = (entry: any) => {
  const title = entry.properties.Name?.title?.[0]?.plain_text || "Untitled";
  const slug = entry.properties.Slug?.rich_text?.[0]?.plain_text || "";
  const seen = entry.properties.Seen?.status?.name || ""; 

  return {
    id: entry.id,
    title,
    slug,
    seen, // Include the seen status
  };
};


// Map the Posts data structure
const mapPostsEntry = (entry: any) => {
	const id = entry.id;
	const title = entry.properties.Name?.title[0]?.plain_text ?? "Untitled";
	const pubdate = entry.properties.PubDate?.date?.start || null;
	const description =
		entry.properties.Description?.rich_text[0]?.plain_text ?? "";
	const url = entry.properties.LinkedURL?.url || "#";
	const sortOrder = entry.properties.SortOrder?.number || Infinity;
	const slug = entry.properties.Slug?.rich_text[0]?.plain_text || "";
	const tags =
		entry.properties.Tags?.multi_select.map((topic: any) => topic.name) ||
		[];
	const isPinned = entry.properties.Pinned.checkbox || false;

	return {
		id,
		title,
		pubdate,
		description,
		url,
		sortOrder,
		slug,
		tags,
    isPinned
	};
};



// Map the Projects data structure
const mapPortfolioEntry = (entry: any) => {
	const imageProperty = entry.properties.Image;
	const imageUrl =
		imageProperty?.files?.[0]?.file?.url ||
		imageProperty?.files?.[0]?.name ||
		"";
	const slug = entry.properties.Slug?.rich_text?.[0]?.plain_text || "";
	const url = entry.properties.LinkedURL?.url || "#";
	const title = entry.properties.Name?.title?.[0]?.plain_text || "Untitled";
	const subtitle =
		entry.properties.Subtitle?.rich_text?.[0]?.plain_text || "";
	const sortOrder = entry.properties.SortOrder?.number || Infinity;

	return {
		id: entry.id,
		title,
		image: imageUrl,
		url,
		slug,
		subtitle,
		sortOrder,
	};
};


// Map the Projects data structure
const mapProjectsEntry = (entry: any) => {
	const imageProperty = entry.properties.Image;
	const imageUrl =
		imageProperty?.files?.[0]?.file?.url ||
		imageProperty?.files?.[0]?.name ||
		"";
	const featured = entry.properties.Featured?.checkbox || false;
	const slug = entry.properties.Slug?.rich_text?.[0]?.plain_text || "";
	const animated = entry.properties.Animated?.checkbox || false;
	const topics = entry.properties.Topics?.multi_select || [];
  const type = entry.properties.Type?.multi_select || [];
	const url = entry.properties.URL?.url || "#";
	const title = entry.properties.Name?.title?.[0]?.plain_text || "Untitled";
	const description =
		entry.properties.Description?.rich_text?.[0]?.plain_text || "";
	const sortOrder = entry.properties.SortOrder?.number || Infinity;
	const tags =
		entry.properties.Tags?.multi_select.map((topic: any) => topic.name) ||
		[];

	return {
		id: entry.id,
		title,
		topics: topics.map((topic: any) => topic.name),
		image: imageUrl,
		url,
		featured,
		slug,
		tags,
		description,
		sortOrder,
	};
};

// Map the ReadingList data structure
const mapReadingListEntry = (entry: any) => {
	const id = entry.id;
	const title = entry.properties.Name?.title[0]?.plain_text ?? "Untitled";
	const pubdate = entry.properties.PubDate?.date?.start || null;
	const description =
		entry.properties.Description?.rich_text[0]?.plain_text ?? "";
	const url = entry.properties.URL?.url || "#";
	const sortOrder = entry.properties.SortOrder?.number || Infinity;
	const slug = entry.properties.Slug?.rich_text[0]?.plain_text || "";
	const tags =
		entry.properties.Tags?.multi_select.map((topic: any) => topic.name) ||
		[];
	const isPinned = entry.properties.Pinned?.checkbox || false;

	return {
		id,
		title,
		pubdate,
		description,
		url,
		sortOrder,
		slug,
		tags,
    isPinned
	};
};

// Map the Resources data structure
const mapResourcesEntry = (entry: any) => {
  const imageProperty = entry.properties.Image;
  const imageUrl =
    imageProperty?.files?.[0]?.file?.url || imageProperty?.files?.[0]?.name || "";
  const featured = entry.properties.Featured?.checkbox || false;
  const slug = entry.properties.Slug?.rich_text?.[0]?.plain_text || "";
  const animated = entry.properties.Animated?.checkbox || false;
  const topics = entry.properties.Topics?.multi_select || [];
  const url = entry.properties.URL?.url || "#";
  const title = entry.properties.Name?.title?.[0]?.plain_text || "Untitled";
  const description =
    entry.properties.Description?.rich_text?.[0]?.plain_text || "";

  return {
    id: entry.id,
    title,
    topics: topics.map((topic: any) => topic.name),
    image: imageUrl,
    url,
    featured,
    slug,
    animated,
    description,
  };
};


// Map the Shakespeare data structure
const mapShakespeareEntry = (entry: any) => {
  const title = entry.properties.Name?.title?.[0]?.plain_text || "Untitled";
  const slug = entry.properties.Slug?.rich_text?.[0]?.plain_text || "";
  const seen = entry.properties.Seen?.status?.name || ""; 

  return {
    id: entry.id,
    title,
    slug,
    seen, // Include the seen status
  };
};

// Map the Travel data structure
const mapTravelEntry = (entry: any) => {
  const imageProperty = entry.properties.Image;
  const imageUrl =
    imageProperty?.files?.[0]?.file?.url ||
    imageProperty?.files?.[0]?.name ||
    "";
  const title = entry.properties.Name?.title?.[0]?.plain_text || "Untitled";
  const slug = entry.properties.Slug?.rich_text?.[0]?.plain_text || "";
  const url = entry.properties.URL?.url || "#";
  const city = entry.properties.City?.rich_text?.[0]?.plain_text || "";
  const state = entry.properties.State?.select?.name || "Unknown";
  const seen = entry.properties.Seen?.select?.name || ""; // Add the Seen property

  return {
    id: entry.id,
    title,
    image: imageUrl,
    url,
    slug,
    city,
    state,
    cityState: `${city}, ${state}`,
    seen, // Include the seen status
  };
};