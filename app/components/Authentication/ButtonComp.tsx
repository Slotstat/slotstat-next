import dynamic from "next/dynamic";
import React from "react";
import loadingJson from "../../assets/lottie/loading.json";
const LottieComponent = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

type Props = {
  title?: string;
  isLoading?: boolean;
  extraButtonClasses?: string;
  onClick?: () => void;
  type: "button" | "submit" | "reset" | undefined;
};

const ButtonComp = ({ title, isLoading, extraButtonClasses, onClick, type = "button" }: Props) => {
  const primaryButtonColors = "hover:bg-[#3A6FEB] bg-[#5887F6] focus:bg-[#255CDE]";
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full max-w-[311px] flex items-center justify-center text-sm font-bold py-3 rounded-lg ${primaryButtonColors} ${extraButtonClasses}`}
    >
      {isLoading ? (
        <>
          <LottieComponent
            animationData={loadingJson}
            loop={true}
            style={{ height: "20px", width: "20px" }}
          />
        </>
      ) : (
        <div>{title}</div>
      )}
    </button>
  );
};
export default ButtonComp;
