import fetch from "node-fetch";
export default async function handler(req, res) {
  try {
    const userId = "17841448769891895"; // Instagram Business Account ID
    const response = await fetch(
      `https://graph.facebook.com/v20.0/${userId}?fields=username,followers_count,media_count&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Instagram data" });
  }
}
