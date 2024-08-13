import React from "react";
import styled from "styled-components";
import Card from "./Card";
import facebook from "../assets/images/icon-facebook.svg";
import twitter from "../assets/images/icon-twitter.svg";
import instagram from "../assets/images/icon-instagram.svg";
import youtube from "../assets/images/icon-youtube.svg";

const DashboardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const data = [
  {
    title: (
      <>
        <img src={facebook} alt="" /> @nathanf
      </>
    ),
    count: "1987",
    paragraph: "F O L L O W E R S",
    change: "+12 Today",
    isPositive: true,
    borderColor: "#1c79cf",
  },
  {
    title: (
      <>
        <img src={twitter} alt="" /> @nathanf
      </>
    ),
    count: "1044",
    paragraph: "F O L L O W E R S",
    change: "+99 Today",
    isPositive: true,
    borderColor: "#1c79cf",
  },
  {
    title: (
      <>
        <img src={instagram} alt="" /> @realnathanf
      </>
    ),
    count: "11k",
    paragraph: "F O L L O W E R S",
    change: "+1099 Today",
    isPositive: true,
    borderColor: "#c06174",
  },
  {
    title: (
      <>
        <img src={youtube} alt="" /> @Nathan F.
      </>
    ),
    count: "8239",
    paragraph: "S U B S C R I B E R S",
    change: "-144 Today",
    isPositive: false,
    borderColor: "#a4082c",
  },
];

const Dashboard = () => {
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
