/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useCallback, useEffect, Fragment } from "react";
import { redX, search } from "../../assets";
import Image from "next/image";
import _ from "lodash";
import { useTranslations } from "next-intl";
import { Listbox, Transition } from "@headlessui/react";
import ArrowUp from "@/app/assets/svg/ArrowUp";

const debounce = 1000;

const SORT_BY = [
  { label: "Crypto", id: "0", value: "false" },
  { label: "Fiat", id: "0", value: "true" },
];
export const SearchAndCryptoSwitch = ({
  setCasinoFilter,
  keyWord,
  isFiat,
  cryptoFiatSwitcher,
}: {
  setCasinoFilter: (text: string) => void;
  cryptoFiatSwitcher: (text: string) => void;
  keyWord: string;
  isFiat: string;
}) => {
  const t = useTranslations();

  const [value, setValue] = useState(keyWord);
  const [focused, setFocused] = useState(false);
  const [selected, setSelected] = useState(SORT_BY[0]);

  const debouncedSearch = useCallback(
    _.debounce((text) => {
      setCasinoFilter(text);
    }, debounce),
    []
  );

  useEffect(() => {
    setValue(keyWord);
  }, [keyWord]);

  useEffect(() => {
    const index = SORT_BY.findIndex((x) => x.value === isFiat);
    if (index === -1) {
      setSelected(SORT_BY[0]);
    } else {
      setSelected(SORT_BY[index]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFiat]);

  return (
    <div className={`z-1 relative input w-full md:w-96 border-grey1 flex`}>
      <Listbox
        value={selected}
        onChange={(item) => cryptoFiatSwitcher(item.value)}
      >
        {({ open }) => (
          <div className="relative">
            <Listbox.Button
              className={`relative border cursor-pointer ${
                open ? "border-blue1" : "border-grey1"
              } w-full h-10 cursor-default rounded-l-lg bg-dark1 py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:ring-2  focus-visible:ring-opacity-75 focus-visible:ring-offset-2 text-xs lg:text-sm`}
            >
              <span
                title={selected.label}
                className="block truncate text-white"
              >
                {selected.label}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <span
                  className={`origin-center  duration-150 ${
                    open ? "" : "rotate-180"
                  }`}
                >
                  <ArrowUp />
                </span>
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-dark2 py-1 shadow-lg ring-1 ring-dark3 ring-opacity-5 focus:outline-none text-sm">
                {SORT_BY.map((item, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active, selected }) =>
                      `relative cursor-pointer select-none  py-2  px-2 rounded-md ${
                        active ? "bg-dark1 text-blue2" : "text-white"
                      } ${selected ? "bg-dark1" : "bg-dark2"}`
                    }
                    value={item}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          title={item.label}
                          className={`block truncate text-xs md:text-base ${
                            selected ? "text-blue2" : "font-normal"
                          }`}
                        >
                          {item.label}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
      <input
        placeholder={t("searchPlaceholder")}
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          debouncedSearch(e.target.value);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="placeholder:text-grey1 w-full  text-xs border-grey1 text-grey1 bg-dark1 border  h-10 px-3 lg:text-sm focus:border-blue1 focus:outline-none  rounded-none rounded-r-lg"
      />
      <span
        onClick={() => {
          if (value.length > 0) {
            setValue("");
            debouncedSearch("");
          }
        }}
        className={`absolute ${
          value.length > 0 && "cursor-pointer"
        } inset-y-0 z-10 right-0 pr-3 flex justify-center items-center`}
      >
        {value.length > 0 ? (
          <img src={redX.src} alt="" height={22} width={22} />
        ) : (
          <img className=" " src={search.src} alt="" height={22} width={22} />
        )}
      </span>
    </div>
  );
};
