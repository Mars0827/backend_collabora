import React from "react";
import SessionBox from "../components/SessionBox";

const SessionsPage = () => {
  // Example sessions data
  const sessions = [
    { title: "Academic Study", username: "Alec Giuseppe So", time: "13:27" },
    { title: "Group Discussion", username: "Sophia Carter", time: "15:45" },
    { title: "Coding Practice", username: "Jake Anderson", time: "17:30" },
  ];

  return (
    <div
      className="h-screen bg-black w-full pt-20"
      style={{ height: "calc(100vh - 5rem)" }}
    >
      <div className="w-1/2 m-auto">
        <h1 className="text-2xl font-bold text-white">All</h1>
        <p className="text-gray-400">Recent</p>

        {sessions.map((session, index) => (
          <SessionBox
            key={index}
            title={session.title}
            username={session.username}
            time={session.time}
          />
        ))}
      </div>
    </div>
  );
};

export default SessionsPage;
