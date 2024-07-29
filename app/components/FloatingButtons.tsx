import { Link } from "@/navigation";
import React, { useState } from "react";
import ArrowUp from "../assets/svg/ArrowUp";
import ArrowDown from "../assets/svg/ArrowDown";

const FloatingButtons = ({
  select,
  selected,
  items,
}: {
  select?: (item: FloatingButtonsItem) => void;
  selected: FloatingButtonsItem;
  items: FloatingButtonsItems;
}) => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={`flex z-10 cursor-pointer md:hidden shadow-[0_0px_15px_2px_rgba(88,135,246,0.2)] fixed bottom-10 left-1/2 transform -translate-x-1/2 h-10 bg-blue1 text-white
    font-bold text-xs transition-all duration-500 ease-in-out overflow-hidden 
     flex-col items-center justify-around px-3 rounded-lg ${
       isDropdownOpened && "h-32 w-40"
     } ${selected.width}`}
    >
      {isDropdownOpened ? (
        <div
          className={` ${
            isVisible ? "flex" : "hidden  opacity-0"
          }   h-full  flex-col justify-between`}
        >
          {items.map((item) => {
            if (select) {
              return (
                <div
                  className="text-center h-8 flex items-center justify-center "
                  key={item.value}
                  onClick={() => {
                    select(item);
                    setIsVisible(false);
                    setIsDropdownOpened(false);
                  }}
                >
                  {item.label}
                </div>
              );
            } else {
              return (
                <Link
                  href={`/blog/${item.value}`}
                  className="text-center h-8 flex items-center justify-center "
                  key={item.value}
                  onClick={() => {
                    setIsVisible(false);
                    setIsDropdownOpened(false);
                  }}
                >
                  {item.label}
                </Link>
              );
            }
          })}
        </div>
      ) : (
        <div
          className="text-center h-8 flex items-center justify-center  "
          onClick={() => {
            setTimeout(() => setIsVisible(true), 300);
            setIsDropdownOpened(true);
          }}
        >
          {selected.label} <ArrowDown />
        </div>
      )}
    </div>
  );
};

export default FloatingButtons;
