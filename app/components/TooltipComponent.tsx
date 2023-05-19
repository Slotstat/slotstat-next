import { Tooltip } from "@material-tailwind/react";
import Image from "next/image";
import React from "react";
import { tooltip as tooltipSVG } from "../assets";

export default function TooltipComponent({ text }: { text: string }) {
  return (
    <Tooltip content={text} className="border bg-dark2 border-dark3 rounded-lg max-w-[210px]">
      <Image
        src={tooltipSVG}
        alt=""
        className="ml-3 h-4 w-4 "
        width="0"
        height="0"
        sizes="100vw"
      />
    </Tooltip>
  );
}
