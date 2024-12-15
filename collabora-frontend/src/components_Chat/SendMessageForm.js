import { useState } from "react";
import React from "react";
import PropTypes from "prop-types";

const SendMessageForm = ({ sendMessage }) => {
    const [msg, setMessage] = useState("");

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                sendMessage(msg);
                setMessage("");
            }}
            className="flex items-center gap-2 p-4 bg-gray-100 rounded shadow-md"
        >
            <label htmlFor="chatMessage" className="sr-only">
                Chat
            </label>
            <input
                id="chatMessage"
                type="text"
                value={msg}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
                type="submit"
                disabled={!msg}
                className={`px-4 py-2 text-white rounded ${
                    msg ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
                }`}
            >
                Send
            </button>
        </form>
    );
};
SendMessageForm.propTypes = {
    sendMessage: PropTypes.func.isRequired,
};

export default SendMessageForm;