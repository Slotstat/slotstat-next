import { Fragment, useEffect, useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import ArrowUp from "@/app/assets/svg/ArrowUp";
import { useTranslations } from "next-intl";
import FloatingButtons from "../FloatingButtons";

const Dropdown = ({
  onChange,
  orderBy,
}: {
  onChange: (v?: string) => void;
  orderBy?: string | null;
}) => {
  const t = useTranslations("sortBy");

  const SORT_BY: FloatingButtonsItems = [
    { label: t("AllSlots"), id: "0", value: "", width: "w-28" },
    { label: t("slotInWin"), id: "1", value: "spsH", width: "w-40" },
    { label: t("slotsInLose"), id: "2", value: "spsL", width: "w-40" },
    { label: t("highestRTP"), id: "3", value: "fixedRtp", width: "w-40" },
    // { label: t("slotInWin"), id: "4", value: "slotInWin" },
    // { label: t("slotsInLose"), id: "5", value: "slotInLose" },
    // { label: t("slotInWinR"), id: "2", value: "slotInWinR" },
    // { label: t("slotsInLoseR"), id: "3", value: "slotInLoseR" },
    // old
    // { label: t("t1hLong"), id: "8", value: "p1h" },
    // { label: t("t24hLong"), id: "9", value: "p24h" },
    // { label: t("RTP"), id: "10", value: "fixedRtp" },
    // very old
    // { label: t("p24h"), id: "1", value: "p24h" },
    // { label: t("p1h"), id: "2", value: "p1h" },
    // { label: t("p1m"), id: "4", value: "p1m" },
    // { label: t("p1y"), id: "5", value: "p1y" },
    // { label: t("all"), id: "6", value: "all" },
    // { label: t("jackpot"), id: "7", value: "jackpot" },
  ];

  const [selected, setSelected] = useState(SORT_BY[0]);

  const select = (v: any) => {
    setSelected(v);
    onChange(v.value);
  };

  useEffect(() => {
    const index = SORT_BY.findIndex((x) => x.value === orderBy);
    if (index === -1) {
      setSelected(SORT_BY[0]);
    } else {
      setSelected(SORT_BY[index]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderBy]);

  return (
    <div className="z-1">
      <div className="hidden md:block  z-1 h-10 w-full md:w-64">
        <Listbox value={selected} onChange={select}>
          {({ open }) => (
            <div className="relative">
              <ListboxButton
                className={`relative border cursor-pointer ${
                  open ? "border-blue1" : "border-grey1"
                } w-full h-10 cursor-default rounded-lg bg-dark1 py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:ring-2  focus-visible:ring-opacity-75 focus-visible:ring-offset-2 text-xs lg:text-sm`}
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
              </ListboxButton>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-dark2 py-1 shadow-lg ring-1 ring-dark3 ring-opacity-5 focus:outline-none text-sm">
                  {SORT_BY.map((item, i) => (
                    <ListboxOption
                      key={i}
                      className={({ active, selected }) =>
                        `relative cursor-pointer select-none mx-1 py-2  px-2 rounded-md ${
                          active ? "bg-dark1 text-blue2" : "text-white"
                        } `
                      }
                      value={item}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            title={item.label}
                            className="block truncate text-xs md:text-base font-normal"
                          >
                            {item.label}
                          </span>
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
          )}
        </Listbox>
      </div>
      <FloatingButtons select={select} selected={selected} items={SORT_BY} />
    </div>
  );
};

export default Dropdown;
