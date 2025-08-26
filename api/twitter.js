import fetch from "node-fetch";
export default async function handler(req, res) {
  try {
    const username = "Ajetech"; // Replace with your username
    const response = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}?user.fields=public_metrics`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Twitter data" });
  }
}
