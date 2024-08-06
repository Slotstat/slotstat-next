import React from "react";

import Lottie from "lottie-react";
import loadingJson from "../../assets/lottie/loading.json";

type Props = {
  title?: string;
  isLoading?: boolean;
  extraButtonClasses?: string;
  onClick?: () => void;
};

const ButtonComp = ({
  title,
  isLoading,
  extraButtonClasses,
  onClick,
}: Props) => {
  const primaryButtonColors =
    "hover:bg-[#3A6FEB] bg-[#5887F6] focus:bg-[#255CDE]";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full max-w-[311px] flex items-center justify-center text-sm font-bold py-3 rounded-lg ${primaryButtonColors} ${extraButtonClasses}`}
    >
      {isLoading ? (
        <Lottie
          animationData={loadingJson}
          loop={true}
          style={{ height: "20px", width: "20px" }}
        />
      ) : (
        <div>{title}</div>
      )}
    </button>
  );
};
export default ButtonComp;
