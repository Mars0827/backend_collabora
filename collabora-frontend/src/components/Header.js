import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase"; // assuming auth is initialized here

const Header = () => {
  const [user, setUser] = useState(null); // State to store the current logged-in user

  useEffect(() => {
    // Monitor authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // If the user is logged in, update state
      } else {
        setUser(null); // If no user is logged in, set state to null
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);  // Signs out the user
      console.log("User logged out");
      window.location.href = "/login"; // Optionally, redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="border border-x-0 border-t-0 border-b-grayBorder">
      <nav className="text-white p-5 flex flex-row w-5/6 m-auto justify-between text-sm font-light">
        <div className="space-x-10 flex justify-center items-center">
          <div className="w-24">
            <Link to="/" className="font-medium">
              Collabora
            </Link>
          </div>
          <Link to="/match">Match</Link>
          <Link to="/sessions">Sessions</Link>
        </div>

        <div className="space-x-10 flex justify-center items-center">
          {!user ? (  // If no user is logged in, show Login and Register links
            <>
              <Link to="/login">Login</Link>
              <Link to="/contact">Contact</Link>
              <div className="bg-blueButton px-5 py-2 rounded-sm border border-blueButtonBorder">
                <Link to="/register">Get started - it&lsquo;s free</Link>
              </div>
            </>
          ) : (  // If a user is logged in, show the Logout button
            <button onClick={handleLogout} className="bg-blue-600 text-white px-4 py-2 rounded-sm">
              Log out
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
