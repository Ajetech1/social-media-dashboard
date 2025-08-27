// api/followers.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const [yt, tw, fb, ig] = await Promise.all([
      fetch(`${process.env.BASE_URL}/api/youtube`).then((r) => r.json()),
      fetch(`${process.env.BASE_URL}/api/twitter`).then((r) => r.json()),
      fetch(`${process.env.BASE_URL}/api/facebook`).then((r) => r.json()),
      fetch(`${process.env.BASE_URL}/api/instagram`).then((r) => r.json()),
    ]);

    const total =
      (yt.items?.[0]?.statistics?.subscriberCount || 0) +
      (tw.data?.public_metrics?.followers_count || 0) +
      (fb.followers_count || 0) +
      (ig.followers_count || 0);

    res
      .status(200)
      .json({ youtube: yt, twitter: tw, facebook: fb, instagram: ig, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch followers data" });
  }
}
