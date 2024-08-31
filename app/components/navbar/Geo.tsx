import React, { useEffect, useState } from "react";

import { countries } from "@/app/utils/countries";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import DropdownInput from "./DropdownInput";

const Geo = ({
  chosenCountry,
  setChosenCountry,
  chosenState,
  setChosenState,
}: {
  chosenCountry?: country;
  setChosenCountry: (country: country) => void;
  chosenState?: countryOrState;
  setChosenState: (country?: countryOrState) => void;
}) => {
  const [countriesList, setCountriesList] = useState(countries);
  const [StatesList, setStatesList] = useState<countryOrState[]>();
  const [errorState, setErrorState] = useState(false);

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
    const filteredStates = chosenCountry?.states?.filter((state) =>
      state.name.toLowerCase().includes(stateName.toLowerCase())
    );
    setStatesList(filteredStates);
  };

  const saveChosenCountry = () => {
    if (chosenCountry?.states && chosenState?.code) {
      setCookie("country", chosenCountry?.code);
      setCookie("region", chosenState?.code);
      location.reload();
    } else if (chosenCountry && !chosenCountry?.states) {
      setCookie("country", chosenCountry?.code);
      setCookie("region", "");
      location.reload();
    } else if (chosenCountry?.states && !chosenState?.code) {
      setErrorState(true);
    }
  };

  const setCurrentLocation = () => {
    const currentLocCountry = getCookie("currentLocCountry");
    const currentLocRegion = getCookie("currentLocRegion");
    currentLocCountry && setCookie("country", currentLocCountry);
    currentLocRegion && setCookie("region", currentLocRegion);
    location.reload();
  };

  useEffect(() => {
    chosenCountry && chooseCountry(chosenCountry);
  }, []);

  return (
    <div
      // className="z-50 top-full right-0 absolute font-bold pt-8 transition duration-200 ease-in-out"
        className="z-50 absolute font-bold pt-8 transition duration-200 ease-in-out
      right-4 left-4 lg:top-full lg:left-auto lg:right-0"
    >
      <div className="w-full lg:w-[342px] p-4 bg-dark1 border border-grey1 rounded-xl">
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
            placeHolder="Select"
            List={StatesList}
            chosen={chosenState}
            setChosen={setChosenState}
            searchFN={searchState}
            errorState={errorState}
            setErrorState={setErrorState}
          />
        )}
        <div className="flex flex-row justify-between">
          <div
            onClick={setCurrentLocation}
            className="text-grey1 bg-grey3 h-12 w-[147px] items-center justify-center flex py-2 rounded-lg text-xs md:text-base cursor-pointer"
          >
            <p>Current location</p>
          </div>
          <div
            onClick={saveChosenCountry}
            className="hover:text-[#969CB0] hover:bg-blue3 text-white bg-blue1 h-12 w-[147px] items-center justify-center flex py-2 rounded-lg text-xs md:text-base cursor-pointer"
          >
            <p>Save</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Geo;
