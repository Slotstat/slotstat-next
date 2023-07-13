import * as React from "react";
const DashedButton = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={115}
    height={42}
    fill="none"
    {...props}
  >
    
    <rect
      width={114.5}
      height={41.5}
      x={0.25}
      y={0.25}
      stroke="#fff"
      strokeDasharray="5 5"
      strokeWidth={0.5}
      rx={11.75}
    />
  </svg>
);
export default DashedButton;
