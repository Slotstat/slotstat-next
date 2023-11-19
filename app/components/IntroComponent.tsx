"use client";
import Image from "next/image";
import React, { useState } from "react";
import { laptop, triangle } from "../assets";
import { Switch } from "@headlessui/react";
import { motion } from "framer-motion";

export default function IntroComponent() {
  const [enabled, setEnabled] = useState(true);
  const [openVideo, setOpenVideo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div>
      <div className="flex justify-between text-grey1">
        <p>video tutorial</p>
        <div className="flex items-center">
          <p className="mr-2">video tutorial</p>
          <Switch
            checked={enabled}
            onChange={setEnabled}
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
      </div>

      <motion.div
        animate={{ height: enabled ? 202 : 0 }}
        className="bg-dark2 rounded-2xl  my-6 overflow-hidden  "
      >
        <div className=" flex justify-between  lg:m-12 lg:h-28">
          <div className="hidden flex-col justify-center md:flex">
            <h1 className="text-white text-3xl mb-6">
              Todays slot games statistics by Slotstat
            </h1>
            <p className="text-grey1">
              We publish information about slot games, payout percentage, number
              of winning spins and jackpots... Read more
            </p>
          </div>
          <div
            className="relative cursor-pointer lg:h-[106px] "
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => setOpenVideo(true)}
          >
            <Image
              className="hidden lg:flex"
              src={laptop}
              alt="slotstat video cover"
              width={306}
              height={106}
            />
            <Image
              className="lg:hidden flex"
              src={laptop}
              alt="slotstat video cover"
              objectFit="cover"
              // width={306}
              // height={106}
            />
            <div
              className={`${
                isHovered ? "bg-dark1/70" : "bg-dark1/50"
              }  absolute top-0 bottom-0 right-0 left-0 rounded-xl flex justify-center items-center`}
            >
              <div className="flex text-white items-center text-base">
                <span>Watch now</span>
                <Image
                  src={triangle}
                  alt="triangle"
                  width={16}
                  height={16}
                  className="ml-2 w-4 h-4 bg-black"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      {openVideo && (
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
      )}
    </div>
  );
}
