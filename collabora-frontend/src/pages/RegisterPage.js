import React, { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // Send the registration data to the backend
      const response = await axios.post(
        "https://localhost:7148/register",
        {
          email: email,
          username: username,
          password: password,
          confirmPassword: confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // If registration is successful, redirect to login page
      if (response.status === 200) {
        window.location.href = "/login"; // Redirect to login page
      }
    } catch (err) {
      // Handle errors, display error message if registration fails
      if (err.response && err.response.data) {
        setError(err.response.data.errorMessage || "Registration failed");
      } else {
        setError("An error occurred. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-black flex items-center justify-center px-4 py-32">
      <div className="max-w-md w-full bg-black text-white">
        <h1 className="text-3xl font-bold text-center mb-2">Create account</h1>
        <p className="text-center mb-8 text-sm">
          Start your learning journey better with Collabora.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 w-4/6 m-auto">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-1"
            >
              Username*
            </label>
            <input
              type="text"
              id="username"
              className="h-11 w-full bg-bgBlack border border-grayBorder2 rounded-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder:text-sm text-sm placeholder:text-grayBorder2"
              placeholder="Enter a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email*
            </label>
            <input
              type="email"
              id="email"
              className="h-11 w-full bg-bgBlack border border-grayBorder2 rounded-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder:text-sm text-sm placeholder:text-grayBorder2"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="pb-5">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password*
            </label>
            <input
              type="password"
              id="password"
              className="h-11 w-full bg-bgBlack border border-grayBorder2 rounded-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder:text-sm text-sm placeholder:text-grayBorder2"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="pb-5">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-1"
            >
              Confirm Password*
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="h-11 w-full bg-bgBlack border border-grayBorder2 rounded-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder:text-sm text-sm placeholder:text-grayBorder2"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className={`w-full bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-sm ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
