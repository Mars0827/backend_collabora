import React from 'react';
import PropTypes from 'prop-types';
import MessageContainer from './MessageContainer';
import SendMessageForm from './SendMessageForm';

const ChatRoom = ({messages, sendMessage}) => {
    console.log("chatroom " + messages);
    return <div>
        <div className="p-5">
            <h2>ChatRoom</h2>
            </div>

            <div className="p-5">
                <MessageContainer messages={messages} />
                <div>
                    <SendMessageForm sendMessage = {sendMessage} />
                </div>
            </div>
        </div>
    }
ChatRoom.propTypes = {
    messages: PropTypes.array.isRequired,
    sendMessage: PropTypes.func.isRequired
};

export default ChatRoom;