import React, { useState, useEffect, useRef } from "react";
import { search } from "@/app/assets";
import ArrowDown from "@/app/assets/svg/ArrowDown";

const DropdownInput = ({
  title,
  List,
  chosen,
  setChosen,
  placeHolder,
  searchFN,
  errorState,
  setErrorState,
}: any) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [text, setText] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <p className="text-xs lg:text-base font-bold text-white mb-3">{title}</p>
      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => {
            setShowDropdown(!showDropdown);
          }}
          className={`h-12 w-full bg-grey3 rounded-lg mb-6 flex flex-row justify-between items-center p-3 cursor-pointer 
             ${errorState && "border border-red"}`}
        >
          {chosen ? (
            <div className="font-bold text-xs lg:text-base flex flex-row items-center text-white">
              <div className="mr-2 rounded-full text-base h-8 w-8 bg-dark1 flex items-center justify-center">
                <span>{chosen.emoji}</span>
              </div>
              {chosen.name}
            </div>
          ) : (
            <div className="font-bold text-base flex flex-row items-center cursor-pointer text-grey1">
              {placeHolder}
            </div>
          )}
          <ArrowDown />
        </div>
        {errorState && (
          <p className="text-red -mt-5 ml-2 mb-2 text-xs font-normal ">select state</p>
        )}

        {showDropdown && (
          <div className="z-50 top-full left-0 w-full max-h-72 mt-1 absolute bg-grey3 rounded-lg p-1.5 ">
            <div className="relative flex items-center bg-dark2 m-1.5 rounded-lg">
              <input
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  searchFN(e.target.value);
                }}
                type="text"
                placeholder="Search your state..."
                className="h-9 w-full px-4 rounded-l-md bg-dark2 dark2 focus:ring-dark2 placeholder:text-grey1 
                font-normal  text-grey1 text-xs lg:text-base focus:border-dark2 focus:outline-none rounded-r-lg rounded-lg"
              />
              <span className="absolute inset-y-0 z-10 right-0 pr-3 flex justify-center items-center">
                <img src={search.src} alt="" height={22} width={22} />
              </span>
            </div>
            <div className="overflow-y-auto max-h-[234px]">
              {List.map((item: country) => (
                <div
                  key={item.name}
                  onClick={() => {
                    setChosen(item);
                    setShowDropdown(false);
                    setErrorState && setErrorState(false);
                  }}
                  className="group p-1.5 font-bold flex flex-row text-xs lg:text-base items-center cursor-pointer text-grey1 hover:bg-dark1 rounded-lg"
                >
                  <div className="group-hover:bg-grey3 text-base mr-2 rounded-full h-8 w-8 bg-dark1 flex items-center justify-center">
                    <span>{item.emoji}</span>
                  </div>
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DropdownInput;
