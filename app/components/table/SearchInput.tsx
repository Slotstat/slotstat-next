"use client";
import { useState, useEffect } from "react";

import { Input } from "@material-tailwind/react";

import { search } from "../../assets";
import Image from "next/image";

const debounce = 500;

export const SearchInput = ({
  globalFilter,
  setGlobalFilter,
}: {
  globalFilter: any;
  setGlobalFilter: any;
}) => {
  const [value, setValue] = useState(globalFilter);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setGlobalFilter(value || undefined);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [setGlobalFilter, value]);

  return (
    <div className="input w-full md:w-72">
      <Input
        variant="outlined"
        label="Search"
        icon={<Image src={search} alt="" />}
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className="w-full rounded-lg text-grey1"
      />
    </div>
  );
};
