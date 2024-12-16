import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

const FindMatchPage = () => {
  const [loading, setLoading] = useState(true);
  const [matchFound, setMatchFound] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();

  // Helper function to generate a random time between min and max
  const getRandomTime = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  useEffect(() => {
    // Randomize "Finding" time (3-5 seconds)
    const findingTime = getRandomTime(1500, 3000);
    const matchTime = getRandomTime(500, 1000); // "Match Found" display time (0.5-1.5 seconds)
    const redirectTime = getRandomTime(300, 600); // "Redirecting" display time (0.7-1 seconds)

    const timer = setTimeout(() => {
      setLoading(false); // End "Finding..." state
      setMatchFound(true); // Show "Match Found"

      const matchFoundTimer = setTimeout(() => {
        setMatchFound(false); // End "Match Found" state
        setRedirecting(true); // Show "Redirecting"

        const redirectingTimer = setTimeout(() => {
          navigate("/chatroom"); // Navigate to "/chatroom"
        }, redirectTime);

        return () => clearTimeout(redirectingTimer);
      }, matchTime);

      return () => clearTimeout(matchFoundTimer);
    }, findingTime);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [navigate]);

  return (
    <div
      className="h-screen bg-black text-white flex justify-center items-center pt-20"
      style={{ height: "calc(100vh - 18rem)" }}
    >
      {loading ? (
        <div className="flex flex-col items-center">
          {/* Loading Icon */}
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid m-10"></div>
          <p className="text-white mt-3 text-3xl font-bold">Finding...</p>
        </div>
      ) : matchFound ? (
        <p className="text-white mt-3 text-3xl font-bold">Match Found!</p>
      ) : redirecting ? (
        <p className="text-white mt-3 text-3xl font-bold">Redirecting...</p>
      ) : null}
    </div>
  );
};

export default FindMatchPage;
