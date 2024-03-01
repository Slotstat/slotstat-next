import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useStore from "@/app/(store)/store";

const SPS = ({ rtp }: RTPListingProps) => {
  const { value, preferredValue, max, min, id } = rtp;
  const { newRtp } = useStore();

  const [RTP, setRTP] = useState<number>(value);

  useEffect(() => {
    if (newRtp && newRtp.rtpId === id) {
      const { value } = newRtp;
      setRTP(value);
    }
  }, [newRtp]);

  if (RTP > preferredValue) {
    return <div> + {(RTP - preferredValue).toFixed(2)}%</div>;
  } else if (RTP < preferredValue) {
    return <div> - {(preferredValue - RTP).toFixed(2)}%</div>;
  } else {
    return <div>neutral</div>;
  }
};

export default SPS;
