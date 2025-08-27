// api/followers.js
import fetch from "node-fetch";

async function getYouTubeSubs() {
  try {
    const channelId = process.env.YT_CHANNEL_ID || "UCXFfK6DBjet7tM6djrVJS4A";
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${process.env.YOUTUBE_API_KEY}`;
    const res = await fetch(url);
    const json = await res.json();
    const subs = Number(json.items?.[0]?.statistics?.subscriberCount) || 0;
    return subs;
  } catch (e) {
    console.warn("YouTube error:", e);
    return 0;
  }
}

async function getTwitterFollowers() {
  try {
    const username = process.env.TWITTER_USERNAME || "Ajetech";
    const url = `https://api.twitter.com/2/users/by/username/${username}?user.fields=public_metrics`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}` },
    });

    // Handle rate limit / errors gracefully
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.warn("Twitter error:", res.status, err);
      return 0;
    }

    const json = await res.json();
    const followers = Number(json?.data?.public_metrics?.followers_count) || 0;
    return followers;
  } catch (e) {
    console.warn("Twitter error:", e);
    return 0;
  }
}

async function getFacebookFollowers() {
  try {
    const pageId = process.env.FACEBOOK_PAGE_ID || "248204995339798";
    const url = `https://graph.facebook.com/v20.0/${pageId}?fields=followers_count&access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`;
    const res = await fetch(url);
    const json = await res.json();
    if (json.error) {
      console.warn("Facebook error:", json.error);
      return 0;
    }
    return Number(json.followers_count) || 0;
  } catch (e) {
    console.warn("Facebook error:", e);
    return 0;
  }
}

async function getInstagramFollowers() {
  try {
    // This is the Instagram Business Account ID (ig_user_id), not the Page ID
    const igUserId = process.env.IG_USER_ID || "17841448769891895";
    const url = `https://graph.facebook.com/v20.0/${igUserId}?fields=followers_count&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`;
    const res = await fetch(url);
    const json = await res.json();
    if (json.error) {
      console.warn("Instagram error:", json.error);
      return 0;
    }
    return Number(json.followers_count) || 0;
  } catch (e) {
    console.warn("Instagram error:", e);
    return 0;
  }
}

export default async function handler(req, res) {
  try {
    const [youtube, twitter, facebook, instagram] = await Promise.all([
      getYouTubeSubs(),
      getTwitterFollowers(),
      getFacebookFollowers(),
      getInstagramFollowers(),
    ]);

    const total = youtube + twitter + facebook + instagram;

    // Cache on the edge for 5 minutes to reduce rate limits
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");

    return res.status(200).json({
      youtube,
      twitter,
      facebook,
      instagram,
      total, // <-- number, not string
    });
  } catch (e) {
    console.error("followers API fatal error:", e);
    return res.status(500).json({ error: "Failed to fetch social media data" });
  }
}
