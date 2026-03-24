import React, { useEffect, useState } from "react";

import { countries } from "@/app/utils/countries";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import DropdownInput from "./DropdownInput";
import { useTranslations, useLocale } from "next-intl";

const LOCALE_LABELS: Record<string, string> = { en: "EN", es: "ES", pt: "PT" };
const LOCALES = ["en", "es", "pt"] as const;

const Geo = ({
  initialCountry,
  initialState,
}: {
  initialCountry?: country;
  initialState?: countryOrState;
}) => {
  const [countriesList, setCountriesList] = useState(countries);
  const [StatesList, setStatesList] = useState<countryOrState[]>();
  const [errorState, setErrorState] = useState(false);
  const [chosenCountry, setChosenCountry] = useState<country | undefined>(initialCountry);
  const [chosenState, setChosenState] = useState<countryOrState | undefined>(initialState);
  const t = useTranslations("geo");
  const currentLocale = useLocale();
  const [pendingLocale, setPendingLocale] = useState<"en" | "es" | "pt">(
    currentLocale as "en" | "es" | "pt"
  );

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
    // 1. if user choose country and state as well we set cookies
    // 2. if user choose country without states we update country and state is blank
    // 3. if user choose country which has state but don't choose state we show error
    if (chosenCountry?.states && chosenState?.code) {
      setCookie("country", chosenCountry.code);
      setCookie("region", chosenState.code);
      applyLocaleForCountry();
    } else if (chosenCountry && !chosenCountry?.states) {
      setCookie("country", chosenCountry.code);
      setCookie("region", "");
      applyLocaleForCountry();
    } else if (chosenCountry?.states && !chosenState?.code) {
      setErrorState(true);
    }
  };

  const applyLocaleForCountry = () => {
    setCookie("localeSet", "1");
    // Replace the locale segment in the current URL and navigate
    const segments = window.location.pathname.split("/");
    segments[1] = pendingLocale;
    window.location.href = segments.join("/") + window.location.search;
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
          title={t("countryTitle")}
          placeHolder={t("chooseCountry")}
          List={countriesList}
          chosen={chosenCountry}
          setChosen={chooseCountry}
          searchFN={searchCountry}
        />
        {StatesList && (
          <DropdownInput
            title={t("selectState")}
            placeHolder={t("select")}
            List={StatesList}
            chosen={chosenState}
            setChosen={setChosenState}
            searchFN={searchState}
            errorState={errorState}
            setErrorState={setErrorState}
          />
        )}
        <div className="flex flex-row gap-2 mb-3">
          {LOCALES.map((l) => (
            <button
              key={l}
              onClick={() => setPendingLocale(l)}
              className={`flex-1 h-9 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                pendingLocale === l
                  ? "bg-blue1 text-white border-blue1"
                  : "bg-grey3 text-grey1 border-grey1 hover:bg-dark3 hover:text-white"
              }`}
            >
              {LOCALE_LABELS[l]}
            </button>
          ))}
        </div>
        <div className="flex flex-row justify-between">
          <div
            onClick={setCurrentLocation}
            className="text-grey1 bg-grey3 hover:bg-dark3 h-12 w-[147px] items-center justify-center flex py-2 rounded-lg text-xs md:text-base cursor-pointer"
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
