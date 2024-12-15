import React, { useState } from "react";

const SendChatInput = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Message sent:", message); // Replace this with your message sending logic
      setMessage(""); // Clear the input field after sending
    }
  };

  return (
    <div className="h-14 border-t border-r border-r-grayBorder border-t-grayBorder fixed bottom-0 w-2/4 bg-black flex items-center">
      {/* Input for typing messages */}
      <form
        className="flex w-full items-center px-4"
        onSubmit={handleSendMessage}
      >
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow text-sm h-8 bg-transparent text-white border border-grayBorder rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-grayBorder2"
        />
        <button
          type="submit"
          className="ml-4 border border-grayBorder h-8 text-white px-4 text-xs rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SendChatInput;
