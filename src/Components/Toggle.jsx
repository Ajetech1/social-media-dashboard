import React from "react";
import styled from "styled-components";

const ToggleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  margin-top: 30px;
  margin-bottom: 20px;
  position: relative; /* added to position absolute elements correctly */

  @media (max-width: 768px) {
    margin-bottom: 60px;
  }
`;

const ToggleLabel = styled.span`
  color: ${(props) => (props.isDarkMode ? "white" : "#8a92b9")};
  position: relative;
  right: 180px;
  transition: color 0.3s;
  left: 700px;

  @media (max-width: 768px) {
    margin-top: 70px;
    left: 23px;
    position: absolute;
  }
`;

const ToggleButton = styled.div`
  width: 40px;
  height: 20px;
  border-radius: 10px;
  background: ${(props) => (props.isDarkMode ? "#3ec0a5" : "#ccc")};
  position: absolute;
  display: flex;
  left: 800px;
  transition: background 0.3s;

  @media (max-width: 768px) {
    margin-top: 70px;
    left: 280px;
  }
`;

const ToggleCircle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #363956;
  position: absolute;
  top: 1px;
  left: ${(props) => (props.isDarkMode ? "1px" : "21px")};
  transition: left 0.3s;
`;

const Header = styled.div`
  display: flex;
  color: ${(props) => (props.isDarkMode ? "white" : "black")};
  padding: 10px;
  text-align: start;
  font-size: 24px;
  position: relative;
  right: 350px;
  margin-top: -20px;

  @media (max-width: 768px) {
    font-size: 16px;
    left: 12px;
  }
`;

const Paragraph = styled.p`
  display: flex;
  color: #8a92b9;
  padding: 10px;
  text-align: start;
  font-size: 16px;
  position: relative;
  right: 650px;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 10px;
    text-align: left;
    right: 196px;
  }
`;

const Toggle = ({ isDarkMode, toggleTheme }) => {
  return (
    <ToggleWrapper onClick={toggleTheme}>
      <ToggleLabel isDarkMode={isDarkMode}>
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </ToggleLabel>
      <ToggleButton isDarkMode={isDarkMode}>
        <ToggleCircle isDarkMode={isDarkMode} />
      </ToggleButton>
      <Header isDarkMode={isDarkMode}>Social Media Dashboard</Header>
      <Paragraph>Total Followers: 23,004</Paragraph>
    </ToggleWrapper>
  );
};

export default Toggle;
