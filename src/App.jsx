import React, { useState } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Dashboard from "./Components/Dashboard";
import Toggle from "./Components/Toggle";
import OverviewCard from "./Components/OverviewCard";
import "./App.css";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    transition: all 0.3s;
  }
`;

const lightTheme = {
  body: "#fff",
  text: "#000",
  cardBg: "#f0f0f0",
  cardText: "#000",
};

const darkTheme = {
  body: "#121212",
  text: "#fff",
  cardBg: "#1e1e2f",
  cardText: "#fff",
};

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
`;

const HeaderText = styled.h1`
  text-align: left;
  color: ${(props) => props.theme.text};
  font-size: 20px;

  @media (max-width: 768px) {
    text-align: left;
    font-size: 1.2rem;
  }
`;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <AppWrapper>
        <Toggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

        <Dashboard />
        <div className="Overview">
          <HeaderText>Overview - Today</HeaderText>
        </div>

        <OverviewCard />
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
