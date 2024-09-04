import { Link } from "@/navigation";
import React, { useState } from "react";
import { ArrowDown, Checkmark } from "../assets/svg/SVGComponents";
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
     flex-col  justify-around px-3 py-1.5 rounded-lg w-48 ${
       isDropdownOpened && "h-32"
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
                  className=" py-1.5 flex justify-between  "
                  key={item.value}
                  onClick={() => {
                    select(item);
                    setIsVisible(false);
                    setIsDropdownOpened(false);
                  }}
                >
                  <span>
                    <span>{item.label}</span>
                    {item.hint && (
                      <span className="text-[#D0DDFC] font-normal ml-1">{item.hint}</span>
                    )}
                  </span>
                  {selected.label === item.label && <Checkmark />}
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
          className="w-full text-center h-8 flex flex-row items-center justify-between  "
          onClick={() => {
            setTimeout(() => setIsVisible(true), 300);
            setIsDropdownOpened(true);
          }}
        >
          <span>{selected.label}</span> <ArrowDown />
        </div>
      )}
    </div>
  );
};

export default FloatingButtons;
