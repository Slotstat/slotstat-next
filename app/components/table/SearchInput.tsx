/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useCallback, useEffect } from "react";
import { search } from "../../assets";
import Image from "next/image";
import _ from "lodash";
import { useTranslations } from "next-intl";

const debounce = 500;

export const SearchInput = ({
  setCasinoFilter,
  keyWord,
}: {
  setCasinoFilter: (text: string) => void;
  keyWord: string;
}) => {
  const t = useTranslations();

  const [value, setValue] = useState(keyWord);
  const [focused, setFocused] = useState(false);

  const debouncedSearch = useCallback(
    _.debounce((text) => {
      setCasinoFilter(text);
    }, debounce),
    []
  );
  useEffect(() => {
    setValue(keyWord);
  }, [keyWord]);

  return (
    <div className=" relative input w-full md:w-72 border-grey1 ">
      <input
        placeholder={t("search")}
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          debouncedSearch(e.target.value);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full rounded-lg text-sm border-grey1 text-grey1 bg-dark1 border  h-10 px-3 focus:border-blue1 focus:outline-none`}
      />
      <span className="absolute inset-y-0 right-0 pr-3 flex justify-center items-center">
        <Image src={search} alt="" height={12} width={12} />
      </span>
    </div>
  );
};
