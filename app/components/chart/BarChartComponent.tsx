import React, { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  TooltipProps,
} from "recharts";

import NewRTPWidget from "./NewRTPWidget";
import getRTPWSRClientSide from "@/lib/clientSide/getRTPWSRClientSide";
import TooltipComponent from "../TooltipComponent";
import ShareButtons from "../ShareButtons";

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl p-2 shadow-lg bg-white text-black space-y-1 w-52">
        <p className="text-xs text-dark2 flex justify-between ">
          <span>Date:</span>{" "}
          <span>
            <strong>{label}</strong> - 23:59:59
          </span>
        </p>
        {payload.map((entry) => (
          <div
            key={entry.name}
            className={`rounded p-1 flex justify-between text-xs text-dark2`}
            style={{ backgroundColor: entry.color }}
          >
            <div className="">{entry.name}:</div> <strong>{entry.value} %</strong>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function BarChartComponent({ mainGame }: { mainGame: GameData }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [gameData, setGameData] = useState<any>(null);

  const getStatisticOfGame = async () => {
    const gamesListData: Promise<RTPWSRData> = getRTPWSRClientSide();

    let game1000SpinData = await gamesListData;
    setGameData(game1000SpinData);
  };

  useEffect(() => {
    getStatisticOfGame();
  }, []);

  return (
    <div className="flex w-full  flex-row flex-wrap pb-12  h-auto">
      <div className="h-full bg-dark2 p-4 pt-3  rounded-xl shadow lg:w-3/4 w-full max-sm:rounded-b-[0px] max-sm:px-1 max-sm:py-[12px] max-sm:pb-[0px]">
        <div className="text-base font-bold text-white pb-3 pl-3">
          {mainGame.casinoName}/{mainGame.name}
        </div>
        <div className="h-[310px] w-full bg-dark1 rounded-xl">
          <div className="pt-3 px-3 flex justify-between">
            <div className="text-base font-bold text-white ">Insider Overview</div>
            <TooltipComponent
              big
              classN="max-sm:w-[16px] max-sm:h-[16px]"
              text={"On this chart each group of columns shows data per 1000 spin"}
            />
          </div>
          <div className="h-60 -ml-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={gameData}
                margin={{ top: 20, right: 20, left: 10, bottom: 5 }}
                onMouseLeave={() => setHoveredIndex(null)}
                onMouseMove={(state) => {
                  if (state?.isTooltipActive && state?.activeTooltipIndex !== undefined) {
                    setHoveredIndex(state.activeTooltipIndex);
                  }
                }}
              >
                <CartesianGrid stroke="#ffffff" strokeDasharray="3 3" strokeOpacity={0.1} />
                <XAxis dataKey="date" tick={false} axisLine={false} />
                <YAxis
                  tick={{ fill: "#9CA3AF", fontSize: 14 }} // light gray, adjust to your theme
                  tickFormatter={(value) => `${value} %`}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  content={
                    <CustomTooltip active={undefined} payload={undefined} label={undefined} />
                  }
                  cursor={{ fill: "#1a1b2078" }}
                />

                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="left"
                  iconType="square"
                  iconSize={16}
                  wrapperStyle={{
                    color: "#ffff", // text-gray-100
                    fontSize: 14,
                    fontWeight: 500,
                    paddingLeft: 20,
                    marginTop: 10,
                    display: "flex",
                    gap: 24,
                  }}
                />

                <Bar dataKey="rtp" name="RTP per 1000 spin" fill="#3b82f6" />
                <Bar dataKey="totalRtp" name="Live RTP all time" fill="#a78bfa" />
                <Bar dataKey="rate" name="Win spin rate" fill="#facc15" />
                {/* <Bar dataKey="rtp1000" name="RTP per 1000 spin">
                {data.map((_, index) => (
                  <Cell
                    key={`cell-r1-${index}`}
                    fill={hoveredIndex === index ? "#425FA3" : "#3b82f6"} // 🔴 red on hover, blue otherwise
                  />
                ))}
              </Bar>

              <Bar dataKey="rtpAllTime" name="RTP all time">
                {data.map((_, index) => (
                  <Cell
                    key={`cell-r2-${index}`}
                    fill={hoveredIndex === index ? "#524672" : "#a78bfa"}
                  />
                ))}
              </Bar>

              <Bar dataKey="winRate" name="Win spin rate">
                {data.map((_, index) => (
                  <Cell
                    key={`cell-r3-${index}`}
                    fill={hoveredIndex === index ? "#9B8A35" : "#facc15"}
                  />
                ))}
              </Bar> */}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="w-full lg:pl-5 lg:w-1/4">
        <NewRTPWidget color="#5887F6" gameObject={mainGame} />
        <div className="mt-4 flex justify-center md:hidden">
          <ShareButtons
            title={`${mainGame.casinoName} - ${mainGame.name}`}
            stats={{
              rtp: mainGame.rtp?.value ? Number(mainGame.rtp.value) : undefined,
              maxWin: mainGame.maxX,
            }}
          />
        </div>
      </div>
    </div>
  );
}
