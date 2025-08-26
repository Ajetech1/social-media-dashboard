import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import facebookIcon from "../assets/images/icon-facebook.svg";
import twitterIcon from "../assets/images/icon-twitter.svg";
import instagramIcon from "../assets/images/icon-instagram.svg";
import youtubeIcon from "../assets/images/icon-youtube.svg";

const DashboardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const Dashboard = () => {
  const [data, setData] = useState([]);

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
          {
            title: (
              <>
                <img
                  src={facebookIcon}
                  alt="Facebook"
                  style={{ marginRight: "4px", verticalAlign: "middle" }}
                />{" "}
                @{facebookRes.name || "Ajetech Kidz Coding Club"}
              </>
            ),
            count: facebookRes.followers_count || "0",
            paragraph: "FOLLOWERS",
            change: "+8 Today", // this can be replace with dynamic change if stored historically
            isPositive: true,
            borderColor: "#1c79cf",
          },
          {
            title: (
              <>
                <img
                  src={twitterIcon}
                  alt="Twitter"
                  style={{ marginRight: "4px", verticalAlign: "middle" }}
                />{" "}
                @{twitterRes.data?.username || "Ajetech"}
              </>
            ),
            count: twitterRes.data?.public_metrics?.followers_count || "0",
            paragraph: "FOLLOWERS",
            change: "+10 Today",
            isPositive: true,
            borderColor: "#1c79cf",
          },
          {
            title: (
              <>
                <img
                  src={instagramIcon}
                  alt="Instagram"
                  style={{ marginRight: "4px", verticalAlign: "middle" }}
                />{" "}
                @{instagramRes.username || "Ajetech_it_solutions"}
              </>
            ),
            count: instagramRes.followers_count || "0",
            paragraph: "FOLLOWERS",
            change: "+5 Today",
            isPositive: true,
            borderColor: "#c06174",
          },
          {
            title: (
              <>
                <img
                  src={youtubeIcon}
                  alt="YouTube"
                  style={{ marginRight: "4px", verticalAlign: "middle" }}
                />{" "}
                @Ajetechsolutions
              </>
            ),
            count: youtubeRes.items?.[0]?.statistics?.subscriberCount || "0",
            paragraph: "SUBSCRIBERS",
            change: "+3 Today",
            isPositive: true,
            borderColor: "#a4082c",
          },
        ];

        setData(updatedData);
      } catch (error) {
        console.error("Error fetching social media data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <DashboardWrapper>
      {data.map((item, index) => (
        <Card
          key={index}
          title={item.title}
          count={item.count}
          paragraph={item.paragraph}
          change={item.change}
          isPositive={item.isPositive}
          borderColor={item.borderColor}
        />
      ))}
    </DashboardWrapper>
  );
};

export default Dashboard;
