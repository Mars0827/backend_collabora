import { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

const WaitingRoom = ({ joinChatRoom }) => {
    const [username, setUsername] = useState('');
    const [chatroom, setChatRoom] = useState('');

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                joinChatRoom(username, chatroom);
            }}
            className="p-5 bg-gray-100 rounded shadow-md"
        >
            <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                </label>
                <input
                    id="username"
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="chatroom" className="block text-sm font-medium text-gray-700">
                    Chatroom
                </label>
                <input
                    id="chatroom"
                    type="text"
                    placeholder="Chatroom"
                    onChange={(e) => setChatRoom(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
            </div>
            <div>
                <hr className="my-4" />
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    Join Chatroom
                </button>
            </div>
        </form>
    );
};
WaitingRoom.propTypes = {
    joinChatRoom: PropTypes.func.isRequired,
};

export default WaitingRoom;
