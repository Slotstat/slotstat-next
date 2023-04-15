"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { back, close, live, remove } from "../assets";
import { forward, fullscreen } from "../assets";
import { CASINO_GAME_DATA } from "../utils/mockData";
import { CASINO_GAME_COLS } from "./table/columns";
import BulletIcon from "./BulletIcon";
import Image from "next/image";
import { TableOld } from ".";

am4core.useTheme(am4themes_animated);
am4core.addLicense("ch-custom-attribution");

const FILTERS = {
  "10M": { label: "10M", sizeInSeconds: 10 * 60 },
  "1h": { label: "1h", sizeInSeconds: 60 * 60 },
  "12h": { label: "12h", sizeInSeconds: 12 * 60 * 60 },
  "24h": { label: "24h", sizeInSeconds: 24 * 60 * 60 },
  "5d": { label: "5d", sizeInSeconds: 5 * 24 * 60 * 60 },
  all: { label: "All", sizeInSeconds: 0 },
};

const SERIE_COLORS = ["#5887F6", "#877CF2"];

const getBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateMockData = (
  includeCompare = false,
  num = 100,
  min = 30,
  max = 80
) => {
  const data = [];
  for (let i = 0; i < num; i++) {
    data.push({
      date1: new Date(
        2023,
        2,
        i + 1,
        getBetween(0, 24),
        getBetween(0, 60),
        getBetween(0, 60)
      ),
      value1: Math.round(getBetween(min, max)) / 100,
    });
  }
  if (includeCompare) {
    for (let i = 0; i < num; i++) {
      data[i].value2 = Math.round(getBetween(min, max)) / 100;
    }
  }
  return data;
};

const getTooltip = (xv: string, yv: string, color: string) => {
  return `
	<div style="background-color: #24262C; padding: 12px; border-radius: 14px">
		<div style="display: flex; align-items: center; justify-content: space-between;">
			<span style="font-size: 14px; color: white">{${xv}.formatDate(\"dd/MM/YYYY\")}</span>
			<span style="margin-left: 40px; font-size: 14px; color: #969CB0;">{${xv}.formatDate(\"HH:mm:ss a\")}</span>
		</div>
		<div style="display: flex; align-items: center; margin-top: 12px;">
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="10" cy="10" r="9" stroke="${color}" stroke-width="2" />
				<circle cx="10" cy="9.99981" r="5.2381" fill="url(#paint0_linear_2249_4511)" />
				<defs>
					<linearGradient id="paint0_linear_2249_4511" x1="10" y1="4.76172" x2="10" y2="15.2379"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="${color}" />
						<stop offset="1" stop-color="${color}" stop-opacity="0" />
					</linearGradient>
				</defs>
			</svg>
			<span style="margin-left: 12px; font-size: 16px; font-weight: bold; color: ${color};">{${yv}.formatNumber(\"#.##%\")}</span>
		</div>
	</div>`;
};

