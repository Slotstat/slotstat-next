"use client";
import React, { useEffect, useRef, useState } from "react";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import ChatFloatingContainer from "./ChatFloatingContainer";
import Image from "next/image";
import { close, closeMinus } from "../../assets";
import OutsideClickHandler from "react-outside-click-handler";

const ChatBot: React.FC = () => {
  const [rotated, setRotated] = useState(false);

  const handleClick = () => {
    setRotated(!rotated);
  };

  return (
    <div className="z-10 fixed bottom-5 right-0 lg:right-0 lg:bottom-0 mr-5 mb-5 lg:mr-6 lg:mb-6 ">
      <OutsideClickHandler
        onOutsideClick={() => {
          if (rotated) {
            setRotated(false);
          }
        }}
      >
        <div className="relative">
          <div
            onClick={handleClick}
            className={`lg:h-14 lg:w-14 h-10 w-10 rounded-lg lg:rounded-2xl  bg-blue1 flex items-center justify-center overflow-hidden cursor-pointer`}
          >
            <div
              className={`transform transition-transform duration-500 cursor-pointer ${
                rotated ? "rotate-180" : "rotate-0"
              }`}
            >
              {rotated ? (
                <Image
                  src={closeMinus}
                  alt=""
                  className={`lg:h-6 lg:w-6 h-4.5`}
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`lg:h-6 lg:w-6 h-4.5`}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#fff"
                    d="M20.433 10.186a4.982 4.982 0 00-.428-4.093 5.04 5.04 0 00-5.427-2.417A4.984 4.984 0 0010.819 2 5.04 5.04 0 006.013 5.49 4.985 4.985 0 002.68 7.906a5.04 5.04 0 00.62 5.909 4.982 4.982 0 00.428 4.092 5.04 5.04 0 005.427 2.418A4.981 4.981 0 0012.914 22a5.04 5.04 0 004.81-3.492 4.984 4.984 0 003.331-2.417 5.04 5.04 0 00-.621-5.907v.002zm-7.517 10.507a3.736 3.736 0 01-2.4-.868c.03-.016.084-.046.118-.067l3.983-2.3a.648.648 0 00.327-.567v-5.614l1.684.972a.06.06 0 01.032.046v4.65a3.753 3.753 0 01-3.744 3.748zm-8.053-3.44a3.732 3.732 0 01-.447-2.511c.03.017.082.05.118.07l3.983 2.3a.649.649 0 00.654 0l4.862-2.807v1.944a.062.062 0 01-.024.052l-4.025 2.324a3.752 3.752 0 01-5.12-1.372zM3.815 8.56a3.736 3.736 0 011.95-1.643l-.001.137v4.601a.648.648 0 00.327.566l4.862 2.807L9.269 16a.06.06 0 01-.056.005L5.186 13.68A3.752 3.752 0 013.814 8.56h.001zm13.829 3.218l-4.862-2.807 1.683-.972a.06.06 0 01.057-.005l4.026 2.325a3.75 3.75 0 01-.579 6.764v-4.738a.647.647 0 00-.325-.567zm1.675-2.521a5.397 5.397 0 00-.118-.07l-3.983-2.3a.648.648 0 00-.654 0L9.702 9.693V7.75a.062.062 0 01.024-.052l4.025-2.322a3.747 3.747 0 015.566 3.881h.002zM8.787 12.721l-1.684-.972a.06.06 0 01-.032-.046v-4.65a3.749 3.749 0 016.146-2.878 2.81 2.81 0 00-.118.067l-3.982 2.3a.646.646 0 00-.328.566l-.002 5.612v.001zm.914-1.97l2.166-1.252 2.165 1.25v2.501l-2.165 1.25L9.7 13.25v-2.5z"
                  ></path>
                </svg>
              )}
            </div>
          </div>
          {rotated && <ChatFloatingContainer setRotated={setRotated} />}
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default ChatBot;
