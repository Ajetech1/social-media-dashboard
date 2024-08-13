import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  background: ${(props) => props.theme.cardBg};
  border-radius: 5px;
  border-top: 5px solid ${(props) => props.borderColor}; /* Updated to use prop */
  padding: 30px;
  margin: 10px;
  color: ${(props) => props.theme.cardText};
  text-align: center;
  width: 260px;

  @media (max-width: 768px) {
    width: 300px;
  }
`;

const Title = styled.h3`
  font-size: 12px;
  margin-bottom: 10px;
  margin-left: 10px;
  color: #8a92b9;
  display: flex;
  position: relative;
  left: 50px;
`;

const Count = styled.div`
  font-size: 2.5em;
`;

const Paragraph = styled.div`
  margin-bottom: 20px;
  font-size: 12px;
  color: #8a92b9;
`;

const Change = styled.div`
  font-size: 0.8em;
  color: ${(props) => (props.isPositive ? "green" : "red")};
`;

const Card = ({ title, count, change, paragraph, borderColor, isPositive }) => {
  return (
    <CardWrapper borderColor={borderColor}>
      <Title>{title}</Title>
      <Count>{count}</Count>
      <Paragraph>{paragraph}</Paragraph>
      <Change isPositive={isPositive}>
        {isPositive ? "▲" : "▼"} {change}
      </Change>
    </CardWrapper>
  );
};

export default Card;
