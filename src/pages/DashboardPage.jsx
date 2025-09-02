import React, { useState, useEffect } from "react";
import styled, {
  ThemeProvider,
  createGlobalStyle,
  keyframes,
} from "styled-components";
import Dashboard from "../Components/Dashboard";
import Toggle from "../Components/Toggle";
import OverviewCard from "../Components/OverviewCard";
import { toast } from "react-toastify";
import "../App.css";

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
  accent: "#3498db", // Blue for light mode
};

const darkTheme = {
  body: "#121212",
  text: "#fff",
  cardBg: "#1e1e2f",
  cardText: "#fff",
  accent: "#f1c40f", // Yellow for dark mode
};

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.8s ease-in-out;
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

const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column; /* Stack spinner and text vertically */
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Spinner = styled.div`
  border: 6px solid rgba(0, 0, 0, 0.1);
  border-top: 6px solid ${(props) => props.theme.accent};
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// Fade/pulse animation for loading text
const pulse = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`;

const SpinnerText = styled.p`
  margin-top: 20px;
  font-size: 1.2rem;
  color: ${(props) => props.theme.text};
  animation: ${pulse} 1.5s infinite;
`;

function DashboardPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Not authorized, no token");
          return;
        }

        const res = await fetch(
          "https://social-media-dashboard-t33n.onrender.com/api/admin/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.status === 401) {
          const data = await res.json();
          toast.error(data.message || "Unauthorized");
          return;
        }

        await Promise.all([
          fetch("/api/followers", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("/api/youtube", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("/api/twitter", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("/api/facebook", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("/api/instagram", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
      } catch (error) {
        toast.error("API fetch error, please try again");
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      {loading ? (
        <SpinnerWrapper>
          <Spinner />
          <SpinnerText>Loading your dashboard...</SpinnerText>
        </SpinnerWrapper>
      ) : (
        <AppWrapper visible={!loading}>
          <Toggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          <Dashboard />
          <div className="Overview">
            <HeaderText>Overview - Today</HeaderText>
          </div>
          <OverviewCard />
        </AppWrapper>
      )}
    </ThemeProvider>
  );
}

export default DashboardPage;
