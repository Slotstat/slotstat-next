"use client";
import { Option, Select } from "@material-tailwind/react";

const Dropdown = ({
  label,
  onChange,
}: {
  label: string;
  onChange: (v?: string) => void;
}) => {
  return (
    <div className="dropdrown w-full md:w-72">
      <Select
        label={label}
        onChange={onChange}
        className="w-full rounded-lg text-grey1"
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
