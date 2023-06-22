import { Fragment, useEffect, useState } from "react";
import { SORT_BY } from "./columns";
import { Listbox, Transition } from "@headlessui/react";
import ArrowUp from "@/app/assets/svg/ArrowUp";

const Dropdown = ({
  label,
  onChange,
  orderBy,
}: {
  label: string;
  onChange: (v?: string) => void;
  orderBy?: string;
}) => {
  const [selected, setSelected] = useState(SORT_BY[0]);

  const search = (v: any) => {
    setSelected(v);
    onChange(v.value);
  };

  useEffect(() => {
    const index = SORT_BY.findIndex((x) => x.value === orderBy);
    setSelected(SORT_BY[index]);
  }, [orderBy]);

  return (
    <div className="z-10  h-10 w-full md:w-72 ">
      <Listbox value={selected} onChange={search}>
        {({ open }) => (
          <div className="relative">
            <Listbox.Button
              className={`relative border ${
                open ? "border-blue1" : "border-grey1"
              } w-full h-10 cursor-default rounded-lg bg-dark1 py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:ring-2  focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm`}
            >
              <span className="block truncate text-white">
                <span className="text-grey1">Sort by: </span> {selected.label}
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
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-dark2 py-1 text-base shadow-lg ring-1 ring-dark3 ring-opacity-5 focus:outline-none sm:text-sm">
                {SORT_BY.map((item, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active, selected }) =>
                      `relative cursor-default select-none  py-2  px-2 rounded-md ${
                        active ? "bg-dark1 text-blue2" : "text-white"
                      } ${selected ? "bg-dark1" : "bg-dark2"}`
                    }
                    value={item}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
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
    </div>
  );
};

export default Dropdown;
