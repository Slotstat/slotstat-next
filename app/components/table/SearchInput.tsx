"use client";
import { useState, useCallback } from "react";

import { Input } from "@material-tailwind/react";

import { search } from "../../assets";
import Image from "next/image";
import _ from "lodash";

const debounce = 500;

export const SearchInput = ({
  setCasinoFilter,
  keyWord,
}: {
  setCasinoFilter: (text: string) => void;
  keyWord: string;
}) => {
  const [value, setValue] = useState(keyWord);

  const debouncedSearch = useCallback(
    _.debounce((text) => {
      setCasinoFilter(text);
    }, debounce),
    []
  );

  return (
    <div className="input w-full md:w-72 border-grey1">
      <Input
        variant="outlined"
        label="Search"
        icon={<Image src={search} alt="" />}
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          debouncedSearch(e.target.value);
        }}
        className="w-full rounded-lg text-grey1"
      />
    </div>
  );
};
