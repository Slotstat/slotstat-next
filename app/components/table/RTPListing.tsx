import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useStore from "@/app/(store)/store";

type RTPListingProps = {
  provider: string;
  rtp: RTP;
};

export default function RTPListing({ provider, rtp }: RTPListingProps) {
  const { value, preferredValue, max, min, id } = rtp;
  const { newRtp } = useStore();

  const [RTP, setRTP] = useState<number>(value);

  useEffect(() => {
    if (newRtp && newRtp.rtpId === id) {
      const { value } = newRtp;
      setRTP(value);
    }
  }, [newRtp]);

  const RTPindicatorWidth = 80;

  const casinoLoosingIndicatorSizeCounter =
    (RTP - preferredValue) * (RTPindicatorWidth / (max - preferredValue));
  const casinoWiningIndicatorSizeCounter =
    (preferredValue - RTP) * (RTPindicatorWidth / (preferredValue - min));

  return (
    <div className="mr-6 text-xs md:text-base ">
      <div className=" flex flex-row justify-between mb-3">
        <div className=" flex flex-row">
          <p className=" min-w-[54px]">{preferredValue}%</p>
          <p className=" mr-2">/</p>
          <p className=" text-grey1">{RTP}%</p>
        </div>
        {/* <p>{provider}</p> */}
      </div>
      <div className=" flex flex-row">
        <div
          style={{ width: RTPindicatorWidth }}
          className={` h-1 bg-blue1/30 mr-1 flex justify-end`}
        >
          <motion.div
            className=" h-1 bg-blue1"
            initial={false}
            animate={{
              width:
                RTP < preferredValue ? casinoWiningIndicatorSizeCounter : 0,
            }}
          ></motion.div>
        </div>
        <div
          style={{ width: RTPindicatorWidth }}
          className={` h-1 bg-blue1/30`}
        >
          <motion.div
            className=" h-1 bg-blue1"
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
