"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import "react-spring-bottom-sheet/dist/style.css";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { live } from "../../assets";
import BulletIcon from "../../assets/svg/BulletIcon";
import Image from "next/image";
import {
  SERIE_COLORS,
  createSeries,
  setChartParameters,
  showLoadingIndicator,
  hideLoadingIndicator,
} from "./chartUtils";
import ActionPane, {
  CasinoNamesWithCompareButton,
  DateFilterForChart,
} from "./ActionPane";
import useStore from "@/app/(store)/store";
import BottomSheetModal from "../BottomSheetModal";
import getStatistics from "@/lib/clientSide/getStatistics";
import _ from "lodash";
import { useTranslations } from "next-intl";
import RTP from "./RTP";
import TooltipComponent from "../TooltipComponent";
import useQueryParams from "@/app/utils/useQueryParams";
import moment from "moment";

am4core.useTheme(am4themes_animated);
am4core.addLicense("ch-custom-attribution");

const ChartComponent = ({
  gameId,
  mainGame,
  isFiat,
  compareGame,
  compareGameId,
}: {
  gameId: string;
  mainGame: GameData;
  isFiat?: string;
  compareGame?: GameData;
  compareGameId?: string;
}) => {
  const t = useTranslations();
  const { setQueryParams } = useQueryParams();

  const chartRef = useRef<am4charts.XYChart>();
  const windowFocused = useRef<number>();
  const [scrollY, setScrollY] = useState<number | null>(null);
  const [activeFilterId, setActiveFilterId] = useState<FiltersKey>("1D");
  const [filterDisabled, setFilterDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [noStatisticsYet, setNoStatisticsYet] = useState(false);
  const [selectedGames, setSelectedGames] = useState<string[]>([gameId]);
  const [compareGameObject, setCompareGameObject] = useState<GameData>();
  const [liveResultForMainGame, setLiveResultForMainGame] = useState<number>();
  const [visibilitychangeHandler, setVisibilitychangeHandler] =
    useState<boolean>(false);
  const [liveResultForCompareGame, setLiveResultForCompareGame] =
    useState<number>();
  const { isOn, newRate } = useStore();

  const isCompare = useMemo(() => selectedGames.length > 1, [selectedGames]);

  const onPressCompare = () => {
    setOpen(true);
  };
  // fetching data, fixing date for chart and reversing it.
  const getAndCorrectStatisticsData = async (newGameId: string) => {
    let statistics: StatisticsData[];

    const statisticsData: Promise<StatisticsData[]> = getStatistics(
      newGameId,
      activeFilterId
    );
    statistics = await statisticsData;

    if (statistics.length === 0) {
      setNoStatisticsYet(true);
      return [];
    }

    for (let index = 0; index < statistics.length; index++) {
      // transforms UTC to Locale
      statistics[index].date = new Date(
        moment.utc(statistics[index].date).local().format()
      );
    }

    setLiveResultForMainGame(statistics[0].winRate);
    return statistics;
  };

  // fetching and updating data for main and compareGame
  const getAndUpdateStatisticsData = async () => {
    hideLoadingIndicator();
    let modifiedArrayWithOneOrTwoValue: StatisticsData[] = [];
    chartRef.current && showLoadingIndicator(chartRef.current);
    if (selectedGames.length > 1) {
      const gameStatistics1 = getAndCorrectStatisticsData(selectedGames[0]);
      const gameStatistics2 = getAndCorrectStatisticsData(selectedGames[1]);

      const [game1, game2] = await Promise.all([
        gameStatistics1,
        gameStatistics2,
      ]);

      modifiedArrayWithOneOrTwoValue = [...game1];

      if (game2.length > game1.length) {
        game2?.map((elm, i) => {
          if (!modifiedArrayWithOneOrTwoValue[i]) {
            modifiedArrayWithOneOrTwoValue.push({
              date: elm.date,
              timeStamp: elm.timeStamp,
              betCount2: elm.betCount,
              winRate2: elm.winRate,
            });
          } else {
            modifiedArrayWithOneOrTwoValue[i].date = elm.date;
            modifiedArrayWithOneOrTwoValue[i].timeStamp = elm.timeStamp;
            modifiedArrayWithOneOrTwoValue[i].betCount2 = elm.betCount;
            modifiedArrayWithOneOrTwoValue[i].winRate2 = elm.winRate;

            modifiedArrayWithOneOrTwoValue[i].betCount =
              modifiedArrayWithOneOrTwoValue[i].betCount;
            modifiedArrayWithOneOrTwoValue[i].winRate =
              modifiedArrayWithOneOrTwoValue[i].winRate;
          }
        });
      } else {
        game2.map((elm, i) => {
          modifiedArrayWithOneOrTwoValue[i].winRate2 = elm.winRate;
        });
      }
    } else {
      const statistics = await getAndCorrectStatisticsData(gameId);
      modifiedArrayWithOneOrTwoValue = statistics;
    }

    if (!chartRef.current) {
      const chart = am4core.create("chartdiv", am4charts.XYChart);
      chartRef.current = chart;
      chart.data = modifiedArrayWithOneOrTwoValue.reverse();
      setChartParameters(chart);
    } else {
      chartRef.current.data = modifiedArrayWithOneOrTwoValue.reverse();

      hideLoadingIndicator();
      setFilterDisabled(false);
    }
  };

  // add game for compare
  const onAddToCompare = async (GameData: GameData) => {
    let compareGameId: string;

    compareGameId = GameData.gameId;

    setCompareGameObject(GameData);
    setOpen(false);

    setSelectedGames([gameId, compareGameId]);

    chartRef.current && showLoadingIndicator(chartRef.current);

    const data = await getAndCorrectStatisticsData(compareGameId);
    if (chartRef.current?.data[chartRef.current?.data.length - 1].winRate2) {
      chartRef.current.series.removeIndex(1);
    }

    let chartRefData = chartRef?.current?.data;

    chartRefData?.map((element) => {
      if (element.winRate2) {
        delete element.winRate2;
      }
    });

    if (chartRefData && data > chartRefData) {
      chartRefData.reverse();
      data?.map((elm, i) => {
        if (chartRefData) {
          if (!chartRefData[i]) {
            chartRefData.push({
              date: elm.date,
              timeStamp: elm.timeStamp,
              betCount2: elm.betCount,
              winRate2: elm.winRate,
            });
          } else {
            chartRefData[i].date = elm.date;
            chartRefData[i].timeStamp = elm.timeStamp;
            chartRefData[i].betCount2 = elm.betCount;
            chartRefData[i].winRate2 = elm.winRate;
            chartRefData[i].betCount = chartRefData[i].betCount;
            chartRefData[i].winRate = chartRefData[i].winRate;
          }
        }
      });

      chartRefData.reverse();
    } else {
      data?.map((elm, i) => {
        if (chartRef.current)
          chartRef.current.data[chartRef.current.data.length - 1 - i].winRate2 =
            elm.winRate;
      });

      const filteredArray: any = chartRef?.current?.data.filter((obj) => {
        if (!obj.winRate && !obj.winRate2) {
          return false;
        } else {
          return true; // Include objects that contain all required keys
        }
      });
      if (chartRef.current) chartRef.current.data = filteredArray;
    }

    if (chartRef.current?.data) {
      const series2 = chartRef.current.series.push(new am4charts.LineSeries());

      createSeries(series2, "date", "winRate2", SERIE_COLORS[1]);
      chartRef.current.validateData();
      hideLoadingIndicator();
      setFilterDisabled(false);
    }
    setLiveResultForCompareGame(data[data.length - 1].winRate);
    setScrollY(window.scrollY);
    setQueryParams({ compareGameId: compareGameId });
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
    setScrollY(window.scrollY);
    setQueryParams({ compareGameId: "" });
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

      // fixing date for chart & transforms UTC to Locale
      statistics.date = new Date(moment.utc(statistics.date).local().format());

      // compare timestamps of last item in data and newly fetched. if they are different it means we have to add new date on dateAxis
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
          if (lastItemInSeries1 && statistics.winRate) {
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
            // setTimeout(function () {
            //   series2.invalidateData();
            // }, 100);
            setLiveResultForCompareGame(statistics.winRate2);
          }
        }
      }
      setLiveResultForMainGame(statistics.winRate);
    }
  };

  // debounce statistic update
  // const debounceUpdateStatistic = useCallback(
  //   _.debounce((gameId, timeStamp, compareGameId) => {
  //     updateStatistic(gameId, timeStamp, compareGameId);
  //   }, 2000),
  //   []
  // );

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
  }, [isOn, gameId, newRate]);

  // after changing filter this will update chart and chart data.
  useEffect(() => {
    getAndUpdateStatisticsData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilterId]);

  // setting main game object to the state
  useEffect(() => {
    if (visibilitychangeHandler) {
      getAndUpdateStatisticsData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibilitychangeHandler]);

  // if user leaves page more than 2 minutes it will recall statistic update
  useEffect(() => {
    if (compareGame) {
      onAddToCompare(compareGame);
    }
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Window is not visible, user has switched tabs or minimized the window
        windowFocused.current = Date.now();
        setVisibilitychangeHandler(false);
      } else {
        // Window is visible again, user has come back to the window
        if (
          windowFocused.current &&
          windowFocused.current < Date.now() - 120000
        ) {
          setVisibilitychangeHandler(true);
        }

        windowFocused.current = undefined;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      // dispose chart
      chartRef.current && chartRef.current.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const persistentScroll = scrollY;
    if (persistentScroll === null) return;

    window.scrollTo({ top: Number(scrollY) });
  }, [scrollY, compareGameId]);

  return (
    <>
      <div className="flex flex-row flex-wrap mt-36 md:mt-64">
        <div className="w-full py-6 lg:pr-3 lg:pt-12 lg:pb-6 lg:w-3/4">
          <div className="flex flex-col lg:items-center lg:justify-between lg:flex-row">
            <div className="flex flex-row items-center ">
              <h2 className="flex flex-1 items-center  lg:text-[24px] font-bold text-white ">
                {t("gamePage.Win-spinRate")}
              </h2>

              <TooltipComponent
                classN="ml-2"
                big={true}
                text={t("gamePage.Win-spinRateHint")}
              />
            </div>
            <div className="mt-3 items-center justify-between lg:mt-0 lg:flex">
              {selectedGames.length && (
                <div
                  className="w-full pointer flex items-center justify-between rounded-xl py-3 px-4  lg:w-auto md:w-auto "
                  style={{ backgroundColor: SERIE_COLORS[0] + "3D" }}
                >
                  <div className="flex items-center">
                    <BulletIcon color={SERIE_COLORS[0]} size={20} />
                    <span className="ml-2 font-bold leading-4 text-white text-xs lg:text-sm truncate max-w-[170px]  ">
                      {mainGame?.casinoName} {mainGame?.name}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className=" text-blue2 font-bold w-14 text-sm lg:ml-2 lg:text-base">
                      {liveResultForMainGame}%
                    </span>
                    <Image src={live} alt="" className="ml-2" />
                  </div>
                </div>
              )}
              {isCompare && (
                <div
                  className="w-full pointer flex items-center justify-between rounded-xl py-3 px-4  lg:w-auto md:w-auto  mt-3 lg:mt-0 lg:ml-3"
                  style={{ backgroundColor: SERIE_COLORS[1] + "3D" }}
                >
                  <div className="flex items-center">
                    <BulletIcon color={SERIE_COLORS[1]} size={20} />
                    <span className="ml-2 font-bold leading-4 text-white text-xs lg:text-sm">
                      {compareGameObject?.casinoName} {compareGameObject?.name}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="ml-2 text-blue2 text-sm lg:text-base font-bold w-14">
                      {liveResultForCompareGame}%
                    </span>
                    <Image src={live} alt="" className="ml-2" />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="lg:hidden">
            <DateFilterForChart
              activeFilterId={activeFilterId}
              filterDisabled={filterDisabled}
              onPressFilter={setActiveFilterId}
              setFilterDisabled={setFilterDisabled}
            />
          </div>
          <div className="mt-6 rounded-3xl bg-dark2 lg:p-6 p-1">
            <div className="rounded-3xl bg-dark1">
              {noStatisticsYet ? (
                <div className=" text-white w-full text-center">
                  {t("noStatistic")}
                </div>
              ) : (
                <>
                  <div className="hidden lg:block">
                    <ActionPane
                      compareGameObject={compareGameObject}
                      mainGameObject={mainGame}
                      onPressCompare={onPressCompare}
                      onPressRemove={onPressRemove}
                      activeFilterId={activeFilterId}
                      onPressFilter={setActiveFilterId}
                      setFilterDisabled={setFilterDisabled}
                      filterDisabled={filterDisabled}
                    />
                  </div>
                  <div
                    id="chartdiv"
                    className="lg:h-[470px] h-56 w-full rounded-3xl bg-dark1"
                  ></div>
                </>
              )}
            </div>
          </div>
          <div className=" lg:hidden">
            <CasinoNamesWithCompareButton
              mainGameObject={mainGame}
              compareGameObject={compareGameObject}
              onPressCompare={onPressCompare}
              onPressRemove={onPressRemove}
            />
          </div>
        </div>

        <div className="w-full lg:px-3 lg:pt-12 lg:pb-6 lg:w-1/4">
          <div className="flex flex-row items-center  justify-between">
            <div className="flex flex-row items-center ">
              <h3 className="flex items-center text-base lg:text-2xl font-bold text-white h-12">
                {t("chartComponent.RTP")} / {t("chartComponent.swing")}
              </h3>
              <TooltipComponent
                big={true}
                classN="ml-2"
                text={t("chartComponent.RTPhint")}
              />
            </div>
            <Image src={live} alt="" className="ml-3 w-10 h-10" />
          </div>

          <div>
            <RTP color="#5887F6" gameObject={mainGame} />

            <RTP
              color="#877CF2"
              gameObject={compareGameObject}
              onPressCompare={onPressCompare}
              setOpen={setOpen}
              onPressRemove={onPressRemove}
            />
          </div>
        </div>
      </div>
      <div className="z-50">
        <BottomSheetModal
          open={open}
          setOpen={setOpen}
          onAddToCompare={onAddToCompare}
          gameId={gameId}
          isFiat={isFiat || "false"}
        />
      </div>
    </>
  );
};

export default ChartComponent;
