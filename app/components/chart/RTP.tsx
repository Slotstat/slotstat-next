"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function RTP() {
  const [angle, setAngle] = useState(45);

  useEffect(() => {
    const interval = setInterval(() => {
      function biasedRandomNumber() {
        const range70to110 = Math.random() * 40 + 70;
        const otherRange = Math.random() * 180;

        // Choose between the two ranges with a probability of 70% for 70-110 range
        const number = Math.random() < 0.7 ? range70to110 : otherRange;
        return Number(number.toFixed(2));
      }
      setAngle(biasedRandomNumber());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-4 py-6 lg:py-18 lg:w-1/4 md:w-full  sm:w-full">
      <h3 className=" flex flex-1 items-center justify-between text-[24px] font-bold text-white h-[48px]">
        RTP
      </h3>
      <div className="rounded-3xl bg-dark2 p-4 mt-6">
        <div className="rounded-3xl bg-dark1 flex flex-col items-center p-6">
          <p className=" text-lg text-white text-center mb-14">
            Adjarabet Fruity time
          </p>
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={210}
              height={105}
              fill="none"
            >
              <path
                fill="url(#a)"
                d="M210 105c0-13.526-2.716-26.92-7.993-39.416-5.276-12.497-13.011-23.852-22.761-33.416-9.75-9.564-21.325-17.151-34.064-22.328A106.772 106.772 0 0 0 105 2a106.773 106.773 0 0 0-40.182 7.84C52.08 15.017 40.504 22.604 30.754 32.168S13.269 53.088 7.993 65.584A101.299 101.299 0 0 0 0 105h210Z"
              />
              <path
                fill="#5887F6"
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
                RTP 96.5%
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
                {angle}%
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
                Casino is in profit
              </text>
              <defs>
                <linearGradient
                  id="a"
                  x1={105}
                  x2={105}
                  y1={-119.948}
                  y2={105}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#5887F6" stopOpacity={0.71} />
                  <stop offset={1} stopColor="#5887F6" stopOpacity={0} />
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
              <div className=" w-4 h-4 bg-blue1 rounded-lg -mt-2 -ml-2" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
