import React from "react";
import MessageBox from "../components/MessageBox";

const MessagePanel = () => {
  return (
    <div
      className="flex flex-col w-full"
      style={{
        height: "calc(100vh - 5rem)",
      }}
    >
      <div className="p-4 px-6 font-medium border-b border-b-grayBorder">
        <h1>Alec Giuseppe So</h1>
      </div>
      <div
        className="flex-grow overflow-y-auto"
        style={{
          msOverflowStyle: "none", // Hide scrollbar for IE and Edge
          scrollbarWidth: "none", // Hide scrollbar for Firefox
        }}
      >
        <div className="hide-scroll pb-20">
          <p className="text-xs m-auto w-full text-center pt-4 text-grayFont">
            Dec 15 2024
          </p>
          <MessageBox
            author="Alec"
            message="Hi I'm Alec! Please teach me how to dougie."
            time="3:33"
          />
          <MessageBox
            author="Alec"
            message="Hi I'm Alec! Please teach me how to dougie."
            time="3:33"
          />
          <MessageBox
            author="User"
            message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
            time="3:33"
          />
          <MessageBox
            author="User"
            message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
            time="3:33"
          />
          <MessageBox
            author="Alec"
            message="Hi I'm Alec! Please teach me how to dougie."
            time="3:33"
          />
          <MessageBox
            author="Alec"
            message="Hi I'm Alec! Please teach me how to dougie."
            time="3:33"
          />
        </div>
        
      </div>
    </div>
  );
};


<style>
{`
/* Hide scrollbar for WebKit browsers */
.hide-scroll::-webkit-scrollbar {
display: none;
}
`}
</style>

export default MessagePanel;
