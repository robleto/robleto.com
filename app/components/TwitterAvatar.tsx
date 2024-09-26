"use client"; // Add this directive at the top

import React, { useState, useEffect } from "react";
import axios from "axios";

const TwitterAvatar = ({ username }: { username: string }) => {
	const [avatarUrl, setAvatarUrl] = useState("");

	useEffect(() => {
		const fetchAvatar = async () => {
			try {
				const response = await axios.get(
					`/api/twitter-avatar?username=${username}`
				);
				setAvatarUrl(response.data.profileImageUrl);
			} catch (error) {
				console.error("Error fetching Twitter avatar:", error);
			}
		};

		fetchAvatar();
	}, [username]);

	return (
		<div>
			{avatarUrl ? (
				<img src={avatarUrl} alt={`${username}'s Twitter avatar`} />
			) : (
				<span>No avatar found</span>
			)}
		</div>
	);
};

export default TwitterAvatar;