const ActionPane = ({
  dictionary,
  onPressCompare,
  onPressRemove,
  activeFilterId,
  onPressFilter,
  selectedGames = [],
}) => {
  const { compare, vs } = dictionary;
  return (
    <div className="flex items-center justify-between p-[18px]">
      <div className="flex items-center">
        <button
          onClick={onPressCompare}
          className="pointer flex items-center justify-center rounded-xl bg-dark2 py-3 px-4 hover:bg-dark3"
        >
          <span className="text-sm font-bold leading-4 text-white">
            {compare}
          </span>
          <Image
            src={forward}
            alt=""
            className="ml-2 h-[18px] w-[18px]"
            width={18}
            height={18}
          />
        </button>
        {selectedGames.length > 1 && (
          <>
            <div className="pointer ml-3 flex items-center justify-center rounded-xl bg-dark2 py-3 px-4">
              <BulletIcon color={SERIE_COLORS[0]} size={20} />
              <span className="ml-2 text-sm font-bold leading-4 text-white">
                {selectedGames[0]}
              </span>
            </div>
            <div className="ml-3 flex h-11 items-center justify-center rounded-xl bg-dark2 px-4">
              <span className="text-sm font-bold leading-4 text-white">
                {vs}
              </span>
            </div>
            <button
              onClick={onPressRemove}
              className="pointer ml-3 flex items-center justify-center rounded-xl bg-dark2 py-3 px-4 hover:bg-dark3"
            >
              <BulletIcon color={SERIE_COLORS[1]} size={20} />
              <span className="ml-2 text-sm font-bold leading-4 text-white">
                {selectedGames[1]}
              </span>
              <Image
                src={remove}
                alt=""
                className="ml-3 h-4 w-4"
                width={16}
                height={16}
              />
            </button>
          </>
        )}
      </div>
      <div className="flex items-center">
        <button className="ml-3 flex items-center justify-center rounded-[10px] p-3 hover:bg-dark3 lg:hidden">
          <Image
            src={fullscreen}
            alt=""
            className="h-4 w-4"
            width={16}
            height={16}
          />
        </button>
        <div className="hidden items-center space-x-1 rounded-xl bg-dark2 py-1 px-1 lg:flex">
          {Object.keys(FILTERS).map((filterKey, index) => {
            const background = useMemo(
              () => activeFilterId === filterKey && "bg-dark1",
              [activeFilterId]
            );
            return (
              <button
                key={index}
                onClick={() => onPressFilter(filterKey)}
                className={`flex items-center justify-center rounded-[10px] py-2 px-5 hover:bg-dark3 ${background}`}
              >
                <span className="text-sm leading-4 text-grey1">
                  {FILTERS[filterKey].label}
                </span>
              </button>
            );
          })}
        </div>
        <button className="ml-3 hidden items-center justify-center rounded-[10px] p-3 hover:bg-dark3 lg:flex">
          <Image
            src={fullscreen}
            alt=""
            className="h-4 w-4"
            width={16}
            height={16}
          />
        </button>
      </div>
    </div>
  );
};

const createSerie = (
  s: am4charts.LineSeries,
  xv: string,
  yv: string,
  color: string
) => {
  s.dataFields.dateX = xv;
  s.dataFields.valueY = yv;

  s.fillOpacity = 1;
  s.fill = am4core.color(color);
  s.stroke = am4core.color(color);
  s.strokeWidth = 2;
  s.tensionX = 0.8;

  const fillModifier = new am4core.LinearGradientModifier();
  fillModifier.opacities = [0.45, 0];
  fillModifier.offsets = [0, 1];
  fillModifier.gradient.rotation = 90;
  s.segments.template.fillModifier = fillModifier;

  const bullet = s.bullets.push(new am4charts.CircleBullet());
  bullet.states.create("hover").properties.scale = 1.7;
  s.minBulletDistance = 40;

  s.tooltipHTML = getTooltip(xv, yv, color);
  s.tooltip.getFillFromObject = false;
  s.tooltip.label.padding(0, 0, 0, 0);
  s.tooltip.background.cornerRadius = 14;
  s.tooltip.background.strokeOpacity = 0;
  s.tooltip.background.fill = am4core.color("#24262C");
  s.tooltip.pointerOrientation = "down";
};

