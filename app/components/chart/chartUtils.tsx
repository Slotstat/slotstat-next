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
  s.showOnInit = false;
  // s.cursorTooltipEnabled = false;
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
  const isSmallerThan768 = window.innerWidth < 768;
  chart.paddingLeft = isSmallerThan768 ? 0 : 10;
  chart.paddingBottom = isSmallerThan768 ? 0 : 16;
  // if (window.innerWidth < 768) {
  //   chart.paddingLeft = 0;
  // }
  chart.tapToActivate = true;
  const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.dateFormatter = new am4core.DateFormatter();
  dateAxis.dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss";

  dateAxis.renderer.axisFills.template.disabled = true;
  dateAxis.renderer.ticks.template.disabled = true;
  dateAxis.interpolationDuration = 500;
  dateAxis.rangeChangeDuration = 500;

  dateAxis.tooltip.disabled = true;
  dateAxis.renderer.labels.template.fill = am4core.color("#969CB0");
  dateAxis.renderer.labels.template.fontSize = isSmallerThan768 ? 10 : 12;
  dateAxis.renderer.labels.template.fontWeight = "normal";

  dateAxis.startLocation = 0.5;
  dateAxis.endLocation = 10;

  const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.interpolationDuration = 500;
  valueAxis.rangeChangeDuration = 500;

  valueAxis.tooltip.disabled = true;
  valueAxis.renderer.labels.template.fill = am4core.color("#969CB0");
  valueAxis.renderer.labels.template.fontSize = isSmallerThan768 ? 10 : 12;
  valueAxis.renderer.labels.template.fontWeight = "normal";

  valueAxis.numberFormatter = new am4core.NumberFormatter();
  valueAxis.numberFormatter.numberFormat = "#.#'%'";

  valueAxis.min = 0;
  valueAxis.max = 100;

  // grid
  dateAxis.renderer.grid.template.stroke = "#FFFFFF66";
  valueAxis.renderer.grid.template.stroke = "#FFFFFF66";
  dateAxis.renderer.grid.template.location = 0.2;
  // dateAxis.renderer.grid.template.disabled = true;
  // valueAxis.renderer.grid.template.disabled = true;
  dateAxis.renderer.minGridDistance = isSmallerThan768 ? 40 : 70;
  valueAxis.renderer.minGridDistance = isSmallerThan768 ? 20 : 40;

  let watermark = new am4core.Image();
  const svgDataUri =
    "data:image/svg+xml;base64," +
    btoa(
      '<svg width="145" height="39" viewBox="0 0 145 39" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.6357 0.456591C20.1767 -0.152197 18.5374 -0.152197 17.0784 0.45659L7.60126 4.41116C6.14229 5.01995 4.98315 6.18765 4.37882 7.65739L0.453244 17.2046C-0.151081 18.6743 -0.151081 20.3257 0.453243 21.7954L4.37882 31.3426C4.98315 32.8124 6.14229 33.9801 7.60126 34.5888L17.0784 38.5434C18.5374 39.1522 20.1767 39.1522 21.6357 38.5434L31.1128 34.5888C32.5718 33.9801 33.731 32.8124 34.3353 31.3426L38.2609 21.7954C38.8652 20.3257 38.8652 18.6743 38.2609 17.2046L34.3353 7.6574C33.731 6.18765 32.5718 5.01995 31.1129 4.41116L21.6357 0.456591ZM16.5873 15.0408C16.3044 14.7038 15.8886 14.5094 15.4505 14.5094C15.0125 14.5094 14.5966 14.7038 14.3138 15.0408L8.454 22.0229C7.92322 22.6553 8.00187 23.6015 8.62968 24.1362C9.25749 24.6709 10.1967 24.5917 10.7275 23.9592L15.4505 18.3316L17.0483 20.2354C17.4938 20.7661 18.2428 20.919 18.8581 20.6048L20.5428 19.7445L24.0801 23.9592C24.3629 24.2962 24.7788 24.4906 25.2168 24.4906C25.6549 24.4906 26.0707 24.2962 26.3536 23.9592L30.2601 19.3045C30.7909 18.672 30.7122 17.7259 30.0844 17.1912C29.4566 16.6565 28.5174 16.7357 27.9866 17.3681L25.2168 20.6684L22.0564 16.9027C21.611 16.3719 20.862 16.2191 20.2466 16.5333L18.5619 17.3936L16.5873 15.0408Z" fill="#292B30"/><path d="M55.8906 28.8613C60.6124 28.8613 63.7602 26.6259 63.7602 23.2989C63.7602 16.7748 52.2267 18.3083 52.2267 15.5531C52.2267 14.2795 53.6974 13.4218 55.8906 13.4218C57.9548 13.4218 59.6061 14.5394 60.0189 16.2289L63.1926 15.4232C62.3669 12.3561 59.4513 10.3027 55.8906 10.3027C51.6333 10.3027 48.7951 12.4081 48.7951 15.5531C48.7951 21.8693 60.3285 19.66 60.3285 23.2989C60.3285 24.7545 58.5482 25.7422 55.8906 25.7422C53.0782 25.7422 51.1688 24.3906 51.0914 22.3632H47.8146C47.892 26.262 51.1172 28.8613 55.8906 28.8613Z" fill="#292B30"/><path d="M65.6159 28.4974H68.7122V10.6666H65.6159V28.4974Z" fill="#292B30"/><path d="M77.56 28.8613C81.7657 28.8613 84.5523 26.1061 84.5523 21.9993C84.5523 17.8925 81.7657 15.1373 77.56 15.1373C73.3543 15.1373 70.5677 17.8925 70.5677 21.9993C70.5677 26.1061 73.3543 28.8613 77.56 28.8613ZM77.56 26.1061C75.212 26.1061 73.6639 24.4686 73.6639 21.9993C73.6639 19.53 75.212 17.8925 77.56 17.8925C79.908 17.8925 81.4561 19.53 81.4561 21.9993C81.4561 24.4686 79.908 26.1061 77.56 26.1061Z" fill="#292B30"/><path d="M91.5053 28.8613C92.3568 28.8613 93.2341 28.7053 93.6985 28.4974V26.262H91.4537C90.7829 26.262 90.3185 25.8202 90.3185 25.1704V18.1004H93.5695V15.5012H90.3185V10.6666H87.2222V15.5012H85.1581V18.1004H87.2222V25.1704C87.2222 27.3797 88.9251 28.8613 91.5053 28.8613Z" fill="#292B30"/><path d="M103.161 28.8613C107.882 28.8613 111.03 26.6259 111.03 23.2989C111.03 16.7748 99.4967 18.3083 99.4967 15.5531C99.4967 14.2795 100.967 13.4218 103.161 13.4218C105.225 13.4218 106.876 14.5394 107.289 16.2289L110.463 15.4232C109.637 12.3561 106.721 10.3027 103.161 10.3027C98.9032 10.3027 96.065 12.4081 96.065 15.5531C96.065 21.8693 107.598 19.66 107.598 23.2989C107.598 24.7545 105.818 25.7422 103.161 25.7422C100.348 25.7422 98.4388 24.3906 98.3614 22.3632H95.0845C95.162 26.262 98.3872 28.8613 103.161 28.8613Z" fill="#292B30"/><path d="M117.988 28.8613C118.839 28.8613 119.716 28.7053 120.181 28.4974V26.262H117.936C117.265 26.262 116.801 25.8202 116.801 25.1704V18.1004H120.052V15.5012H116.801V10.6666H113.704V15.5012H111.64V18.1004H113.704V25.1704C113.704 27.3797 115.407 28.8613 117.988 28.8613Z" fill="#292B30"/><path d="M127.771 28.8613C129.294 28.8613 130.971 28.1595 131.951 27.0938V28.4974H135.048V15.5012H131.951V16.9048C130.971 15.8391 129.294 15.1373 127.771 15.1373C123.746 15.1373 121.063 17.8925 121.063 21.9993C121.063 26.1061 123.746 28.8613 127.771 28.8613ZM128.081 26.1061C125.733 26.1061 124.159 24.4686 124.159 21.9993C124.159 19.53 125.733 17.8925 128.081 17.8925C130.403 17.8925 131.951 19.53 131.951 21.9993C131.951 24.4686 130.403 26.1061 128.081 26.1061Z" fill="#292B30"/><path d="M142.807 28.8613C143.658 28.8613 144.536 28.7053 145 28.4974V26.262H142.755C142.084 26.262 141.62 25.8202 141.62 25.1704V18.1004H144.871V15.5012H141.62V10.6666H138.524V15.5012H136.46V18.1004H138.524V25.1704C138.524 27.3797 140.227 28.8613 142.807 28.8613Z" fill="#292B30"/></svg>'
    );

  watermark.href = svgDataUri;
  chart.plotContainer.children.push(watermark);
  watermark.align = "center";
  watermark.valign = "middle";
  watermark.opacity = 1;
  watermark.width = 145;

  // create series
  const series1 = chart.series.push(new am4charts.LineSeries());
  createSeries(series1, "date", "winRate", SERIE_COLORS[0]);

  chart.cursor = new am4charts.XYCursor();

  chart.cursor.lineX.stroke = am4core.color("#fff");
  chart.cursor.lineY.stroke = am4core.color("#fff");
  // cursor.behavior = 'panX';
  chart.cursor.keepSelection = true;
  chart.cursor.maxTooltipDistance = 2000;
  // if (window.innerWidth < 768) {
  //   chart.cursor.behavior = "none";
  // }

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
      const cursorPosition = x.toAxisPosition(e.target.xPosition);
      const cursorPositionY = y.toAxisPosition(e.target.yPosition);

      // if (cursorPosition > 0.90 && cursorPositionY > 0.75) {
      if (cursorPositionY > 0.9) {
        chart.plotContainer.tooltipHTML = "";
      } else {
        const { values } = s.dataItems;
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

        const generateFormattedDate = (date) => {
          const months = [
            "Jan.",
            "Feb.",
            "Mar.",
            "Apr.",
            "May",
            "Jun.",
            "Jul.",
            "Aug.",
            "Sep.",
            "Oct.",
            "Nov.",
            "Dec.",
          ];
          const day = date.toLocaleDateString("en-US", { day: "2-digit" });
          const monthIndex = date.getMonth();
          const month = months[monthIndex];
          const year = date.toLocaleDateString("en-US", { year: "numeric" });

          return `${day} ${month} ${year}`;
        };

        if (v && !v2) {
          const dateX = v?.dates?.dateX;
          const series1value = v?.values?.valueY?.value;
          const date = new Date(dateX);
          // const formattedDate = date.toLocaleDateString("en-US", {
          //   day: "2-digit",
          //   month: "2-digit",
          //   year: "numeric",
          // });
          const formattedDate = generateFormattedDate(date);

          const formattedTime = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            // second: "2-digit",
            hour12: false,
          });
          // chart.plotContainer.mouseOptions.sensitivity = ;
          // chart.plotContainer.showOnInit = false;
          chart.plotContainer.showTooltipOn = "hover";
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

          const formattedDate = generateFormattedDate(date);

          const formattedTime = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            // second: "2-digit",
            hour12: false,
          });

          chart.plotContainer.tooltipHTML = getTooltip3(
            series1value,
            formattedDate,
            formattedTime,
            series2value
          );
        }
      }
    }
  });

  chart.mouseWheelBehavior = "panXY";

  // bottom scrollbar

  // chart.scrollbarY = new am4core.Scrollbar();
  // chart.legend = new am4charts.Legend();

  if (window.innerWidth < 768) {
    chart.cursor.behavior = "none";
    function customizeGrip(grip) {
      // Remove default grip image
      grip.icon.disabled = true;

      // Disable background
      grip.background.disabled = true;

      grip.background.fill = am4core.color("#c00");
      grip.background.fillOpacity = 0.5;

      // Add rotated rectangle as bi-di arrow
      var img = grip.createChild(am4core.Rectangle);
      img.width = 15;
      img.height = 15;
      img.fill = am4core.color("#999");
      img.rotation = 45;
      img.align = "center";
      img.valign = "middle";

      // Add vertical bar
      var line = grip.createChild(am4core.Rectangle);
      line.height = 30;
      line.width = 2;
      line.fill = am4core.color("#999");
      line.align = "center";
      line.valign = "middle";
    }

    const scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series1);
    scrollbarX.background.fill = am4core.color("#24262C");
    scrollbarX.thumb.background.fill = am4core.color("#24262C");
    scrollbarX.thumb.background.fillOpacity = 0.2;
    scrollbarX.unselectedOverlay.fill = am4core.color("#000");
    scrollbarX.unselectedOverlay.fillOpacity = 0.4;

    scrollbarX.minHeight = 30;

    customizeGrip(scrollbarX.startGrip);
    customizeGrip(scrollbarX.endGrip);

    // Configure scrollbar series
    var scrollSeries1 = scrollbarX.scrollbarChart.series.getIndex(0);
    scrollSeries1.fillOpacity = 0.3;
    // scrollSeries1.strokeDasharray = "2,2";

    // Bring back colors
    scrollbarX.scrollbarChart.plotContainer.filters.clear();

    chart.scrollbarX = scrollbarX;

    // move scrollbar bottom
    chart.scrollbarX.parent = chart.bottomAxesContainer;
  } else {
    chart.cursor.behavior = "zoomX";
  }

  chart.mouseWheelBehavior = "panXY";
  // chart.mouseWheelBehavior = "none";

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
  // "1Y": { label: "1Y" },
  // All: { label: "All" },
};
