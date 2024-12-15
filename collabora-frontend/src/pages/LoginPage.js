import React, { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../firebase"; // Make sure this path is correct
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Attempt Firebase sign-in
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken(); // Get ID token

      // Send the ID token to your backend for verification
      const response = await axios.post(
        "https://localhost:7148/login", // Adjust this URL if necessary
        { idToken },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        // Successful login, redirect to the dashboard (or home page)
        window.location.href = "/"; // Redirect as needed
      }
    } catch (err) {
      console.error(err);
      setError("Invalid credentials or an error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-black flex items-center justify-center px-4 py-32">
      <div className="max-w-md w-full bg-black text-white">
        <h1 className="text-3xl font-bold text-center mb-2">Login account</h1>
        <p className="text-center mb-8 text-sm">
          Start your journey better with Collabora.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 w-4/6 m-auto">
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className={`w-full bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-sm ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
