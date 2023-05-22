// @ts-nocheck
"use client";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";

export const getTooltip = (xv: string, yv: string, color: string) => {
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
              <span style="margin-left: 12px; font-size: 16px; font-weight: bold; color: ${color};">{${yv}.formatNumber(\"#.#'%'\")}</span>
          </div>
      </div>`;
};

export const createSeries = (
  s: am4charts.LineSeries,
  xv: string,
  yv: string,
  color: string
) => {
  s.dataFields.dateX = xv;
  s.dataFields.valueY = yv;
  s.interpolationDuration = 500;
  s.defaultState.transitionDuration = 0;

  s.fillOpacity = 1;
  s.fill = am4core.color(color);
  s.stroke = am4core.color(color);
  s.strokeWidth = 2;
  s.tensionX = 0.8;
  // s.stacked = true;

  const fillModifier = new am4core.LinearGradientModifier();
  fillModifier.opacities = [0.45, 0];
  fillModifier.offsets = [0, 1];
  fillModifier.gradient.rotation = 90;
  s.segments.template.fillModifier = fillModifier;

  const bullet = s.bullets.push(new am4charts.CircleBullet());
  bullet.fillOpacity = 0;
  bullet.strokeOpacity = 0;
  const bulletState = bullet.states.create("hover");
  bulletState.properties.fillOpacity = 1;
  bulletState.properties.strokeOpacity = 1;
  bulletState.properties.scale = 1.2;
  // s.minBulletDistance = 40;

  s.tooltipHTML = getTooltip(xv, yv, color);
  s.tooltip.getFillFromObject = false;
  s.tooltip.label.padding(0, 0, 0, 0);
  s.tooltip.background.cornerRadius = 14;
  s.tooltip.background.strokeOpacity = 0;
  s.tooltip.background.fill = am4core.color("#24262C");
  // s.tooltip.pointerOrientation = "vertical";

  // s.tooltip.dx = -50;
  // s.tooltip.dy = -20;
  // s.tooltip.ex = -50;
  // s.tooltip.pointerOrientation = "up";
};

export const setChartParameters = (chart: am4charts.XYChart) => {
  const dateAxis = chart.xAxes.push(new am4charts.DateAxis());

  chart.hiddenState.properties.opacity = 0;
  dateAxis.dateFormatter = new am4core.DateFormatter();
  dateAxis.dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss";

  dateAxis.renderer.axisFills.template.disabled = true;
  dateAxis.renderer.ticks.template.disabled = true;
  dateAxis.interpolationDuration = 500;
  dateAxis.rangeChangeDuration = 500;

  dateAxis.tooltip.disabled = true;
  dateAxis.renderer.labels.template.fill = am4core.color("#969CB0");
  dateAxis.renderer.labels.template.fontSize = 12;
  dateAxis.renderer.labels.template.fontWeight = "normal";

  dateAxis.startLocation = 0.5;
  dateAxis.endLocation = 10;

  const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.interpolationDuration = 500;
  valueAxis.rangeChangeDuration = 500;

  valueAxis.tooltip.disabled = true;
  valueAxis.renderer.labels.template.fill = am4core.color("#969CB0");
  valueAxis.renderer.labels.template.fontSize = 12;
  valueAxis.renderer.labels.template.fontWeight = "normal";

  valueAxis.numberFormatter = new am4core.NumberFormatter();
  valueAxis.numberFormatter.numberFormat = "#.#'%'";

  valueAxis.min = 0;
  valueAxis.max = 100;

  // grid
  dateAxis.renderer.grid.template.stroke = "#FFFFFF66";
  valueAxis.renderer.grid.template.stroke = "#FFFFFF66";
  // dateAxis.renderer.grid.template.location = 0;
  // dateAxis.renderer.grid.template.disabled = true;
  // valueAxis.renderer.grid.template.disabled = true;
  // dateAxis.renderer.minGridDistance = 60;
  // valueAxis.renderer.minGridDistance = 50;

  // zoom
  // dateAxis.showOnInit = false;
  // valueAxis.keepSelection = true;
  // dateAxis.keepSelection = true;

  // chart.events.on("ready", function () {
  //   dateAxis.start = 0.8;
  //   dateAxis.end = 1;
  //   // alternative version of zoom
  //   // 1
  //   // dateAxis.zoom({ start: 3 / 15, end: 1.2 }, false, true);
  //   // 2
  //   // const chartData = chart.data;
  //   // dateAxis.zoomToDates(
  //   //   new Date(chartData[chartData.length - 20].date),
  //   //   new Date(),
  //   //   false,
  //   //   true
  //   // );
  // });

  // create series
  const series1 = chart.series.push(new am4charts.LineSeries());
  createSeries(series1, "date", "winRate", SERIE_COLORS[0]);

  const cursor = new am4charts.XYCursor();
  cursor.lineX.stroke = am4core.color("#fff");
  cursor.lineY.stroke = am4core.color("#fff");
  // cursor.behavior = 'panX';
  chart.cursor = cursor;
  chart.cursor.keepSelection = true;

  chart.mouseWheelBehavior = "panXY";

  // bottom scrollbar
  // const scrollbarX = new am4charts.XYChartScrollbar();
  // scrollbarX.series.push(serie1);
  // scrollbarX.background.fill = am4core.color("#24262C");
  // chart.scrollbarX = scrollbarX;
  // chart.scrollbarX.parent = chart.bottomAxesContainer;

  // chart.scrollbarY = new am4core.Scrollbar();
  // chart.legend = new am4charts.Legend();

  chart.cursor.behavior = "zoomX";
  chart.mouseWheelBehavior = "panXY";
  chart.zoomOutButton.disabled = false;
};

var indicator;
export const showLoadingIndicator = (chart: am4charts.XYChart) => {
  indicator = chart.tooltipContainer.createChild(am4core.Container);
  indicator.background.fill = am4core.color("#202227");
  indicator.background.fillOpacity = 0.8;
  indicator.width = am4core.percent(100);
  indicator.height = am4core.percent(100);

  var indicatorLabel = indicator.createChild(am4core.Label);
  indicatorLabel.text = "Loading chart...";
  indicatorLabel.align = "center";
  indicatorLabel.valign = "middle";
  indicatorLabel.fontSize = 20;
  indicatorLabel.fill = am4core.color("#ffffff");
};

export const hideLoadingIndicator = () => {
  indicator.hide();
};

export const SERIE_COLORS = ["#5887F6", "#877CF2"];
// filters old version
// export const FILTERS = {
//   "5s": { label: "5s" },
//   // "10s": { label: "10s" },
//   "1M": { label: "1M" },
//   "10M": { label: "10M" },
//   "1H": { label: "1h" },
//   "12H": { label: "12h" },
//   "1D": { label: "24h" },
//   "1W": { label: "1W" },
//   All: { label: "All" },
// };

// filters new version
export const FILTERS = {
  "1D": { label: "1D" },
  "1M": { label: "1M" },
  "1W": { label: "1W" },
  "1Y": { label: "1Y" },
};
