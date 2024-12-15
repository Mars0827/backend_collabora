import React from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
const FindMatchPage = () => {
  return (
    <div className="bg-blueButton px-5 py-2 rounded-sm border border-blueButtonBorder max-w-36 text-center text-sm">
    <Link to="/videocall">Match found</Link>
  </div>
  )
};

export default FindMatchPage;
