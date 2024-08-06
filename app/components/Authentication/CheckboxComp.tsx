import React from "react";
import { CheckIcon } from "./Svgs";

type Props = {
  checked: boolean;
};

function CheckboxComp({ checked }: Readonly<Props>) {
  return (
    <div>
      {checked ? (
        <div className="w-5 h-5 flex items-center justify-center rounded border border-dark2 bg-blue1 cursor-pointer">
          <CheckIcon />
        </div>
      ) : (
        <div className="w-5 h-5 rounded border border-dark3 cursor-pointer bg-dark2" />
      )}
    </div>
  );
}

export default CheckboxComp;
