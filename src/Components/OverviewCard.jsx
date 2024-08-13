// CardComponent.jsx
import React from "react";
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
  const data = [
    {
      title: "Page Views",
      value: 87,
      change: "3%",
      positive: true,
      platform: "facebook",
    },
    {
      title: "Likes",
      value: 52,
      change: "-2%",
      positive: false,
      platform: "facebook",
    },
    {
      title: "Likes",
      value: 5462,
      change: "2257%",
      positive: true,
      platform: "instagram",
    },
    {
      title: "Profile Views",
      value: "52k",
      change: "1375%",
      positive: true,
      platform: "instagram",
    },
    {
      title: "Retweets",
      value: 117,
      change: "303%",
      positive: true,
      platform: "twitter",
    },
    {
      title: "Likes",
      value: 507,
      change: "553%",
      positive: true,
      platform: "twitter",
    },
    {
      title: "Likes",
      value: 107,
      change: "-19%",
      positive: false,
      platform: "youtube",
    },
    {
      title: "Total Views",
      value: 1407,
      change: "-12%",
      positive: false,
      platform: "youtube",
    },
  ];

  const platformIcons = {
    facebook: (
      <>
        <img src={facebookIcon} alt="" />
      </>
    ),
    instagram: (
      <>
        <img src={instagramIcon} alt="" />
      </>
    ),
    twitter: (
      <>
        <img src={twitterIcon} alt="" />
      </>
    ),
    youtube: (
      <>
        <img src={youtubeIcon} alt="" />
      </>
    ),
  };

  return (
    <DashboardWrapper>
      {data.map((item, index) => (
        <Card key={index}>
          <Icon>{platformIcons[item.platform]}</Icon>
          <Title>{item.title}</Title>
          <Value>{item.value}</Value>
          <Change positive={item.positive}>{item.change}</Change>
        </Card>
      ))}
    </DashboardWrapper>
  );
};

export default CardComponent;
