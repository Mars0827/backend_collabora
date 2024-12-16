import React, { useState, useEffect } from "react";
import bgImg from "../assets/home-gradient.png";
import { db } from "../firebase"; // Ensure this points to your Firebase configuration
import { auth } from "../firebase"; // Add Firebase Auth
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth"; // Track authenticated user
import VideoCall from "./VideoCall";

const ChatroomPage = () => {
  const [messages, setMessages] = useState([]); // Stores chat messages
  const [newMessage, setNewMessage] = useState(""); // Input for new messages
  const [currentUser, setCurrentUser] = useState(null); // Tracks the authenticated user

  // Fetch authenticated user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user); // Save the authenticated user
      } else {
        setCurrentUser(null); // Handle unauthenticated state
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch messages in real-time
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, []);

  // Send a new message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    if (!currentUser) {
      alert("You must be logged in to send a message.");
      return;
    }

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      timestamp: serverTimestamp(),
      senderId: currentUser.uid, // Save the authenticated user's UID
      senderName: currentUser.displayName || "Anonymous", // Optional: display name
    });

    setNewMessage(""); // Clear input
  };

  return (
    <div
      className="h-screen bg-black w-full"
      style={{
        backgroundImage: `url(${bgImg})`,
        height: "calc(100vh - 5rem)",
      }}
    >
      <div className="flex h-full">
        {/* Video Call Section */}
        <div className="w-1/4 h-full flex flex-col justify-end">
          <h2 className="text-white text-center py-4">Video Call</h2>
          <VideoCall />
          <div className="bg-gray-800 flex-grow rounded-md">
            {/* Assuming VideoCall is already implemented */}
          </div>
        </div>

        {/* Chat Section */}
        <div className="w-2/4 h-full border border-y-0 border-x-grayBorder flex flex-col">
          {/* Messages Panel */}
          <div className="flex-grow overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-2 ${
                  message.senderId === currentUser?.uid
                    ? "text-right"
                    : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-4 py-2 rounded-md ${
                    message.senderId === currentUser?.uid
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  <strong>
                    {message.senderId === currentUser?.uid
                      ? "You"
                      : message.senderName || "Anonymous"}
                    :
                  </strong>{" "}
                  {message.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input Section */}
          <div className="p-4 border-t border-gray-700 bg-gray-900">
            <div className="flex items-center">
              <input
                type="text"
                className="flex-grow p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                disabled={!currentUser} // Disable input if not authenticated
              />
              <button
                className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                onClick={sendMessage}
                disabled={!currentUser} // Disable button if not authenticated
              >
                Send
              </button>
            </div>
            {!currentUser && (
              <p className="text-red-500 mt-2">
                You must be logged in to send messages.
              </p>
            )}
          </div>
        </div>

        {/* Placeholder for Future Features */}
        <div className="w-1/4 h-full flex flex-col justify-center items-center">
          <h2 className="text-white">Other Features</h2>
        </div>
      </div>
    </div>
  );
};

export default ChatroomPage;
