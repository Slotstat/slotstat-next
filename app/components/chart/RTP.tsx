"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useStore from "@/app/(store)/store";
import { useTranslations } from "next-intl";
import Plus from "@/app/assets/svg/Plus";

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
      <div className="rounded-3xl bg-dark2 lg:p-6 mt-6">
        {gameObject?.rtp && RTP ? (
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`rounded-3xl bg-dark1 h-[233px] flex flex-col items-center lg:p-6 relative `}
          >
            {setOpen && isHovered && (
              <div
                className="absolute top-0 bottom-0  z-10"
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
                    className=" z-50"
                  />
                  <path
                    fill="#FA4611"
                    d="M116.194 139.14c-2.814 0-4.69-1.974-4.69-4.942s1.876-4.942 4.69-4.942c2.198 0 4.018 1.47 4.522 3.682h-1.232c-.434-1.54-1.75-2.562-3.29-2.562-2.058 0-3.43 1.526-3.43 3.822 0 2.296 1.372 3.822 3.43 3.822 1.638 0 2.982-1.12 3.346-2.786h1.218c-.462 2.338-2.296 3.906-4.564 3.906Zm5.914-.14v-9.604h1.12V139h-1.12Zm5.98.14c-2.114 0-3.514-1.456-3.514-3.64s1.4-3.64 3.514-3.64 3.514 1.456 3.514 3.64-1.4 3.64-3.514 3.64Zm0-.98c1.442 0 2.394-1.064 2.394-2.66s-.952-2.66-2.394-2.66c-1.442 0-2.394 1.064-2.394 2.66s.952 2.66 2.394 2.66Zm7.304.98c-1.806 0-3.024-1.008-3.052-2.52h1.05c.028.924.826 1.54 2.002 1.54 1.148 0 1.904-.448 1.904-1.12 0-.588-.392-.84-1.974-1.204-1.932-.434-2.534-.896-2.534-1.96 0-1.204 1.036-2.016 2.604-2.016 1.26 0 2.352.714 2.73 1.778l-1.022.252c-.21-.63-.896-1.05-1.708-1.05-.896 0-1.484.378-1.484.952 0 .476.392.728 1.652 1.036 2.156.448 2.842.966 2.842 2.156 0 1.288-1.204 2.156-3.01 2.156Zm7.53 0c-2.114 0-3.514-1.456-3.514-3.64s1.4-3.64 3.514-3.64 3.514 1.498 3.514 3.752l-.112.112h-5.782c.056 1.456 1.008 2.436 2.38 2.436 1.036 0 1.932-.616 2.24-1.54h1.12a3.478 3.478 0 0 1-3.36 2.52Zm-2.324-4.396h4.648c-.266-1.218-1.106-1.904-2.324-1.904-1.218 0-2.058.686-2.324 1.904Z"
                  />
                  <circle
                    cx={129}
                    cy={106}
                    r={9.5}
                    stroke="#FA4611"
                    transform="rotate(-90 129 106)"
                  />
                  <path
                    stroke="#FA4611"
                    strokeLinecap="round"
                    d="m126.3 108.7 5.357-5.357M131.657 108.7l-5.357-5.357"
                  />
                </svg>
              </div>
            )}
            <p className=" text-lg text-white text-center mb-8 h-12">
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
        ) : gameObject && !gameObject.rtp ? (
          <div className="rounded-3xl bg-dark1 h-[233px] flex flex-col justify-center px-4 items-center text-white text-center">
            {t("provideInfo")}
          </div>
        ) : (
          <div className="relative rounded-3xl bg-dark1 h-[233px] flex flex-col items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              cursor="pointer"
              onClick={onPressCompare}
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
            <div className="absolute cursor-pointer w-full h-full flex flex-col items-center justify-center">
              <Plus />
              <p className=" text-white mt-2"> {t("Compare")}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
