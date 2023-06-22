"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "react-spring-bottom-sheet/dist/style.css";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { live } from "../../assets";
import BulletIcon from "../BulletIcon";
import Image from "next/image";

import {
  FILTERS,
  SERIE_COLORS,
  createSeries,
  setChartParameters,
  showLoadingIndicator,
  hideLoadingIndicator,
} from "./chartUtils";
import ActionPane from "./ActionPane";
import signalR from "@/app/utils/singlar";
import useStore from "@/app/(store)/store";
// import _ from "lodash";
import BottomSheetModal from "../BottomSheetModal";
import getStatistics from "@/lib/getStatistics";

am4core.useTheme(am4themes_animated);
am4core.addLicense("ch-custom-attribution");

const ChartComponent = ({
  dictionary,
  gameId,
  gamesList,
  casinoColumnHeaders,
  gameColumnHeaders,
}: { dictionary: Dictionary } & {
  gameId: string;
  gamesList: GameData[];
  casinoColumnHeaders: CasinoCols[];
  gameColumnHeaders: CasinoCols[];
}) => {
  const casinoName = gamesList[0]?.casinoName;
  const chartRef = useRef<am4charts.XYChart>();
  const [activeFilterId, setActiveFilterId] =
    useState<keyof typeof FILTERS>("1D");

  const [open, setOpen] = useState(false);
  const [selectedGames, setSelectedGames] = useState<string[]>([gameId]);
  const [mainGameObject, setMainGameObject] = useState<GameData>();
  const [compareGameObject, setCompareGameObject] = useState<GameData>();
  const [liveResultForMainGame, setLiveResultForMainGame] = useState<number>();
  const [liveResultForCompareGame, setLiveResultForCompareGame] =
    useState<number>();
  const { isOn, newRate, newJackpot, jackpotHasBeenDrawn } = useStore();

  const isCompare = useMemo(() => selectedGames.length > 1, [selectedGames]);

  // fetching data, fixing date for chart and reversing it.
  const getAndCorrectStatisticsData = async (newGameId: string) => {
    const statisticsData: Promise<StatisticsData[]> = getStatistics(
      newGameId,
      activeFilterId
    );

    let statistics: StatisticsData[] = await statisticsData;

    // needs to be reversed to correctly show charts.
    const reversedStatistics = statistics.reverse();

    for (let index = 0; index < reversedStatistics.length; index++) {
      reversedStatistics[index].date = new Date(reversedStatistics[index].date);
    }
    setLiveResultForMainGame(
      reversedStatistics[reversedStatistics.length - 1].winRate
    );
    return reversedStatistics;
  };

  // fetching and updating data for main and compareGame
  const getAndUpdateStatisticsData = async () => {
    hideLoadingIndicator();
    let modifiedArrayWithOneOrTwoValue:
      | StatisticsData[]
      | { winRate2: number }[] = [];
    // hideLoadingIndicator();
    chartRef.current && showLoadingIndicator(chartRef.current);

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
    if (!chartRef.current) {
      const chart = am4core.create("chartdiv", am4charts.XYChart);
      chartRef.current = chart;
      chart.data = modifiedArrayWithOneOrTwoValue;
      setChartParameters(chart);
    } else {
      chartRef.current.data = modifiedArrayWithOneOrTwoValue;

      hideLoadingIndicator();
    }
  };

  const onPressCompare = () => {
    setOpen(true);
  };

  // add game for compare
  const onAddToCompare = async (GameData: GameData) => {
    const { gameId: compareGameId } = GameData;
    setCompareGameObject(GameData);
    setOpen(false);

    setSelectedGames([gameId, compareGameId]);

    chartRef.current && showLoadingIndicator(chartRef.current);

    const data = await getAndCorrectStatisticsData(compareGameId);

    if (chartRef.current?.data[0].winRate2) {
      chartRef.current.series.removeIndex(1);
    }

    data.map((elm, i) => {
      if (chartRef.current) chartRef.current.data[i].winRate2 = elm.winRate;
    });

    if (chartRef.current?.data) {
      const series2 = chartRef.current.series.push(new am4charts.LineSeries());
      createSeries(series2, "date", "winRate2", SERIE_COLORS[1]);
      chartRef.current.validateData();
      hideLoadingIndicator();
    }
    setLiveResultForCompareGame(data[data.length - 1].winRate);
  };

  // remove game for compare
  const onPressRemove = () => {
    setCompareGameObject(undefined);
    setSelectedGames([gameId]);

    if (chartRef.current) {
      chartRef.current.series.removeIndex(1);
      chartRef.current.data.map((_, i) => {
        if (chartRef.current) delete chartRef.current.data[i].winRate2;
      });
    }
  };

  // for statistics live update
  const updateStatistic = async (
    newGameId: string,
    timeStamp: number,
    compareGameId?: string
  ) => {
    if (chartRef.current) {
      let statistics;
      const statisticsData: Promise<StatisticsData[]> = getStatistics(
        newGameId,
        activeFilterId,
        timeStamp
      );

      // if we are comparing one game to another this statement will happen
      if (compareGameId) {
        const compareStatisticsData: Promise<StatisticsData[]> = getStatistics(
          compareGameId,
          activeFilterId,
          timeStamp
        );
        const [mainStatistic, compareStatistics] = await Promise.all([
          statisticsData,
          compareStatisticsData,
        ]);
        statistics = mainStatistic[0];

        if (compareStatistics[0]?.winRate) {
          statistics.winRate2 = compareStatistics[0]?.winRate;
        }
      } else {
        const mainStatistic = await statisticsData;
        statistics = mainStatistic[0];
      }

      // fixing date for chart
      statistics.date = new Date(statistics.date);

      // compare timestamps of last item in data and newly fetched. if the are different it means we have to add new date on dateAxis
      if (
        statistics.timeStamp !=
        chartRef.current.data[chartRef.current.data.length - 1].timeStamp
      ) {
        chartRef.current.addData(statistics);
      } else {
        const series1 = chartRef.current.series.getIndex(0);
        const series2 = chartRef.current.series.getIndex(1);

        if (series1) {
          const Series1Length = series1.dataItems.length;
          const lastItemInSeries1 = series1.dataItems.getIndex(
            Series1Length - 1
          );
          if (lastItemInSeries1) {
            lastItemInSeries1.valueY = statistics.winRate;
          }
        }
        if (series2 && statistics.winRate2) {
          const Series2Length = series2.dataItems.length;
          const lastItemInSeries2 = series2.dataItems.getIndex(
            Series2Length - 1
          );
          if (lastItemInSeries2) {
            lastItemInSeries2.valueY = statistics.winRate2;
            setLiveResultForCompareGame(statistics.winRate2);
          }
        }
      }
      setLiveResultForMainGame(statistics.winRate);
    }
  };

  // calling signalR and checking for updates
  useEffect(() => {
    if (
      newRate?.gameId === gameId ||
      newRate?.gameId === compareGameObject?.gameId
    ) {
      const last = chartRef.current?.data[chartRef.current?.data.length - 1];

      // turn on when old version is activated
      if (last) {
        if (compareGameObject) {
          updateStatistic(gameId, last.timeStamp, compareGameObject.gameId);
        } else {
          updateStatistic(gameId, last.timeStamp);
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isOn,
    gameId,
    newRate,
    //  jackpotHasBeenDrawn,
  ]);

  // dispose chart
  useEffect(() => {
    return () => {
      chartRef.current && chartRef.current.dispose();
    };
  }, []);

  // after changing filter this will update chart and chart data.
  useEffect(() => {
    getAndUpdateStatisticsData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilterId]);

  // setting main game object to the state
  useEffect(() => {
    const mainGame = gamesList.find((x) => {
      return x.gameId === gameId;
    });
    setMainGameObject(mainGame);
  }, []);

  return (
    <>
      <div className="px-4 py-6 lg:py-18 ">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <h2 className="flex flex-1 items-center justify-between text-[24px] font-bold text-white">
            {casinoName} {mainGameObject?.name} chart
          </h2>
          <div className="mt-3 flex items-center justify-between lg:mt-0">
            {selectedGames.length && (
              <div
                className="pointer flex items-center justify-center rounded-xl py-3 px-4 "
                style={{ backgroundColor: SERIE_COLORS[0] + "3D" }}
              >
                <BulletIcon color={SERIE_COLORS[0]} size={20} />
                <span className="ml-2 text-sm font-bold leading-4 text-white">
                  {casinoName} {mainGameObject?.name}{" "}
                </span>
                <span className="ml-2 text-blue2 font-bold w-14">
                  {liveResultForMainGame}%
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
                  {compareGameObject?.casinoName} {compareGameObject?.name}
                </span>
                <span className="ml-2 text-blue2 font-bold w-14">
                  {liveResultForCompareGame}%
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
              compareGameObject={compareGameObject}
              mainGameObject={mainGameObject}
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
      <BottomSheetModal
        open={open}
        setOpen={setOpen}
        onAddToCompare={onAddToCompare}
        casinoColumnHeaders={casinoColumnHeaders}
        gameColumnHeaders={gameColumnHeaders}
      />
    </>
  );
};

export default ChartComponent;
