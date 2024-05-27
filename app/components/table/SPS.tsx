import React, { useEffect, useState } from "react";
import useStore from "@/app/(store)/store";

const AvoidRenders = ({
  RTP,
  setPrevSPS,
  setPrevRTP,
  setRTP,
  id,
  setSPS,
  calculateSPS,
}: any) => {
  const { newRtp } = useStore();

  useEffect(() => {
    if (newRtp && newRtp.rtpId === id) {
      const { value } = newRtp;
      setTimeout(() => {
        setPrevSPS(calculateSPS(RTP));
        setSPS(calculateSPS(value));
        setPrevRTP(RTP);
        setRTP(value);
      }, 10000);
    }
  }, [newRtp]);

  return <></>;
};

const SPS = ({
  rtp,
  // rtpChange,
  // rtpState,
  sps,
}: {
  rtp: RTP;
  rtpChange: number;
  rtpState: number;
  sps: number;
}) => {
  const { value, preferredValue, previousValue, id } = rtp;

  const [RTP, setRTP] = useState<number>(value);
  const [prevRTP, setPrevRTP] = useState(previousValue);
  const [prevSPS, setPrevSPS] = useState<number>();
  const [SPS, setSPS] = useState<number>(sps);

  const calculateSPS = (rtp: number) => {
    if (rtp > preferredValue) {
      return -(rtp - preferredValue);
    } else if (rtp < preferredValue) {
      return preferredValue - rtp;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    setPrevSPS(calculateSPS(prevRTP));
    setRTP(value);
    setPrevRTP(previousValue);
  }, []);

  // useEffect(() => {
  // }, [previousValue]);

  const renderSPSNow = () => {
    if (RTP > preferredValue) {
      return <div> - {(RTP - preferredValue).toFixed(2)}%</div>;
    } else if (RTP < preferredValue) {
      return <div> + {(preferredValue - RTP).toFixed(2)}%</div>;
    } else {
      return <div>neutral</div>;
    }
  };

  const renderPrevSPS = () => {
    if (prevRTP > preferredValue) {
      return <div>PS - {(prevRTP - preferredValue).toFixed(2)}%</div>;
    } else if (prevRTP < preferredValue) {
      return <div>PS + {(preferredValue - prevRTP).toFixed(2)}%</div>;
    } else {
      return <div>neutral</div>;
    }
  };

  const renderSPSDiff = () => {
    let spsDiff: number;
    let colorIndicator: string;

    if (prevSPS && SPS > prevSPS) {
      spsDiff = SPS - prevSPS;
      colorIndicator = "text-green1";
    } else if (prevSPS && SPS < prevSPS) {
      spsDiff = SPS - prevSPS;
      colorIndicator = "text-red";
    } else {
      spsDiff = 0;
      colorIndicator = "text-white";
    }

    // const colorIndicator =
    //   prevRTP < RTP ? "text-green1" : prevRTP > RTP ? " text-red" : "text-white";
    return (
      <div>
        <div className={`${colorIndicator} text-xs text-end`}>
          {spsDiff > 0 && "+"}
          {spsDiff.toFixed(2)}%
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderSPSNow()}
      {/* <div>
        {sps > 0 && "+"}
        {sps}%
      </div> */}
      {/* <div>{renderPrevSPS()}</div> */}
      {renderSPSDiff()}
      {/* <div>R{RTP}</div>
      <div>PR{prevRTP}</div>
      // difference between PrevRTP and NowRTP
      <div className={`${colorIndicator} text-xs text-end`}>
        {prevRTP < RTP
          ? "+" + (RTP - prevRTP).toFixed(2)
          : prevRTP > RTP
          ? "-" + (prevRTP - RTP).toFixed(2)
          : 0}
        %
      </div> */}
      <AvoidRenders
        RTP={RTP}
        preferredValue={preferredValue}
        setPrevSPS={setPrevSPS}
        setPrevRTP={setPrevRTP}
        setRTP={setRTP}
        id={id}
        setSPS={setSPS}
        calculateSPS={calculateSPS}
      />
    </div>
  );
};

export default SPS;
