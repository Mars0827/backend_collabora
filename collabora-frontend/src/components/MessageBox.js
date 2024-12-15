// import React from "react";
// import PropTypes from "prop-types";

// const MessageBox = ({ author, message, time }) => {
//   return (
//     <div className="w-full p-1 px-6">
//       <div className="flex space-x-4">
//         <div className="space-y-2">
//           <div className="flex space-x-1 items-end">
//             <p className="font-medium text-sm">{author}</p>
//             <p className="text-grayFont text-xs">•</p>
//             <p className="font-thin text-grayFont text-xs">{time}</p>
//           </div>
//           <div className="border border-grayBorder p-4 rounded-md text-sm max-w-xs">
//             {message}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// MessageBox.propTypes = {
//   author: PropTypes.string.isRequired,
//   message: PropTypes.string.isRequired,
//   time: PropTypes.string.isRequired,
// };

// export default MessageBox;


import React from "react";
import PropTypes from "prop-types";

const MessageBox = ({ author, message, time }) => {
  // Check if the author is "User" to apply right alignment
  const isUser = author === "User";

  return (
    <div className="w-full p-1 px-6">
      <div className={`flex space-x-4 ${isUser ? "justify-end" : ""}`}>
        <div className="space-y-2">
          <div className={`flex space-x-1 items-end ${isUser ? "flex-row-reverse" : ""}`}>
            <p className={`font-medium text-sm ${isUser ? "text-right" : ""}`}>{author}</p>
            <p className="text-grayFont text-xs">• </p>
            <p className="font-thin text-grayFont text-xs">{time}</p>
          </div>
          <div
            className={`border border-grayBorder p-4 rounded-md text-sm max-w-xs ${isUser ? "bg-blueButton" : ""}`}
          >
            {message}
          </div>
        </div>
      </div>
    </div>
  );
};

MessageBox.propTypes = {
  author: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default MessageBox;
