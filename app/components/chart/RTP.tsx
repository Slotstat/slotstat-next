// @ts-nocheck

import React, { useEffect } from "react";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

export default function RTP() {
  useEffect(() => {
    // create chart
    const chart = am4core.create("RTP", am4charts.GaugeChart);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    chart.innerRadius = -10;

    const axis = chart.xAxes.push(new am4charts.ValueAxis());
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;
    axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor(
      "background"
    );
    axis.renderer.grid.template.strokeOpacity = 0.3;
    axis.renderer.minGridDistance = 10000;

    const colorSet = new am4core.ColorSet();

    const range0 = axis.axisRanges.create();
    range0.value = 0;
    range0.endValue = 50;
    range0.axisFill.fillOpacity = 1;
    range0.axisFill.fill = colorSet.getIndex(0);
    range0.axisFill.zIndex = -1;

    const range1 = axis.axisRanges.create();
    range1.value = 50;
    range1.endValue = 80;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = colorSet.getIndex(2);
    range1.axisFill.zIndex = -1;

    const range2 = axis.axisRanges.create();
    range2.value = 80;
    range2.endValue = 100;
    range2.axisFill.fillOpacity = 1;
    range2.axisFill.fill = colorSet.getIndex(4);
    range2.axisFill.zIndex = -1;

    const hand = chart.hands.push(new am4charts.ClockHand());

    // using chart.setTimeout method as the timeout will be disposed together with a chart
    chart.setTimeout(randomValue, 2000);

    function randomValue() {
      hand.showValue(Math.random() * 100, 1000, am4core.ease.cubicOut);
      chart.setTimeout(randomValue, 2000);
    }
  }, []);

  return (
    <div className="px-4 py-6 lg:py-18 lg:w-1/4 md:w-full  sm:w-full">
      <h3 className=" flex flex-1 items-center justify-between text-[24px] font-bold text-white h-[48px]">
        RTP
      </h3>
      <div className="rounded-3xl bg-dark2 p-4 mt-6">
        <div className="rounded-3xl bg-dark1 p-2">
          <p className=" text-lg text-white text-center">
            Adjarabet Fruity time
          </p>
          <div id="RTP"></div>
        </div>
      </div>
    </div>
  );
}
