"use client";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import MoreIcon from "../assets/svg/MoreIcon";

export default function Example({
  listItems,
  children,
  className,
}: {
  listItems: React.JSX.Element[];
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="">
      <Menu as="div" className="relative  ">
        <div>
          <Menu.Button className=" " onClick={(e) => e.stopPropagation()}>
            {children}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`absolute w-40 z-10 rounded-md bg-dark2 shadow-sm ring-1 ring-dark3 p-1 ${className}`}
          >
            {listItems.map((listItem, index) => {
              return <Menu.Item key={index}>{listItem}</Menu.Item>;
            })}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