const ChartComponent = ({ dictionary }: Dictionary) => {
  const gameId = "egt1";
  const chart = useRef<am4charts.XYChart>(null);
  const chartData = useRef([]);
  const [activeFilterId, setActiveFilterId] =
    useState<keyof typeof FILTERS>("all");

  const [open, setOpen] = useState(false);
  const [selectedGames, setSelectedGames] = useState([gameId]);

  const isCompare = useMemo(() => selectedGames.length > 1, [selectedGames]);

  useEffect(() => {
    const x = am4core.create("chartdiv", am4charts.XYChart);

    const data = generateMockData(isCompare, 70);
    chartData.current = data;
    x.data = data;

    const dateAxis = x.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.tooltip.disabled = true;
    dateAxis.renderer.grid.template.disabled = true;
    dateAxis.renderer.labels.template.fill = am4core.color("#969CB0");
    dateAxis.renderer.labels.template.fontSize = 12;
    dateAxis.renderer.labels.template.fontWeight = "normal";
    dateAxis.dateFormatter = new am4core.DateFormatter();
    dateAxis.dateFormatter.dateFormat = "dd/MM/yyyy";

    dateAxis.renderer.minGridDistance = 70;

    const valueAxis = x.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.labels.template.fill = am4core.color("#969CB0");
    valueAxis.renderer.labels.template.fontSize = 12;
    valueAxis.renderer.labels.template.fontWeight = "normal";
    valueAxis.renderer.grid.template.disabled = true;

    valueAxis.numberFormatter = new am4core.NumberFormatter();
    valueAxis.numberFormatter.numberFormat = "#.##%";

    valueAxis.min = 0;
    valueAxis.max = 1;

    // create series
    const serie1 = x.series.push(new am4charts.LineSeries());
    createSerie(serie1, "date1", "value1", SERIE_COLORS[0]);

    const cursor = new am4charts.XYCursor();
    cursor.lineX.stroke = am4core.color("#fff");
    cursor.lineY.stroke = am4core.color("#fff");
    // cursor.behavior = 'panX';
    x.cursor = cursor;

    const scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(serie1);
    scrollbarX.background.fill = am4core.color("#24262C");
    x.scrollbarX = scrollbarX;
    x.scrollbarX.parent = x.bottomAxesContainer;

    chart.current = x;

    return () => {
      x.dispose();
    };
  }, []);

  const onPressFilter = (filterId: keyof typeof FILTERS) => {
    setActiveFilterId(filterId);
    let filteredData = [];
    if (FILTERS[filterId].sizeInSeconds) {
      filteredData = chartData.current.filter((item) => {
        const startFrom =
          new Date().getTime() - FILTERS[filterId].sizeInSeconds * 1000;
        return item.date1.getTime() >= startFrom;
      });
    } else {
      filteredData = chartData.current;
    }
    chart.current.data = filteredData;
    chart.current.validateData();
  };

  const onPressCompare = () => {
    setOpen(true);
  };

  const onAddToCompare = (gameId: string) => {
    if (!isCompare) {
      setSelectedGames((s) => [...s, gameId]);
      const data = generateMockData(true, 70);
      chartData.current = data;
      chart.current.data = data;
      const serie2 = chart.current.series.push(new am4charts.LineSeries());
      createSerie(serie2, "date1", "value2", SERIE_COLORS[1]);
      chart.current.validateData();
    }
  };

  const onPressRemove = () => {
    setSelectedGames([gameId]);
    chart.current.series.removeIndex(1);
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
              onPressFilter={onPressFilter}
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
          onAddToCompare("egt2");
        }}
      >
        <div className="bg-dark1 py-8 px-4 lg:px-18">
          <div className="flex items-center justify-between">
            <button className="flex items-center justify-center rounded-xl bg-dark2 p-2 hover:bg-dark3">
              <Image
                src={back}
                alt=""
                className="h-6 w-6"
                width={24}
                height={24}
              />
            </button>
            <span className="text-sm leading-4 text-grey1">
              Choose game from Adarabet
            </span>

            <button
              className="flex items-center justify-center rounded-xl bg-dark2 p-2 hover:bg-dark3"
              onClick={() => {
                setOpen(false);
                onAddToCompare("egt2");
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
            <TableOld
              linkPath="/adjarabet/netent"
              columns={CASINO_GAME_COLS}
              mockData={CASINO_GAME_DATA}
              showFilter
            />
          </div>
        </div>
      </BottomSheet>
    </>
  );
};

export default ChartComponent;
