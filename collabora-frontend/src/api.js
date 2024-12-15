import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "./firebase"; // import your auth configuration

// Create an Axios instance
const api = axios.create({
  baseURL: "https://localhost:5001", // Your ASP.NET Core backend's base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const register = async (email, password) => {
  try {
    const response = await api.post("/register", { email, password });
    return response.data;
  } catch (error) {
    console.error(
      "Error during registration:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const login = async (idToken) => {
  try {
    const response = await api.post("/login", { idToken });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error.response?.data || error.message);
    throw error;
  }
};

export const logout = async () => {
    try {
      await signOut(auth);  // Signs out the user
      console.log("User logged out");
  
      // Optionally, redirect the user after logging out
      window.location.href = "/login";  // Or use React Router to navigate
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
