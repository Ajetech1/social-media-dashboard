import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/auth.css";
import SocialIcon from "../assets/images/social-media-icons.jpg";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // Simple password match check
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://social-media-dashboard-t33n.onrender.com/api/admin/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Signup failed. Please check your details.");
      }

      const data = await response.json();
      console.log("Signup successful:", data);

      // After successful signup, redirect to login
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-wrapper">
      {/* Branding */}
      <section className="info-panel">
        <div class="d-flex flex-column align-items-center">
          <img src={SocialIcon} alt="NBTE Logo" className="logo" />
          <h2>Social Media Dashboard</h2>
          <p>
            <i></i> Facebook, Twitter, Instagram, YouTube
          </p>
          <p>
            <i className="fas fa-tools"></i> Build by Ajetech IT Solutions
          </p>
        </div>
      </section>

      {/* Signup Form */}
      <section className="login-panel">
        <div className="text-center mb-4">
          <span className="h1">
            <b>Social Media</b>
          </span>
          <br />
          <span className="h4 text-secondary">
            <b>Create Admin Account</b>
          </span>
        </div>

        <form onSubmit={handleSignup}>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fas fa-id-card"></i>
            </span>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fas fa-id-card"></i>
            </span>
            <input
              type="text"
              name="first_name"
              className="form-control"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fas fa-id-card"></i>
            </span>
            <input
              type="text"
              name="last_name"
              className="form-control"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fas fa-envelope"></i>
            </span>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fas fa-phone"></i>
            </span>
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fas fa-lock"></i>
            </span>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fas fa-lock"></i>
            </span>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="text-danger text-center">{error}</p>}

          <button
            type="submit"
            className="btn btn-nbte w-100 mt-3"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <div className="text-center mt-3">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}
