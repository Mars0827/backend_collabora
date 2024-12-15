import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import bgImg from "../assets/home-gradient.png";
import mockupImg from "../assets/pic-home.png";
import CustomSwiper from "../components/CustomSwiper";

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="h-full">
      {/* Hero Section */}
      <div
        className={`bg-cover bg-center w-full bg-no-repeat transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${bgImg})`,
        }}
      >
        <div className="w-5/6 m-auto justify-center py-32 space-y-8 h-screen">
          <div className="font-bold text-7xl">
            <h1>Study smarter, not</h1>
            <h1>harder - with a</h1>
            <h1>partner.</h1>
          </div>
          <div className="space-y-2 text-sm">
            <p>
              Connect instantly with learners who share your goals and
              interests.
            </p>
            <p>
              Make every study session more engaging and focused on what matters
              most.
            </p>
          </div>
          <div className="bg-blueButton px-5 py-2 rounded-sm border border-blueButtonBorder max-w-36 text-center text-sm">
            <Link to="/chatroom">Start studying</Link>
          </div>
        </div>
      </div>

      {/* Topics Section */}
      <CustomSwiper />

      <img
  src={mockupImg}
  alt="Mockup"
  className="w-full h-auto transform scale-75" // Scale down by 25%
 />

      <div className="w-full h-screen flex flex-col justify-center space-y-10">
        <div className="font-bold text-7xl text-center">
          <h1>Where study sessions become</h1>
          <h1>collaborations.</h1>
        </div>
        <div className="text-center">
          <p>
            Join a community of learners eager to share knowledge and reach new
          </p>
          <p>heights together.</p>
        </div>
        <div className="bg-blueButton px-5 py-2 rounded-sm border border-blueButtonBorder max-w-44 text-sm mx-auto">
          <Link to="/register">Get started - it&apos;s free</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
