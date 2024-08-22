import React, { useState, useEffect, useRef } from "react";
import { search } from "@/app/assets";
import ArrowDown from "@/app/assets/svg/ArrowDown";
import { countries } from "@/app/utils/countries";

type countryOrState = { name: string; emoji?: string };
type country = {
  name: string;
  emoji?: string;
  states?: countryOrState[];
};

const DropdownInput = ({
  title,
  List,
  chosen,
  setChosen,
  placeHolder,
  searchFN,
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
      <p className="text-base font-bold text-white mb-3">{title}</p>
      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => {
            setShowDropdown(!showDropdown);
          }}
          className="h-12 w-full bg-grey3 rounded-lg mb-6 flex flex-row justify-between items-center p-3 cursor-pointer"
        >
          {chosen ? (
            <div className="font-normal flex flex-row items-center text-white">
              <div className="mr-2 rounded-full h-8 w-8 bg-grey3 flex items-center justify-center">
                <span>{chosen.emoji}</span>
              </div>
              {chosen.name}
            </div>
          ) : (
            <div className="font-normal flex flex-row items-center cursor-pointer text-white">
              {placeHolder}
            </div>
          )}
          <ArrowDown />
        </div>
        {showDropdown && (
          <div className="z-50 top-full left-0 w-full max-h-72 mt-1 absolute bg-grey3 rounded-lg p-1.5 overflow-y-auto">
            <div className="relative flex items-center bg-dark2 m-1.5 rounded-lg">
              <input
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  searchFN(e.target.value);
                }}
                type="text"
                placeholder="Search your state..."
                className="h-9 w-full px-4 rounded-l-md bg-dark2 dark2 focus:ring-dark2 placeholder:text-grey1 text-xs text-grey1 lg:text-sm focus:border-dark2 focus:outline-none rounded-r-lg rounded-lg"
              />
              <span className="absolute inset-y-0 z-10 right-0 pr-3 flex justify-center items-center">
                <img src={search.src} alt="" height={22} width={22} />
              </span>
            </div>
            {List.map((item: country) => (
              <div
                key={item.name}
                onClick={() => {
                  setChosen(item);
                  setShowDropdown(false);
                }}
                className="group p-1.5 font-bold flex flex-row items-center cursor-pointer text-grey1 hover:bg-dark1 rounded-lg"
              >
                <div className="group-hover:bg-grey3 mr-2 rounded-full h-8 w-8 bg-dark1 flex items-center justify-center">
                  <span>{item.emoji}</span>
                </div>
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const Geo = () => {
  const [chosenState, setChosenState] = useState<countryOrState>();
  const [chosenCountry, setChosenCountry] = useState<country>();
  const [countriesList, setCountriesList] = useState(countries);
  const [StatesList, setStatesList] = useState<countryOrState[]>();

  const chooseCountry = (country: country) => {
    setChosenCountry(country);
    if (country.states) {
      setStatesList(country.states);
    } else {
      setStatesList(undefined);
      setChosenState(undefined);
    }
  };

  const searchCountry = (countryName: string) => {
    const filteredCountry = countries.filter((country) =>
      country.name.toLowerCase().includes(countryName.toLowerCase())
    );
    setCountriesList(filteredCountry);
  };

  const searchState = (stateName: string) => {
    const filteredStates = StatesList?.filter((state) =>
      state.name.toLowerCase().includes(stateName.toLowerCase())
    );
    setStatesList(filteredStates);
  };

  return (
    <div className="z-50 top-full right-0 absolute font-bold pt-8 transition duration-200 ease-in-out">
      <div className="w-[342px] p-4 bg-dark1 border border-grey1 rounded-xl">
        <DropdownInput
          title="Your country of residence"
          placeHolder="Choose Country"
          List={countriesList}
          chosen={chosenCountry}
          setChosen={chooseCountry}
          searchFN={searchCountry}
        />
        {StatesList && (
          <DropdownInput
            title="Select state"
            placeHolder="Choose State"
            List={StatesList}
            chosen={chosenState}
            setChosen={setChosenState}
            searchFN={searchState}
          />
        )}
        <div className="flex flex-row justify-between">
          <div className="text-grey1 bg-grey3 h-12 w-[147px] items-center justify-center flex py-2 rounded-lg text-xs md:text-base cursor-pointer">
            <p>Current location</p>
          </div>
          <div className="hover:text-[#969CB0] hover:bg-blue3 text-white bg-blue1 h-12 w-[147px] items-center justify-center flex py-2 rounded-lg text-xs md:text-base cursor-pointer">
            <p>Save</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Geo;
