import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useStore from "@/app/(store)/store";

const SPS = ({
  rtp,
  rtpChange,
  rtpState,
  sps,
}: {
  rtp: RTP;
  rtpChange: number;
  rtpState: number;
  sps: number;
}) => {
  const { value, preferredValue, previousValue, id } = rtp;
  const { newRtp } = useStore();

  const [RTP, setRTP] = useState<number>(value);
  const [prevRTP, setPrevRTP] = useState(previousValue);

  useEffect(() => {
    // let newRTPtimeout: NodeJS.Timeout;
    if (newRtp && newRtp.rtpId === id) {
      const { value } = newRtp;
      // newRTPtimeout =
      setTimeout(() => {
        setPrevRTP(RTP);
        setRTP(value);
      }, 10000);
    }
    // return () => {
    //   if (newRTPtimeout) {
    //     clearTimeout(newRTPtimeout);
    //   }
    // };
  }, [newRtp]);

  useEffect(() => {
    setRTP(value);
  }, [value]);

  useEffect(() => {
    setPrevRTP(previousValue);
  }, [previousValue]);

  const colorIndicator =
    prevRTP < RTP ? "text-green1" : prevRTP > RTP ? " text-red" : "text-white";

  // const renderDifferenceNow = () => {
  //   if (RTP > preferredValue) {
  //     return <div> - {(RTP - preferredValue).toFixed(2)}%</div>;
  //   } else if (RTP < preferredValue) {
  //     return <div> + {(preferredValue - RTP).toFixed(2)}%</div>;
  //   } else {
  //     return <div>neutral</div>;
  //   }
  // };

  return (
    <div>
      {/* {renderDifferenceNow()} */}
      <div>
        {sps > 0 && "+"}
        {sps}
      </div>

      <div className={`${colorIndicator} text-xs text-end`}>
        {prevRTP < RTP
          ? "+" + (RTP - prevRTP).toFixed(2)
          : prevRTP > RTP
          ? "-" + (prevRTP - RTP).toFixed(2)
          : 0}
        %
      </div>
    </div>
  );
};

export default SPS;
