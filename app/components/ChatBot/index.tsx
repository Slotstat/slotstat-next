"use client";
import React, { useState } from "react";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import ChatFloatingContainer from "./ChatFloatingContainer";

const ChatBot: React.FC = () => {
  const [rotated, setRotated] = useState(false);

  const handleClick = () => {
    setRotated(!rotated);
  };
  return (
    <div className="z-10 fixed right-0 bottom-0 mr-5 mb-5 sm:mr-6 sm:mb-6 ">
      <div className="relative">
        <div
          onClick={handleClick}
          className={`transform transition-transform duration-500 h-18 w-18 rounded-full border border-grey1 bg-dark2 flex items-center justify-center overflow-hidden ${
            rotated ? "rotate-180" : "rotate-0"
          }`}
        >
          {rotated ? "oPenIcon" : "cIcon"}
        </div>
        {rotated && <ChatFloatingContainer />}
      </div>
    </div>
  );
};

export default ChatBot;
