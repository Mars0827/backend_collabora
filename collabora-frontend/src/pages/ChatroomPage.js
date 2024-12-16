import React from "react";
import bgImg from "../assets/home-gradient.png";
import VideoCall from "./VideoCall";
import MessagePanel from "../components/MessagePanel";
import SendChatInput from "../components/SendChatInput";

const ChatroomPage = () => {

  return (
    <div
      className="h-screen bg-black w-full"
      style={{
        backgroundImage: `url(${bgImg})`,
        height: "calc(100vh - 5rem)",
      }}
    >
      <div className="flex h-full">
        <div className="w-1/4 h-full flex flex-col justify-end">
          <VideoCall />
        </div>
        <div className="w-2/4 h-full border border-y-0 border-x-grayBorder">
          <MessagePanel />
          <SendChatInput />
        </div>
        <div className="w-1/4 h-full"></div>
      </div>
    </div>
  );
};

export default ChatroomPage;