import { Option, Select } from "@material-tailwind/react";
import { useCallback, useState } from "react";
import { SORT_BY } from "./columns";

const Dropdown = ({
  label,
  onChange,
  orderBy,
}: {
  label: string;
  onChange: (v?: string) => void;
  orderBy?: string;
}) => {
  // helper is needed for correct updating query parameters
  const [helper, setHelper] = useState(false);

  const debouncedSearch = useCallback((v: any) => {
    setHelper(!helper);
    onChange(v);
  }, []);

  const getInitialValue = () => {
    const index = SORT_BY.findIndex((x) => x.value === orderBy);
    const value = SORT_BY[index]?.value;
    if (value) {
      return value;
    } else {
      return "";
    }
  };
  return (
    <div className="dropdrown w-full md:w-72 ">
      <Select
        value={getInitialValue()}
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
        label={label}
        onChange={debouncedSearch}
        className="w-full rounded-lg text-white "
      >
        {SORT_BY.map((item) => (
          <Option key={item.id} value={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default Dropdown;
