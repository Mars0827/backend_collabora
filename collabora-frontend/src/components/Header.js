import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border border-x-0 border-t-0 border-b-grayBorder">
      <nav className="text-white p-5 flex flex-row w-5/6 m-auto justify-between text-sm font-light">
        <div className="space-x-10 flex justify-center items-center">
          <div className="w-24 ">
            <Link to="/" className="font-medium">Collabora</Link>
          </div>
          <Link to="/match">Match</Link>
          <Link to="/sessions">Sessions</Link>
        </div>
        <div className="space-x-10 flex justify-center items-center">
          <Link to="/login">Login</Link>
          <Link to="/contact">Contact</Link>
          <div className="bg-blueButton px-5 py-2 rounded-sm border border-blueButtonBorder">
            <Link to="/register">Get started - it&apos;s free</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
