import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type RTPListingProps = {
  provider: string;
  rtp: RTP;
};

export default function RTPListing({ provider, rtp }: RTPListingProps) {
  const { value, preferredValue, max, min } = rtp;
  const [RTP, setRTP] = useState(value);

  useEffect(() => {
    const interval = setInterval(() => {
      function biasedRandomNumber() {
        // const range70to110 = Math.random() * 20 + 80;
        const otherRange = Math.random() * 40 + 80;

        // Choose between the two ranges with a probability of 70% for 70-110 range
        // const number = Math.random() < 0.7 ? range70to110 : otherRange;
        return Number(otherRange.toFixed(2));
      }
      setRTP(biasedRandomNumber());
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const casinoLoosingIndicatorSizeCounter =
    (RTP - preferredValue) * (150 / (max - preferredValue));
  const casinoWiningIndicatorSizeCounter =
    (preferredValue - RTP) * (150 / (preferredValue - min));

  return (
    <div>
      <div className=" flex flex-row justify-between mb-3">
        <div className=" flex flex-row">
          <p className=" min-w-[64px]">{RTP}%</p>
          <p className=" mr-1">/</p>
          <p className=" text-grey1">{preferredValue}%</p>
        </div>
        <p>{provider}</p>
      </div>
      <div className=" flex flex-row">
        <div className="w-[150px] h-1 bg-blue1/30 mr-1 flex justify-end">
          <motion.div
            className=" h-1 bg-blue1 "
            initial={false}
            animate={{
              width:
                RTP < preferredValue ? casinoWiningIndicatorSizeCounter : 0,
            }}
          ></motion.div>
        </div>
        <div className="w-[150px] h-1 bg-blue1/30 ">
          <motion.div
            className=" h-1 bg-blue1 "
            initial={false}
            animate={{
              width:
                RTP > preferredValue ? casinoLoosingIndicatorSizeCounter : 0,
            }}
          ></motion.div>
        </div>
      </div>
    </div>
  );
}
