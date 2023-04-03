"use client";
import { casino, eyes, globe, joystick, live } from "../assets";
import { Slider, Stats, Table } from "../components";
import { CASINO_COLS } from "../components/table/columns";
import { CASINO_DATA, SLIDES } from "../utils/mockData";

const STATS: TStatCardProps[] = [
  {
    type: "link",
    icon: eyes,
    label: "Number of countries",
    value: <span className="text-blue1">27</span>,
    badge: null,
    tooltip: "s ahsd basf sdbghab yfebrgf",
  },
  {
    type: "link",
    icon: globe,
    label: "Number of casinos",
    value: <span className="text-blue1">105</span>,
    badge: null,
    tooltip: "",
  },
  {
    type: "link",
    icon: casino,
    label: "Number of games",
    value: <span className="text-blue1">13k</span>,
    badge: live,
    tooltip: "s ahsd basf sdbghab yfebrgf",
  },
  {
    type: "link",
    icon: joystick,
    label: "Users",
    value: <span className="text-blue1">15M</span>,
    badge: live,
    tooltip: "s ahsd basf sdbghab yfebrgf",
  },
];

const Home = () => {
  return (
    <>
      <Stats data={STATS} rows={1} />
      <Slider data={SLIDES} />
      <div className="my-6 px-4 lg:my-18 lg:px-18">
        <Table
          linkPath="/adjarabet"
          columns={CASINO_COLS}
          mockData={CASINO_DATA}
          showFilter={false}
          onRowPress={() => null}
        />
      </div>
    </>
  );
};

export default Home;
