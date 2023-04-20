"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { back, close, live, remove } from "../../assets";
import { forward, fullscreen } from "../../assets";
import { CASINO_GAME_COLS } from "../table/columns";
import BulletIcon from "../BulletIcon";
import Image from "next/image";
import { Table } from "..";
import getStatistics from "@/lib/getStatistics";
import {
  FILTERS,
  SERIE_COLORS,
  createSerie,
  setChartParameters,
} from "./chartUtils";
import ActionPane from "./ActionPane";

am4core.useTheme(am4themes_animated);
am4core.addLicense("ch-custom-attribution");

const ChartComponent = ({
  dictionary,
  gameId,
  tableBodyData,
}: Dictionary & {
  gameId: string;
  tableBodyData: CasinoData[] | GameData[];
}) => {
  const chartRef = useRef<am4charts.XYChart | null>(null);
  const chartData = useRef<StatisticsData[]>([]);
  const [activeFilterId, setActiveFilterId] =
    useState<keyof typeof FILTERS>("All");

  const [open, setOpen] = useState(false);
  const [selectedGames, setSelectedGames] = useState([gameId]);

  const isCompare = useMemo(() => selectedGames.length > 1, [selectedGames]);

  const getAndCorrectStatisticsData = async (newGameId: string) => {
    const statisticsData: Promise<StatisticsData[]> = getStatistics(
      newGameId,
      activeFilterId
    );
    let statistics: StatisticsData[] = await statisticsData;

    for (let index = 0; index < statistics.length; index++) {
      statistics[index].date = new Date(statistics[index].date);
    }
    // needs to be reversed to correctly show charts.
    const test = statistics.reverse().slice(-100);

    return test;
  };

  useEffect(() => {
    const chart = am4core.create("chartdiv", am4charts.XYChart);
    let modifiedArrayWithOneOrTwoValue:
      | StatisticsData[]
      | { winRate2: number }[] = [];

    (async () => {
      if (selectedGames.length > 1) {
        const gameStatistics1 = getAndCorrectStatisticsData(selectedGames[0]);
        const gameStatistics2 = getAndCorrectStatisticsData(selectedGames[1]);

        const [game1, game2] = await Promise.all([
          gameStatistics1,
          gameStatistics2,
        ]);

        modifiedArrayWithOneOrTwoValue = [...game1];
        game2.map((elm, i) => {
          modifiedArrayWithOneOrTwoValue[i].winRate2 = elm.winRate;
        });
      } else {
        const statistics = await getAndCorrectStatisticsData(gameId);
        modifiedArrayWithOneOrTwoValue = statistics;
      }

      chartData.current = modifiedArrayWithOneOrTwoValue;
      chart.data = modifiedArrayWithOneOrTwoValue;
      setChartParameters(chart);

      if (modifiedArrayWithOneOrTwoValue[0].winRate2 != undefined) {
        const serie2 = chart.series.push(new am4charts.LineSeries());
        createSerie(serie2, "date", "winRate2", SERIE_COLORS[1]);
      }
      chartRef.current = chart;
    })();

    return () => {
      chart.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilterId]);

  const onPressCompare = () => {
    setOpen(true);
  };

  const onAddToCompare = async (compareGameId: string) => {
    setOpen(false);
    if (!isCompare) {
      setSelectedGames((prevState) => [...prevState, compareGameId]);
      const data = await getAndCorrectStatisticsData(compareGameId);

      const modifiedArrayWithNewKey = [...chartData.current];
      data.map((elm, i) => {
        modifiedArrayWithNewKey[i].winRate2 = elm.winRate;
      });

      if (chartRef.current?.data) {
        chartData.current = modifiedArrayWithNewKey;
        chartRef.current.data = modifiedArrayWithNewKey;
        const serie2 = chartRef.current.series.push(new am4charts.LineSeries());
        createSerie(serie2, "date", "winRate2", SERIE_COLORS[1]);
        chartRef.current.validateData();
      }
    }
  };

  const onPressRemove = () => {
    setSelectedGames([gameId]);
    if (chartRef.current?.data) chartRef.current.series.removeIndex(1);
  };

  return (
    <>
      <div className="px-4 py-6 lg:py-18 lg:px-18">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <h2 className="flex flex-1 items-center justify-between text-[24px] font-bold text-white">
            Adjarabet Fruity Time chart
          </h2>
          <div className="mt-3 flex items-center justify-between lg:mt-0">
            {selectedGames.length && (
              <div
                className="pointer flex items-center justify-center rounded-xl py-3 px-4"
                style={{ backgroundColor: SERIE_COLORS[0] + "3D" }}
              >
                <BulletIcon color={SERIE_COLORS[0]} size={20} />
                <span className="ml-2 text-sm font-bold leading-4 text-white">
                  EGT 1
                </span>
                <Image src={live} alt="" className="ml-3" />
              </div>
            )}
            {isCompare && (
              <div
                className="pointer ml-3 flex items-center justify-center rounded-xl py-3 px-4"
                style={{ backgroundColor: SERIE_COLORS[1] + "3D" }}
              >
                <BulletIcon color={SERIE_COLORS[1]} size={20} />
                <span className="ml-2 text-sm font-bold leading-4 text-white">
                  EGT 2
                </span>
                <Image src={live} alt="" className="ml-3" />
              </div>
            )}
          </div>
        </div>
        <div className="mt-6 rounded-3xl bg-dark2 p-6">
          <div className="rounded-3xl bg-dark1">
            <ActionPane
              dictionary={dictionary}
              selectedGames={selectedGames}
              onPressCompare={onPressCompare}
              onPressRemove={onPressRemove}
              activeFilterId={activeFilterId}
              onPressFilter={setActiveFilterId}
            />
            <div
              id="chartdiv"
              className="h-[550px] w-full rounded-3xl bg-dark1"
            ></div>
          </div>
        </div>
      </div>
      <BottomSheet
        snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight / 0.6]}
        open={open}
        onDismiss={() => {
          setOpen(false);
        }}
      >
        <div className="bg-dark1 py-8 px-4 lg:px-18">
          <div className="flex items-center justify-between">
            <button
              className="flex items-center justify-center rounded-xl bg-dark2 p-2 hover:bg-dark3"
              onClick={() => {
                setOpen(false);
              }}
            >
              <Image
                src={back}
                alt=""
                className="h-6 w-6"
                width={24}
                height={24}
              />
            </button>
            <span className=" text-2xl leading-4  text-white">
              Choose game from Adjarabet
            </span>

            <button
              className="flex items-center justify-center rounded-xl bg-dark2 p-2 hover:bg-dark3"
              onClick={() => {
                setOpen(false);
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
          <div className="py-8">
            <Table
              columns={CASINO_GAME_COLS}
              tableBodyData={tableBodyData}
              showFilter={true}
              onAddToCompare={onAddToCompare}
            />
          </div>
        </div>
      </BottomSheet>
    </>
  );
};

export default ChartComponent;
