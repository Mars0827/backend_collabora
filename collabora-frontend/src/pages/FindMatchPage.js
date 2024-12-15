import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Ensure the path is correct
import { collection, getDocs } from "firebase/firestore";

const FindMatchPage = ({ currentUserPreferences = {} }) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "matches"));
        const matchedUsers = [];
 
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
 
          // Matching logic
          const topicsMatch = Object.keys(currentUserPreferences.topics).some(
            (key) =>
              currentUserPreferences.topics[key] &&
              userData.topics[key]
          );
 
          const scheduleMatch = Object.keys(currentUserPreferences.schedule).some(
            (key) =>
              currentUserPreferences.schedule[key] &&
              userData.schedule[key]
          );
 
          const studyDurationMatch = Object.keys(
            currentUserPreferences.studyDuration
          ).some(
            (key) =>
              currentUserPreferences.studyDuration[key] &&
              userData.studyDuration[key]
          );
 
          if (topicsMatch && scheduleMatch && studyDurationMatch) {
            matchedUsers.push(userData);
          }
        });

        setMatches(matchedUsers);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, [currentUserPreferences]);

  return (
    <div className="flex flex-col items-center justify-center px-6 p-0 h-screen">
      <div className="shadow-md rounded-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Matching users...</h1>
        <ul>
          {matches.map((match, index) => (
            <li key={index}>
              <div>{/* Display match details here */}</div>
              <button onClick={() => alert("Accept")}>Accept</button>
              <button onClick={() => alert("Reject")}>Reject</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FindMatchPage;