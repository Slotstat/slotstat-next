"use client";
import Image from "next/image";
import React, { useState } from "react";
import { laptop, triangle } from "../assets";
import { Switch } from "@headlessui/react";
import { motion } from "framer-motion";

export default function IntroComponent() {
  const [enabled, setEnabled] = useState(true);
  return (
    <div>
      <div className="flex justify-between text-grey1">
        <p>IntroComponent</p>
        <div className="flex items-center">
          <p className="mr-2">video tutorial</p>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${enabled ? "bg-blue1" : "bg-dark2"}
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
        <div className="h-28 flex justify-between  m-12">
          <div>
            <h1 className="text-white text-3xl mb-6">
              Todays slot games statistics by Slotstat
            </h1>
            <p className="text-grey1">
              We publish information about slot games, payout percentage, number
              of winning spins and jackpots... Read more
            </p>
          </div>
          <div className="relative">
            <Image
              src={laptop}
              alt="slotstat video cover"
              width={306}
              height={106}
            />
            <div className="absolute top-0 bottom-0 right-0 left-0  bg-dark1/50 flex justify-center items-center">
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
    </div>
  );
}
