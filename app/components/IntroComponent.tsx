"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { triangle } from "../assets";
import { Switch } from "@headlessui/react";
import { motion } from "framer-motion";
import { setCookie, getCookie } from "cookies-next";
import VideoButton from "../assets/svg/VideoButton";
const data = ["erti", "ori", "sami", "otxi", "xuti", "eqvsi"];
export default function IntroComponent() {
  const [selectedValue, setSelectedValue] = useState("erti");
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  // const [enabled, setEnabled] = useState(true);
  // const [openVideo, setOpenVideo] = useState(false);
  // const [isHovered, setIsHovered] = useState(false);
  // useEffect(() => {
  //   if (getCookie("videoOpen") == "true") {
  //     setEnabled(true);
  //   } else if (getCookie("videoOpen") == "false") {
  //     setEnabled(false);
  //   }
  // }, []);

  // const handleMouseEnter = () => {
  //   setIsHovered(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsHovered(false);
  // };
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

      <motion.div
        // animate={{ height: enabled ? "auto" : 0 }}
        // animate={{ height: enabled ? 202 : 0 }}
        className="overflow-hidden"
      >
        <div className="flex justify-between my-3 ">
          <div className=" flex-col justify-center md:flex">
            <div className="flex justify-between mb-4">
              <h1 className="text-white text-base font-bold md:text-3xl ">
                Play at Full Resolution
              </h1>
              <div className="flex ">
                {/* <p className="text-grey1 text-xs  mr-2 mt-1">Video Tutorial</p>
                <a href={""} target="_blank">
                  <VideoButton />
                </a> */}
              </div>
            </div>
            <p className="text-grey1 md:w-3/4 text-xs md:text-base">
              SlotStat provides real-time data about slot games through dynamic
              statistics, including Win Spin Rate, RTP, and Slot Profit Status.
              Observe, analyze, strategize, and play it full via SlotStat.
            </p>
          </div>
          {/* <div
            className="relative cursor-pointer md:h-[106px] "
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => setOpenVideo(true)}
          >
            <Image
              className="hidden md:flex"
              src={laptop}
              alt="slotstat video cover"
              width={306}
              height={106}
            />
            <Image
              className="flex md:hidden "
              src={laptop}
              alt="slotstat video cover"
              objectFit="cover"
            />
            <div
              className={`${
                isHovered ? "bg-dark1/70" : "bg-dark1/50"
              }  absolute top-0 bottom-0 right-0 left-0 rounded-xl flex justify-center items-center`}
            >
              <div className="flex text-white items-center text-base">
                <span>Play</span>
                <Image
                  src={triangle}
                  alt="triangle"
                  width={16}
                  height={16}
                  className="ml-2 w-4 h-4"
                />
              </div>
            </div>
          </div> */}
        </div>
      </motion.div>
      {/* {openVideo && (
        <div
          onClick={() => setOpenVideo(false)}
          className=" bg-dark1/80 top-0 bottom-0 right-0 left-0 fixed z-10 flex items-center justify-center"
        >
          <div onClick={(e) => e.stopPropagation()} className="">
            <video controls className=" rounded-2xl">
              <source
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      )} */}
    </div>
  );
}
