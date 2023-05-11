import { Option, Select } from "@material-tailwind/react";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";

const Dropdown = ({
  label,
  onChange,
}: {
  label: string;
  onChange: (v?: string) => void;
}) => {
  // helper is needed for correct updating query parameters
  const [helper, setHelper] = useState(false);

  const debouncedSearch = useCallback(
    (v: any) => {
      setHelper(!helper);
      onChange(v);
    },
    // _.debounce((v) => {
    //   console.log("object", v);
    //   setHelper(!helper);
    //   onChange(v);
    // }, 0),
    []
  );

  return (
    <div className="dropdrown w-full md:w-72 ">
      <Select
        label={label}
        onChange={debouncedSearch}
        className="w-full rounded-lg text-grey1 "
      >
        <Option value="">None</Option>
        <Option value="EGT">EGT</Option>
        <Option value="Amatic">Amatic</Option>
        <Option value="Netent">Netent</Option>
      </Select>
    </div>
  );
};

export default Dropdown;
