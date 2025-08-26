import React, { useEffect, useState } from "react";
import styled from "styled-components";
import facebookIcon from "../assets/images/icon-facebook.svg";
import twitterIcon from "../assets/images/icon-twitter.svg";
import instagramIcon from "../assets/images/icon-instagram.svg";
import youtubeIcon from "../assets/images/icon-youtube.svg";

const DashboardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin: 0 8%;
`;

const Card = styled.div`
  background: ${(props) => props.theme.cardBg};
  color: ${(props) => props.theme.cardText};
  border-color: ${(props) => props.borderColor};
  border-radius: 10px;
  padding: 20px;
  flex: 1 1 200px;
  max-width: 300px;
  min-width: 150px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  @media (max-width: 768px) {
    width: 260px;
  }
`;

const Title = styled.h3`
  margin: 0;
  font-size: 12px;
  color: #8a92b9;
`;

const Value = styled.div`
  font-size: 2em;
  margin: 0;
`;

const Change = styled.div`
  font-size: 0.9em;
  color: ${(props) => (props.positive ? "#4CAF50" : "#F44336")};
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

const Icon = styled.div`
  font-size: 1.5em;
  position: absolute;
  top: 20px;
  right: 20px;
`;

const CardComponent = () => {
  const [data, setData] = useState([]);

  const platformIcons = {
    facebook: <img src={facebookIcon} alt="Facebook" />,
    instagram: <img src={instagramIcon} alt="Instagram" />,
    twitter: <img src={twitterIcon} alt="Twitter" />,
    youtube: <img src={youtubeIcon} alt="YouTube" />,
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [youtubeRes, twitterRes, facebookRes, instagramRes] =
          await Promise.all([
            fetch("/api/youtube").then((res) => res.json()),
            fetch("/api/twitter").then((res) => res.json()),
            fetch("/api/facebook").then((res) => res.json()),
            fetch("/api/instagram").then((res) => res.json()),
          ]);

        const updatedData = [
          // Facebook metrics
          {
            title: "Followers",
            value: facebookRes.followers_count || "0",
            change: "3%",
            positive: true,
            platform: "facebook",
          },
          {
            title: "Likes",
            value: facebookRes.fan_count || "0",
            change: "-2%",
            positive: false,
            platform: "facebook",
          },

          // Instagram Followers
          {
            title: "Followers",
            value: instagramRes.followers_count || "0",
            change: "+3",
            isPositive: true,
            platform: "instagram",
          },

          // Instagram Posts (Media Count)
          {
            title: "Media Count",
            value: instagramRes.media_count || "0",
            change: "+5",
            isPositive: true,
            platform: "instagram",
          },

          // Twitter metrics
          {
            title: "Tweets",
            value: twitterRes.data?.public_metrics?.tweet_count || "0",
            change: "+0%", // placeholder
            positive: true,
            platform: "twitter",
          },
          {
            title: "Likes",
            value: twitterRes.data?.public_metrics?.like_count || "0",
            change: "+0%",
            positive: true,
            platform: "twitter",
          },
          // YouTube metrics
          {
            title: "Subscribers",
            value: youtubeRes.items?.[0]?.statistics?.subscriberCount || "0",
            change: "+0%",
            positive: true,
            platform: "youtube",
          },
          {
            title: "Total Views",
            value: youtubeRes.items?.[0]?.statistics?.viewCount || "0",
            change: "-0%",
            positive: false,
            platform: "youtube",
          },
        ];

        setData(updatedData);
      } catch (error) {
        console.error("Error fetching social media overview data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <DashboardWrapper>
      {data.map((item, index) => (
        <Card key={index}>
          <Icon>{platformIcons[item.platform]}</Icon>
          <Title>{item.title}</Title>
          <Value>{item.value}</Value>
          <Change positive={item.positive}>{item.change}</Change>
          <borderColor>{item.borderColor}</borderColor>
        </Card>
      ))}
    </DashboardWrapper>
  );
};

export default CardComponent;
