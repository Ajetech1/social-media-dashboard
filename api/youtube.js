import fetch from "node-fetch";
export default async function handler(req, res) {
  try {
    const channelId = "UCXFfK6DBjet7tM6djrVJS4A"; // Replace with your channel ID
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${process.env.YOUTUBE_API_KEY}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch YouTube data" });
  }
}
