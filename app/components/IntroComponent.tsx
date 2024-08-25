"use client";
import React, { useEffect, useState } from "react";
import { triangle, videoThumb } from "../assets";
// import { Switch } from "@headlessui/react";
import { motion } from "framer-motion";
// import { setCookie, getCookie } from "cookies-next";
import YouTube from "react-youtube";

export default function IntroComponent() {
  // const [selectedValue, setSelectedValue] = useState("erti");
  // const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  // const [enabled, setEnabled] = useState(true);
  const [openVideo, setOpenVideo] = useState(false);
  // useEffect(() => {
  //   if (getCookie("videoOpen") == "true") {
  //     setEnabled(true);
  //   } else if (getCookie("videoOpen") == "false") {
  //     setEnabled(false);
  //   }
  // }, []);

  const [dimensions, setDimensions] = useState({
    width: "100%",
    height: "360",
  });

  useEffect(() => {
    function handleResize() {
      const width = Math.min(window.innerWidth - 30, 1140); // Max width of 640, with some padding
      const height = Math.round((width / 16) * 9); // 16:9 aspect ratio
      setDimensions({ width: `${width}px`, height: `${height}px` });
    }

    handleResize(); // Set initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const opts = {
    width: dimensions.width,
    height: dimensions.height,
    playerVars: {
      autoplay: 1,
      rel: 0,
    },
  };

  return (
    <div>
      {/* <div className="flex justify-between text-grey1">
        <div className="flex items-center">
          <p className="mr-2">Video tutorial</p>
          <Switch
            checked={enabled}
            onChange={(sw) => {
              setEnabled(sw);
              setCookie("videoOpen", sw);
            }}
            className={`${enabled ? "bg-blue1" : "bg-grey3"}
          relative inline-flex h-[24px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${enabled ? "translate-x-4" : "translate-x-0"}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>
      </div> */}

      <div className="flex md:flex-row flex-col justify-between my-3 ">
        <div className=" flex-col justify-center md:flex">
          <div className="flex justify-between mb-1 md:mb-4">
            <h1 className="text-white text-base font-bold md:text-3xl ">
              Play Informed
            </h1>
          </div>
          <h2 className="text-grey1 md:w-3/4 text-xs md:text-base">
            Slotstat offers real-time data on slot games through dynamic live
            stats, including Win Spin Rate, RTP, and Slot Profit Status.
            Observe, analyze, strategize, and play it full with Slotstat.
          </h2>
        </div>

        <div
          onClick={() => setOpenVideo(true)}
          className="relative h-[137px] w-full mt-3 rounded-xl overflow-hidden cursor-pointer md:w-[306px] md:min-w-[306px] md:h-[169px]  md:mt-0  "
        >
          <img
            src={videoThumb.src}
            alt="Video tutorial background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-row justify-center items-center bg-dark1/25 hover:bg-dark1/40">
            <div className="text-white text-xs md:text-base font-bold">Video tutorial</div>
            <img src={triangle.src} className="h-4 w-4 md:h-6 md:w-6" />
          </div>
        </div>
      </div>

      {openVideo && (
        <div
          onClick={() => setOpenVideo(false)}
          className=" bg-dark1/80 top-0 bottom-0 right-0 left-0 fixed z-10 flex items-center justify-center"
        >
          <div onClick={(e) => e.stopPropagation()} className="">
            {/* <video controls className=" rounded-2xl">
              <source
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
            </video> */}
            <YouTube videoId={"uQ948MFeWmk"} opts={opts} />
          </div>
        </div>
      )}
    </div>
  );
}
