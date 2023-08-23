"use client";
import React, { useEffect, useState } from "react";
import signalR from "@/app/utils/singlar";
import useStore from "../(store)/store";
import Image from "next/image";
import { close, moneyBag } from "../assets";
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

      // an array of month names
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
      <div className="z-10 w-[400px] fixed right-0 rounded-xl border border-grey1 p-6 bottom-0 mr-5 mb-5 sm:mr-6 sm:mb-6 shadow-2xl bg-dark2">
        <div className="flex justify-between mb-3">
          <Image
            src={moneyBag}
            alt=""
            className="h-9 w-9"
            width={36}
            height={36}
          />
          <button
            className="flex items-center justify-center"
            onClick={() => {
              setShowNotification(false);
            }}
          >
            <Image
              src={close}
              alt=""
              className="h-6 w-6"
              width={24}
              height={24}
            />
          </button>
        </div>

        <div className="flex flex-col my-3 text-sm">
          <h4 className=" text-green1  font-black mb-2">
            <CountUp
              start={0}
              end={Number(jackpotHasBeenDrawn?.amount)}
              duration={1.5}
              separator=" "
              decimals={2}
              decimal="."
              prefix={`${jackpotHasBeenDrawn?.ccy} `}
              delay={0}
            >
              {({ countUpRef }) => (
                <div>
                  <span ref={countUpRef} />
                </div>
              )}
            </CountUp>
          </h4>
          <h6 className=" text-grey1 font-black ">{t("notification")}</h6>
        </div>

        <div className="flex flex-row justify-between text-sm">
          <h3 className=" text-white font-black  ">
            {jackpotHasBeenDrawn?.casinoName} / {jackpotHasBeenDrawn?.provider}
          </h3>
          <div className=" text-grey1 font-black">{time}</div>
        </div>
      </div>
    );
  }
  return;
}
