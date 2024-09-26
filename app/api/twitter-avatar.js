import axios from 'axios';

export default async function handler(req, res) {
  const { username } = req.query;

  try {
    const response = await axios.get(
      `https://api.twitter.com/2/users/by/username/${username}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
      }
    );

    const { profile_image_url } = response.data.data; // Extract profile image URL
    res.status(200).json({ profileImageUrl: profile_image_url });
  } catch (error) {
    console.error('Error fetching Twitter avatar:', error);
    res.status(500).json({ error: 'Failed to fetch Twitter avatar' });
  }
}
