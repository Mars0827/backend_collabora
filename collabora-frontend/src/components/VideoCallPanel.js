import React, { useState } from "react";
import PropTypes from "prop-types";
import MicOn from "../assets/ion_mic-on.svg";
import MicOff from "../assets/ion_mic-off.svg";
import HeadphoneOn from "../assets/mingcute_headphone-on.svg";  
import HeadphoneOff from "../assets/mingcute_headphone-off.svg";
import VideoOn from "../assets/mynaui_video-on.svg";
import VideoOff from "../assets/mynaui_video-off.svg";

const VideoCallPanel = ({ name = "User" }) => {
  // States for toggling icons
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isHeadphoneOn, setIsHeadphoneOn] = useState(true);

  // Check if the user is "User"
  const isTogglable = name === "User";

  return (
    <div>
      <div>
        <div className="w-full h-full p-4 px-6">
          <div className="bg-slate-400 h-52"></div>
        </div>
      </div>
      <div className="p-3 px-6 flex justify-between border border-x-0 border-y-grayBorder">
        <div className="flex space-x-4">
          <div className="flex flex-col justify-center">
            <p className="font-medium text-sm px-2">{name}</p>
          </div>
        </div>
        <div className="flex space-x-4 items-center">
          {/* Microphone Toggle */}
          <button
            onClick={() => isTogglable && setIsMicOn((prev) => !prev)}
            disabled={!isTogglable}
            className={`${!isTogglable && "opacity-50 cursor-not-allowed"}`}
          >
            <img
              src={isMicOn ? MicOn : MicOff}
              alt={isMicOn ? "Microphone On" : "Microphone Off"}
              className="h-5 w-5"
            />
          </button>
          {/* Headphone Toggle */}
          <button
            onClick={() => isTogglable && setIsHeadphoneOn((prev) => !prev)}
            disabled={!isTogglable}
            className={`${!isTogglable && "opacity-50 cursor-not-allowed"}`}
          >
            <img
              src={isHeadphoneOn ? HeadphoneOn : HeadphoneOff}
              alt={isHeadphoneOn ? "Headphone On" : "Headphone Off"}
              className="h-5 w-5"
            />
          </button>
          {/* Video Toggle */}
          <button
            onClick={() => isTogglable && setIsVideoOn((prev) => !prev)}
            disabled={!isTogglable}
            className={`${!isTogglable && "opacity-50 cursor-not-allowed"}`}
          >
            <img
              src={isVideoOn ? VideoOn : VideoOff}
              alt={isVideoOn ? "Video On" : "Video Off"}
              className="h-5 w-5"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
VideoCallPanel.propTypes = {
  name: PropTypes.string,
};

export default VideoCallPanel;
