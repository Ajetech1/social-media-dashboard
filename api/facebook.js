import fetch from "node-fetch";
export default async function handler(req, res) {
  try {
    const pageId = "248204995339798"; // Replace with your page ID
    const response = await fetch(
      `https://graph.facebook.com/${pageId}?fields=name,followers_count,fan_count&access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Facebook data" });
  }
}
