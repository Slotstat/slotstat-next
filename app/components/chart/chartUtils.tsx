// @ts-nocheck
"use client";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";

// export const getTooltip = (xv: string, yv: string, color: string) => {
//   return `
//       <div style="background-color: #24262C; padding: 12px; border-radius: 14px;">
//           <div style="display: flex; align-items: center; justify-content: space-between;">
//               <span style="font-size: 14px; color: white">{${xv}.formatDate(\"dd/MM/YYYY\")}</span>
//               <span style="margin-left: 40px; font-size: 14px; color: #969CB0;">{${xv}.formatDate(\"HH:mm:ss a\")}</span>
//           </div>
//           <div style="display: flex; align-items: center; margin-top: 12px;">
//               <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <circle cx="10" cy="10" r="9" stroke="${color}" stroke-width="2" />
//                   <circle cx="10" cy="9.99981" r="5.2381" fill="url(${color})" />
//                   <defs>
//                       <linearGradient id="${color.slice(
//                         1
//                       )}" x1="10" y1="4.76172" x2="10" y2="15.2379"
//                           gradientUnits="userSpaceOnUse">
//                           <stop stop-color="${color}" />
//                           <stop offset="1" stop-color="${color}" stop-opacity="0" />
//                       </linearGradient>
//                   </defs>
//               </svg>
//               <span style="margin-left: 12px; font-size: 16px; font-weight: bold; color: ${color};">{${yv}.formatNumber(\"#.#'%'\")}</span>
//           </div>
//       </div>`;
// };
export const getTooltip2 = (
  series1: string,
  formattedDate: string,
  formattedTime
) => {
  return `
        <div style="background-color: #24262C; padding: 12px; border-radius: 14px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 14px; color: white">${formattedDate}</span>
                <span style="margin-left: 40px; font-size: 14px; color: #969CB0;">${formattedTime}</span>
            </div>
            <div style="display: flex; align-items: center; margin-top: 12px;">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="9" stroke="${
                      SERIE_COLORS[0]
                    }" stroke-width="2" />
                    <circle cx="10" cy="9.99981" r="5.2381" fill="url(${
                      SERIE_COLORS[0]
                    })" />
                    <defs>
                        <linearGradient id="${SERIE_COLORS[0].slice(
                          1
                        )}" x1="10" y1="4.76172" x2="10" y2="15.2379"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="${SERIE_COLORS[0]}" />
                            <stop offset="1" stop-color="${
                              SERIE_COLORS[0]
                            }" stop-opacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
                <span style="margin-left: 12px; font-size: 16px; font-weight: bold; color: ${
                  SERIE_COLORS[0]
                };">${series1}%</span>
            </div>
        </div>`;
};
export const getTooltip3 = (
  series1Value: string,
  formattedDate: string,
  formattedTime: string,
  series2Value: string
) => {
  const svg = `<div style="display: flex; align-items: center; margin-top: 12px;">
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="9" stroke="${
        SERIE_COLORS[0]
      }" stroke-width="2" />
      <circle cx="10" cy="9.99981" r="5.2381" fill="url(${SERIE_COLORS[0]})" />
      <defs>
          <linearGradient id="${SERIE_COLORS[0].slice(
            1
          )}" x1="10" y1="4.76172" x2="10" y2="15.2379"
              gradientUnits="userSpaceOnUse">
              <stop stop-color="${SERIE_COLORS[0]}" />
              <stop offset="1" stop-color="${
                SERIE_COLORS[0]
              }" stop-opacity="0" />
          </linearGradient>
      </defs>
  </svg>
  <span style="margin-left: 12px; font-size: 16px; font-weight: bold; color: ${
    SERIE_COLORS[0]
  };">${series1Value}%</span>
</div>`;
  return `
        <div style="background-color: #24262C; padding: 12px; border-radius: 14px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 14px; color: white">${formattedDate}</span>
                <span style="margin-left: 40px; font-size: 14px; color: #969CB0;">${formattedTime}</span>
            </div>
            ${series1Value ? svg : ""}
            <div style="display: flex; align-items: center; margin-top: 12px;">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="9" stroke="${
                      SERIE_COLORS[1]
                    }" stroke-width="2" />
                    <circle cx="10" cy="9.99981" r="5.2381" fill="url(${
                      SERIE_COLORS[1]
                    })" />
                    <defs>
                        <linearGradient id="${SERIE_COLORS[1].slice(
                          1
                        )}" x1="10" y1="4.76172" x2="10" y2="15.2379"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="${SERIE_COLORS[1]}" />
                            <stop offset="1" stop-color="${
                              SERIE_COLORS[1]
                            }" stop-opacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
                <span style="margin-left: 12px; font-size: 16px; font-weight: bold; color: ${
                  SERIE_COLORS[1]
                };">${series2Value}%</span>
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

  // s.tooltipHTML = getTooltip(xv, yv, color);
  // s.tooltip.getFillFromObject = false;
  // s.tooltip.label.padding(0, 0, 0, 0);
  // s.tooltip.background.cornerRadius = 14;
  // s.tooltip.background.strokeOpacity = 0;
  // s.tooltip.background.fill = am4core.color("#24262C");
  // s.tooltip.background.fill = am4core.color("#24262C");
  // // s.tooltip.pointerOrientation = "vertical";
  // s.tooltip.background.pointerLength = 30;
  // s.tooltip.background.pointerBaseWidth = 0;
  // s.tooltip.zIndex = 1000000;
};

export const setChartParameters = (chart: am4charts.XYChart) => {
  chart.hiddenState.properties.opacity = 0;
  if (window.innerWidth < 768) {
    chart.paddingLeft = 0;
  }
  
  const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
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
  dateAxis.renderer.grid.template.location = 2;
  // dateAxis.renderer.grid.template.disabled = true;
  // valueAxis.renderer.grid.template.disabled = true;
  // dateAxis.renderer.minGridDistance = 60;
  // valueAxis.renderer.minGridDistance = 50;

  // zoom
  // dateAxis.showOnInit = false;
  // valueAxis.keepSelection = true;
  // dateAxis.keepSelection = true;

  // create series
  const series1 = chart.series.push(new am4charts.LineSeries());
  createSeries(series1, "date", "winRate", SERIE_COLORS[0]);

  chart.cursor = new am4charts.XYCursor();

  chart.cursor.lineX.stroke = am4core.color("#fff");
  chart.cursor.lineY.stroke = am4core.color("#fff");
  // cursor.behavior = 'panX';
  chart.cursor.keepSelection = true;
  chart.cursor.maxTooltipDistance = 2000;

  chart.plotContainer.tooltipPosition = "pointer";
  chart.plotContainer.tooltip.label.padding(0, 0, 0, 0);
  chart.plotContainer.tooltip.getFillFromObject = false;

  chart.plotContainer.tooltip.background.cornerRadius = 14;
  chart.plotContainer.tooltip.background.strokeOpacity = 0;
  chart.plotContainer.tooltip.background.fill = am4core.color("#24262C");
  chart.plotContainer.tooltip.background.fill = am4core.color("#24262C");
  chart.plotContainer.tooltip.dy = -35;
  chart.cursor.events.on("cursorpositionchanged", function (e) {
    const x = e.target.chart.xAxes.getIndex(0);
    const y = e.target.chart.yAxes.getIndex(0);
    const s = e.target.chart.series.getIndex(0);
    const s2 = e.target.chart.series.getIndex(1);

    if (x && y && s) {
      const { values } = s.dataItems;
      const cursorPosition = x.toAxisPosition(e.target.xPosition);
      const cursorDate = x.positionToDate(cursorPosition);
      const t = cursorDate.getTime();

      let v = null;
      let i = 0;

      do {
        let dateEnd = 1;
        const dateStart = values[i].dateX.getTime();
        if (!values[i + 1]?.dateX?.getTime()) {
          dateEnd = dateStart + 7.2e6;
        } else {
          dateEnd = values[i + 1].dateX.getTime();
        }
        if (t >= dateStart && t <= dateEnd) v = values[i];
        i += 1;
      } while (i < values.length);

      let v2 = null;
      let i2 = 0;

      if (s2) {
        const values2 = s2.dataItems.values;

        do {
          let dateEnd2 = 1;
          const dateStart = values2[i2].dateX.getTime();
          if (!values2[i2 + 1]?.dateX?.getTime()) {
            dateEnd2 = dateStart + 7.2e6;
          } else {
            dateEnd2 = values2[i2 + 1].dateX.getTime();
          }
          if (t >= dateStart && t <= dateEnd2) v2 = values2[i2];
          i2 += 1;
        } while (i2 < values2.length);
      }

      if (v && !v2) {
        const dateX = v?.dates?.dateX;
        const series1value = v?.values?.valueY?.value;
        const date = new Date(dateX);
        const formattedDate = date.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        });
        const formattedTime = date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });

        chart.plotContainer.tooltipHTML = getTooltip2(
          series1value,
          formattedDate,
          formattedTime
        );
      }

      if (v2) {
        const dateX = v2?.dates?.dateX;
        const series1value = v?.values?.valueY?.value;
        const series2value = v2?.values?.valueY?.value;

        const date = new Date(dateX);
        const formattedDate = date.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        });
        const formattedTime = date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });

        chart.plotContainer.tooltipHTML = getTooltip3(
          series1value,
          formattedDate,
          formattedTime,
          series2value
        );
      }
    }
  });

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
  indicator.background.fillOpacity = 1;
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
  if (indicator) {
    indicator.hide();
  }
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
  "1W": { label: "1W" },
  "1M": { label: "1M" },
  "1Y": { label: "1Y" },
  All: { label: "All" },
};
