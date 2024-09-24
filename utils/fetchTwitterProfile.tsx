import fetch from "node-fetch";

// Function to fetch Twitter profile image using the API v2
export async function fetchTwitterProfileImage(
	username: string,
	token: string
): Promise<string | null> {
	try {
		const url = `https://api.twitter.com/2/users/by/username/${username}`;

		const response = await fetch(url, {
			headers: {
				Authorization: `Bearer ${token}`, // Bearer token from Twitter API
			},
		});

		if (!response.ok) {
			const errorData = await response.json();
			console.error("Error fetching Twitter profile image:", errorData);
			return null;
		}

const data: any = await response.json();
return data.data?.profile_image_url || null; // Return the profile image URL
	} catch (error) {
		console.error("Error fetching Twitter profile image:", error);
		return null;
	}
}


//here3