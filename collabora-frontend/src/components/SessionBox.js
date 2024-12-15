import React from "react";
import PropTypes from "prop-types";

const SessionBox = ({ title, username, time }) => {
  return (
    <div className="w-full border p-2 px-6 border-grayBorder h-12 mt-2 justify-between flex items-center">
      <div className="flex space-x-4 text-sm items-end">
        <p className="font-semibold">{title}</p>
        <p className="text-grayFont text-xs">{username}</p>
      </div>
      <p className="text-grayFont text-xs flex items-end">{time}</p>
    </div>
  );
};

// Define prop types
SessionBox.propTypes = {
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

// Set default props
SessionBox.defaultProps = {
  title: "Untitled Session",
  username: "Anonymous",
  time: "--:--",
};

export default SessionBox;
