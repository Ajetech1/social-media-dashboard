import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ToggleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  margin-top: 30px;
  margin-bottom: 20px;
  position: relative;

  @media (max-width: 768px) {
    margin-bottom: 60px;
  }
`;

const ToggleLabel = styled.span`
  color: ${(props) => (props.isDarkMode ? "white" : "#8a92b9")};
  position: relative;
  right: 180px;
  transition: color 0.3s;
  left: 690px;

  @media (max-width: 768px) {
    margin-top: 60px;
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
  left: 790px;
  transition: background 0.3s;

  @media (max-width: 768px) {
    margin-top: 60px;
    left: 270px;
  }

  @media (max-width: 360px) {
    margin-top: 60px;
    left: 265px;
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

  @media (max-width: 360px) {
    font-size: 13px;
    left: 0px;
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

  @media (max-width: 360px) {
    font-size: 13px;
    text-align: left;
    right: 173px;
  }
`;

/* ✅ Welcome Message */
const WelcomeMessage = styled.span`
  font-size: 14px;
  color: ${(props) => (props.isDarkMode ? "white" : "black")};
  font-weight: 600;
  position: absolute;
  display: flex;
  left: 200px;
  margin-top: 25px;

  @media (max-width: 768px) {
    font-size: 12px;
    margin-top: 100px;
    left: 50px;
  }

  @media (max-width: 360px) {
    font-size: 12px;
    margin-top: 100px;
    left: 40px;
  }
`;

/* ✅ Styled Logout Button */
const LogoutButton = styled.button`
  padding: 5px 10px;
  position: absolute;
  display: flex;
  left: 770px;
  margin-top: 28px;
  background: ${(props) => (props.isDarkMode ? "#e74c3c" : "#3498db")};
  color: white;
  font-size: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.isDarkMode ? "#c0392b" : "#2980b9")};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    font-size: 12px;
    margin-top: 10px;
    left: 250px;
  }

  @media (max-width: 360px) {
    font-size: 12px;
    padding: 8px 14px;
    margin-top: 10px;
    left: 240px;
  }
`;

const Toggle = ({ isDarkMode, toggleTheme }) => {
  const [totalFollowers, setTotalFollowers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [welcome, setWelcome] = useState("");

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const res = await fetch("/api/followers");
        const data = await res.json();
        setTotalFollowers(data.total);

        // ✅ fetch welcome message (protected)
        const token = localStorage.getItem("token");
        if (token) {
          const dashRes = await fetch(
            "https://social-media-dashboard-t33n.onrender.com/api/admin/dashboard",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (dashRes.ok) {
            const dashData = await dashRes.json();
            setWelcome(dashData.message);
          }
        }
      } catch (error) {
        console.error("Error fetching followers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, []);

  return (
    <ToggleWrapper onClick={toggleTheme}>
      <ToggleLabel isDarkMode={isDarkMode}>
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </ToggleLabel>

      <ToggleButton isDarkMode={isDarkMode}>
        <ToggleCircle isDarkMode={isDarkMode} />
      </ToggleButton>

      <Header isDarkMode={isDarkMode}>Social Media Dashboard</Header>

      <Paragraph>
        {loading
          ? "Loading followers..."
          : `Total Followers: ${totalFollowers?.toLocaleString()}`}
      </Paragraph>

      {/* ✅ Welcome Message in front of Logout */}
      {welcome && (
        <WelcomeMessage isDarkMode={isDarkMode}>{welcome}</WelcomeMessage>
      )}

      {/* ✅ Styled Logout Button */}
      <LogoutButton
        isDarkMode={isDarkMode}
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      >
        Logout
      </LogoutButton>
    </ToggleWrapper>
  );
};

export default Toggle;
