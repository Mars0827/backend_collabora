import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; // Adjust the path to your Firebase setup

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Validate the children prop
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children are a valid React node
};

export const useAuth = () => useContext(AuthContext);
