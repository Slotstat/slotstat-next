"use client";
import React, { useEffect, useState } from "react";
import signalR from "@/app/utils/singlar";
import useStore from "../(store)/store";
import Image from "next/image";
import { close } from "../assets";

export default function JackpotNotification() {
  const { isOn, jackpotHasBeenDrawn } = useStore();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (!isOn) {
      signalR();
    }
    if (jackpotHasBeenDrawn) {
      setShowNotification(true);
    }
  }, [isOn, jackpotHasBeenDrawn]);

  if (showNotification) {
    return (
      <div className="z-10 fixed right-0 rounded-xl border border-green1 p-5 bottom-0 mr-5 mb-5 sm:mr-6 sm:mb-6 shadow-2xl bg-dark2  ">
        <div className="flex justify-end">
          <button
            className="flex items-center justify-center"
            onClick={() => {
              setShowNotification(false);
            }}
          >
            <Image
              src={close}
              alt=""
              className="h-5 w-5"
              width={20}
              height={20}
            />
          </button>
        </div>
        <div className="flex flex-col items-center">
          <h2 className=" text-white text-lg font-black py-3 px-2">
            The jackpot has been drawn
          </h2>
          <h3 className=" text-white text-lg font-black px-2">
            {jackpotHasBeenDrawn?.casinoName}
          </h3>

          {jackpotHasBeenDrawn?.imageUrl && (
            <Image
              src={jackpotHasBeenDrawn?.imageUrl}
              alt=""
              className="h-8 w-8 py-2"
              width={32}
              height={32}
            />
          )}
          <h1 className=" text-green1 text-3xl font-black text-center">
            {jackpotHasBeenDrawn?.ccy} {jackpotHasBeenDrawn?.amount}
          </h1>
        </div>
      </div>
    );
  }
  return;
}
