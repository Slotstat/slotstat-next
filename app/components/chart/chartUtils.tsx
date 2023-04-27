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

export const createSerie = (
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
  // s.stacked = true;

  const fillModifier = new am4core.LinearGradientModifier();
  fillModifier.opacities = [0.45, 0];
  fillModifier.offsets = [0, 1];
  fillModifier.gradient.rotation = 90;
  s.segments.template.fillModifier = fillModifier;

  // const bullet = s.bullets.push(new am4charts.CircleBullet());
  // bullet.states.create("hover").properties.scale = 1.7;
  // s.minBulletDistance = 40;

  s.tooltipHTML = getTooltip(xv, yv, color);
  s.tooltip.getFillFromObject = false;
  s.tooltip.label.padding(0, 0, 0, 0);
  s.tooltip.background.cornerRadius = 14;
  s.tooltip.background.strokeOpacity = 0;
  s.tooltip.background.fill = am4core.color("#24262C");
  s.tooltip.pointerOrientation = "down";
};

export const setChartParameters = (chart: am4charts.XYChart) => {
  const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  // dateAxis.dataFields.date = "date";
  dateAxis.dateFormatter = new am4core.DateFormatter();
  dateAxis.dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss";

  dateAxis.renderer.minGridDistance = 70;
  dateAxis.renderer.grid.template.location = 0;
  dateAxis.tooltip.disabled = true;
  dateAxis.renderer.grid.template.disabled = true;
  dateAxis.renderer.labels.template.fill = am4core.color("#969CB0");
  dateAxis.renderer.labels.template.fontSize = 12;
  dateAxis.renderer.labels.template.fontWeight = "normal";

  dateAxis.startLocation = 0.5;
  dateAxis.endLocation = 0.5;

  const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.tooltip.disabled = true;
  valueAxis.renderer.labels.template.fill = am4core.color("#969CB0");
  valueAxis.renderer.labels.template.fontSize = 12;
  valueAxis.renderer.labels.template.fontWeight = "normal";
  valueAxis.renderer.grid.template.disabled = true;

  valueAxis.numberFormatter = new am4core.NumberFormatter();
  valueAxis.numberFormatter.numberFormat = "#.#'%'";

  // valueAxis.min = 0;
  // valueAxis.max = 100;

  // create series
  const serie1 = chart.series.push(new am4charts.LineSeries());
  createSerie(serie1, "date", "winRate", SERIE_COLORS[0]);

  const cursor = new am4charts.XYCursor();
  cursor.lineX.stroke = am4core.color("#fff");
  cursor.lineY.stroke = am4core.color("#fff");
  // cursor.behavior = 'panX';
  chart.cursor = cursor;

  const scrollbarX = new am4charts.XYChartScrollbar();
  scrollbarX.series.push(serie1);
  scrollbarX.background.fill = am4core.color("#24262C");
  chart.scrollbarX = scrollbarX;
  chart.scrollbarX.parent = chart.bottomAxesContainer;

  // chart.scrollbarY = new am4core.Scrollbar();
  // chart.legend = new am4charts.Legend();
};

export const SERIE_COLORS = ["#5887F6", "#877CF2"];
export const FILTERS = {
  "10M": { label: "10M" },
  "1H": { label: "1h" },
  "12H": { label: "12h" },
  "1D": { label: "24h" },
  "1W": { label: "1W" },
  All: { label: "All" },
};
