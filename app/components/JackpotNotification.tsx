"use client";
import React, { useEffect, useState } from "react";
import signalR from "@/app/utils/singlar";
import useStore from "../(store)/store";
import Image from "next/image";
import { close } from "../assets";
import CountUp from "react-countup";
import { useTranslations } from "next-intl";

export default function JackpotNotification() {
  const t = useTranslations("notification");

  const { isOn, jackpotHasBeenDrawn } = useStore();
  const [showNotification, setShowNotification] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    if (!isOn) {
      signalR();
    }
    if (jackpotHasBeenDrawn) {
      setShowNotification(true);
      // Get current date and time
      var currentDate = new Date();

      // Create an array of month names
      var monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      // Extract individual components
      var day = currentDate.getDate();
      var monthIndex = currentDate.getMonth();
      var year = currentDate.getFullYear();
      var hours = currentDate.getHours();
      var minutes = currentDate.getMinutes();
      var seconds = currentDate.getSeconds();

      // Format the date and time
      var formattedDate = day + " " + monthNames[monthIndex] + ". " + year;
      var formattedTime = hours + ":" + minutes + ":" + seconds;

      // Combine the formatted date and time
      var formattedDateTime = formattedDate + " - " + formattedTime;
      setTime(formattedDateTime);
    }
  }, [isOn, jackpotHasBeenDrawn]);

  if (showNotification) {
    return (
      <div className="z-10 fixed right-0 rounded-xl border border-green1 p-5 bottom-0 mr-5 mb-5 sm:mr-6 sm:mb-6 shadow-2xl bg-dark2  ">
        <div className="flex justify-between ">
          <div className=" text-grey1 font-black">{time}</div>
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
            {t("notification")}
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
            <CountUp
              start={0}
              end={Number(jackpotHasBeenDrawn?.amount)}
              duration={1.5}
              separator=" "
              decimals={2}
              decimal="."
              prefix={`${jackpotHasBeenDrawn?.ccy} `}
              // suffix=" left"
              // onEnd={}
              delay={0}
            >
              {({ countUpRef }) => (
                <div>
                  <span ref={countUpRef} />
                </div>
              )}
            </CountUp>
          </h1>
        </div>
      </div>
    );
  }
  return;
}
