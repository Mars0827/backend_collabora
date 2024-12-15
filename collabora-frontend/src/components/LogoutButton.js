import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase"; // Assuming firebase.js contains your auth setup

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
      window.location.href = "/login"; // Redirect to the login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="btn-logout">
      Log Out
    </button>
  );
};

export default LogoutButton;
