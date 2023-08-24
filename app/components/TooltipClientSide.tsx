"use client";

import React from "react";
import { Tooltip } from "react-tooltip";

export default function TooltipClientSide() {
  return (
    <Tooltip
      id="my-tooltip"
      style={{
        backgroundColor: "#24262C",
        color: "#fff",
        maxWidth: 200,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#36383D",
        fontSize: 12,
        zIndex: 10,
      }}
    />
  );
}
