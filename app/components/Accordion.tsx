"use client";

import {
  Accordion as RAccordion,
  AccordionItem as RItem,
} from "@szhsin/react-accordion";

type TAccordionItem = {
  header: string;
  content: any;
};

type TAccordionData = {
  data: TAccordionItem[];
};

const Icon = ({ active = false }) => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="14" cy="14" r="13" stroke="white" strokeWidth="2" />
      <path
        d="M8.65686 14H19.2635"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {!active && (
        <path
          d="M13.9601 19.3037L13.9601 8.69711"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
};

const AccordionItem = ({
  header,
  ...rest
}: {
  children: string;
  header: string;
  initialEntered: boolean;
}) => (
  <RItem
    {...rest}
    header={({ state: { isEnter } }) => (
      <div className="mb-4 flex flex-1 items-center justify-between font-bold text-base text-white lg:text-2xl">
        {header}
        <div
          className={`ml-auto transition-transform duration-200 ease-in-out ${
            isEnter && "rotate-180"
          }`}
        >
          <Icon active={isEnter} />
        </div>
      </div>
    )}
    buttonProps={{
      className: ({ isEnter }) => `flex w-full text-left `,
    }}
    contentProps={{
      className:
        "transition-height duration-200 ease-in-out text-sm text-[18px] font-normal leading-normal text-grey1",
    }}
    panelProps={{ className: "text-[18px] text-grey1 leading-6" }}
  />
);

const Accordion = ({ data = [] }: TAccordionData) => {
  return (
    <RAccordion transition transitionTimeout={200} className="space-y-8">
      {data.map((item, index) => {
        return (
          <AccordionItem
            key={index}
            header={item.header}
            initialEntered={index === 0}
          >
            {item.content}
          </AccordionItem>
        );
      })}
    </RAccordion>
  );
};

export default Accordion;
