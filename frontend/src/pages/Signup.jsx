import React, { useState, useContext } from "react";
import "./Signup.css"; // Import custom CSS if you have it
import { GlobalContext } from "../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState(null);

  const { setUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload your resume (PDF) before signing up.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        body: formData, // Do NOT set Content-Type, fetch will do it automatically
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data);
        alert("Signup successful!");
        navigate('/dashboard');
      } else {
        alert(data.message || "Signup failed.");
      }
    } catch (err) {
      alert("An unexpected error occurred during signup.");
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign up to Interview Prep</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="username" className="signup-label">
          Username
        </label>
        <input
          id="username"
          type="text"
          className="signup-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />

        <label htmlFor="password" className="signup-label">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="signup-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <label htmlFor="confirmPassword" className="signup-label">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          className="signup-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Re-enter your password"
        />

        <label htmlFor="resume" className="signup-label">
          Upload Resume (PDF only)
        </label>
        <input
          id="resume"
          type="file"
          accept=".pdf"
          className="signup-input"
          onChange={handleFileChange}
        />

        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
