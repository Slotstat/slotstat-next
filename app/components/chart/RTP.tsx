"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useStore from "@/app/(store)/store";
import { useTranslations } from "next-intl";
import Plus from "@/app/assets/svg/Plus";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import CloseRed from "@/app/assets/svg/CloseRed";

export default function RTP({
  color,
  gameObject,
  onPressCompare,
  setOpen,
  onPressRemove,
}: {
  color: string;
  gameObject?: GameData;
  onPressCompare?: () => void;
  setOpen?: (trueFalse: boolean) => void;
  onPressRemove?: () => void;
}) {
  const t = useTranslations("RTP");

  const RTPCenterAngle = 90;
  const { newRtp } = useStore();
  const [angle, setAngle] = useState<number>();
  const [RTP, setRTP] = useState<number>();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const whichToRender = () => {
    if (gameObject?.rtp && RTP) {
      return (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="rounded-3xl bg-dark1 h-[233px] flex flex-col items-center pt-4 lg:p-6 relative"
        >
          {setOpen && isHovered && (
            <div
              className="absolute top-0 bottom-0  z-1"
              onClick={onPressRemove}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                cursor="pointer"
              >
                <rect
                  width="100%"
                  height="100%"
                  fill="#202227"
                  fillOpacity={0.9}
                  stroke="#FA4611"
                  strokeDasharray="5 5"
                  rx={23.5}
                  className=" z-6"
                />
              </svg>
              <div className=" absolute cursor-pointer w-full h-full top-0 flex flex-col items-center justify-center">
                <CloseRed />
                <p className="text-[#FA4611] mt-2">{t("close")}</p>
              </div>
            </div>
          )}
          <p className="text-lg text-white text-center mb-8 h-12">
            {gameObject?.casinoName} {gameObject?.name}
          </p>
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={210}
              height={105}
              fill="none"
            >
              <path
                fill={`url(#${color})`}
                d="M210 105c0-13.526-2.716-26.92-7.993-39.416-5.276-12.497-13.011-23.852-22.761-33.416-9.75-9.564-21.325-17.151-34.064-22.328A106.772 106.772 0 0 0 105 2a106.773 106.773 0 0 0-40.182 7.84C52.08 15.017 40.504 22.604 30.754 32.168S13.269 53.088 7.993 65.584A101.299 101.299 0 0 0 0 105h210Z"
              />
              <path
                fill={color}
                d="M100.047 1.072a.975.975 0 0 0-1.028-.976 104.937 104.937 0 0 0-34.204 7.829 104.993 104.993 0 0 0-34.064 22.78A105.08 105.08 0 0 0 7.99 64.792 105.14 105.14 0 0 0 0 105h1.981a103.19 103.19 0 0 1 7.843-39.462 103.118 103.118 0 0 1 22.334-33.452 103.014 103.014 0 0 1 33.421-22.35 102.942 102.942 0 0 1 33.533-7.678.99.99 0 0 0 .935-.986ZM108.962 1.02c0 .528.417.961.945.986a102.945 102.945 0 0 1 34.514 7.73 103.016 103.016 0 0 1 33.421 22.35 103.113 103.113 0 0 1 22.334 33.452A103.189 103.189 0 0 1 208.019 105H210a105.14 105.14 0 0 0-7.991-40.207 105.09 105.09 0 0 0-22.759-34.089 104.996 104.996 0 0 0-34.065-22.78 104.94 104.94 0 0 0-35.203-7.88.975.975 0 0 0-1.02.976Z"
              />
              <path
                fill="#24262C"
                d="M63 22a4 4 0 0 1 4-4h30.768a4 4 0 0 0 3.726-2.545l1.757-4.498a1.505 1.505 0 0 1 2.807.01l1.708 4.463a4 4 0 0 0 3.736 2.57H144a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H67a4 4 0 0 1-4-4V22Z"
              />
              <text
                x="50%"
                y="34%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill={"#969CB0"}
                fontWeight={900}
                fontSize="14"
                fontFamily="modernist"
              >
                RTP {gameObject?.rtp?.preferredValue}%
              </text>
              <text
                x="50%"
                y="70%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill={"white"}
                fontSize="28"
                fontFamily="modernist"
              >
                {RTP}%
              </text>
              <text
                x="50%"
                y="90%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill={"#969CB0"}
                fontWeight={400}
                fontSize="12"
                fontFamily="modernist"
              >
                {RTP === gameObject.rtp.preferredValue
                  ? t("neutral")
                  : RTP > gameObject.rtp.preferredValue
                  ? t("CasinoIsLosing")
                  : t("CasinoIsInProfit")}
              </text>
              <defs>
                <linearGradient
                  id={color}
                  x1={105}
                  x2={105}
                  y1={-119.948}
                  y2={105}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor={color} stopOpacity={0.71} />
                  <stop offset={1} stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
            </svg>
            <motion.div
              style={{
                width: 105,
                height: 0,
                backgroundColor: "blue",
                position: "absolute",
                left: 0,
                top: "100%",
                transformOrigin: "right center",
                transform: `rotate(${angle}deg)`,
                transition: "transform 0.5s ease-in-out",
              }}
            >
              <div
                className=" w-4 h-4 rounded-lg -mt-2 -ml-2"
                style={{ backgroundColor: color }}
              />
            </motion.div>
          </div>
        </div>
      );
    } else if (gameObject && !gameObject.rtp) {
      return (
        <div className="rounded-3xl bg-dark1 h-[233px] flex flex-col justify-center px-4 items-center text-white text-center">
          {t("provideInfo")}
        </div>
      );
    } else if (gameObject?.rtp && !RTP) {
      return (
        <SkeletonTheme baseColor="#24262C" highlightColor="#444">
          <section>
            <Skeleton count={1} className=" h-[233px] rounded-2xl" />
          </section>
        </SkeletonTheme>
      );
    } else {
      return (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative rounded-3xl bg-dark1 h-[233px] flex flex-col items-center "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            cursor="pointer"
          >
            <rect
              width="100%"
              height="100%"
              fill="#202227"
              stroke="#fff"
              strokeDasharray="5 5"
              rx={23}
            />
          </svg>
          <div
            onClick={onPressCompare}
            className="absolute cursor-pointer w-full h-full flex flex-col items-center justify-center"
          >
            <Plus fill={`${isHovered ? "#969CB0" : "#fff"} `} />
            <p className={`${isHovered ? "text-grey1" : "text-white"}  mt-2`}>
              {t("Compare")}
            </p>
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    if (gameObject?.rtp) {
      setAngle(
        gameObject.rtp.value - (gameObject.rtp.preferredValue - RTPCenterAngle)
      );
      setRTP(gameObject.rtp.value);
    }
  }, []);

  useEffect(() => {
    if (newRtp && gameObject?.rtp && newRtp.rtpId === gameObject.rtp.id) {
      const { value } = newRtp;
      const { preferredValue, max, min } = gameObject.rtp;

      if (value > preferredValue) {
        const casinoLoosingIndicatorSizeCounter =
          RTPCenterAngle +
          (value - preferredValue) * (RTPCenterAngle / (max - preferredValue));
        setAngle(casinoLoosingIndicatorSizeCounter);
      } else if (value < preferredValue) {
        const casinoWiningIndicatorSizeCounter =
          RTPCenterAngle -
          (preferredValue - value) * (RTPCenterAngle / (preferredValue - min));
        setAngle(casinoWiningIndicatorSizeCounter);
      } else {
        setAngle(RTPCenterAngle);
      }

      setRTP(value);
    }
  }, [newRtp]);

  return (
    <div className=" w-full">
      <div className="rounded-3xl bg-dark2 mt-6 p-4 lg:p-6 ">
        {whichToRender()}
      </div>
    </div>
  );
}
