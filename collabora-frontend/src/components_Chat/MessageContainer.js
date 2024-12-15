import React from 'react';
import PropTypes from 'prop-types';

const MessageContainer = ({ messages }) => {
    return (
        <div>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index} className="mb-2">
                        <p>
                            <strong>{msg.username}</strong>: {msg.msg}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};   

MessageContainer.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            username: PropTypes.string.isRequired,
            msg: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default MessageContainer;