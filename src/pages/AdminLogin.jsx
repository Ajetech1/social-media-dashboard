import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../assets/css/auth.css";
import { toast } from "react-toastify";
import SocialIcon from "../assets/images/social-media-icons.jpg";

export default function Login() {
  // these states are to be defined at the top
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 👉 Show toast if redirected from ProtectedRoute
  useEffect(() => {
    if (location.state?.fromProtected) {
      toast.error(location.state.message || "Please log in first");
      // clear state so it doesn’t show again if user reloads
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://social-media-dashboard-t33n.onrender.com/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        // throw new Error("Invalid username or password");
        toast.error("Invalid username or password");
        return;
      }

      const data = await response.json();
      console.log("Login successful:", data);

      // Save token
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Show success toast
      toast.success(data.message || "Login successful");

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
      toast.error(err.message); // 🔴 show error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-wrapper">
      {/* Left Branding */}
      <section className="info-panel">
        <div class="d-flex flex-column align-items-center">
          <img src={SocialIcon} alt="Social Media Logo" className="logo" />
          <h2>Social Media Dashboard</h2>
          <p>
            <i></i> Facebook, Twitter, Instagram, YouTube
          </p>
          <p>
            <i className="fas fa-tools"></i> Build by Ajetech IT Solutions
          </p>
        </div>
      </section>

      {/* Right Login Form */}
      <section className="login-panel">
        <div className="text-center mb-4">
          <span className="h1">
            <b>Social Media</b>
          </span>
          <br />
          <span className="h4 text-secondary">
            <b>Admin Staff Login</b>
          </span>
        </div>

        <p className="text-center">Please Sign In Using Your Credentials</p>

        <form onSubmit={handleLogin}>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fas fa-user-shield"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fas fa-lock"></i>
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-danger text-center">{error}</p>}

          <button
            type="submit"
            className="btn btn-nbte w-100 mt-3"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="text-center mt-3">
            <p>
              <a href="#">Forgot Password?</a>
            </p>
            {/* <p>
              Don’t have an account? <Link to="/signup">Sign Up</Link>
            </p> */}
          </div>
        </form>
      </section>
    </main>
  );
}
