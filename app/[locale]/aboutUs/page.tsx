import Breadcrumbs from "@/app/components/Breadcrumbs";
import React from "react";
const breadcrumbs = [{ name: "About us" }];

export default function AboutUs() {
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="text-grey1 mb-10">
        <h1 className=" text-4xl font-black text-white my-6">About Us</h1>
        <p className="mb-12">
          SlotStat is a data-driven platform and affiliate service provider that
          helps players to be more aware while gambling in regard solidified
          information of slot statistics.
        </p>
        <p className="mb-12">
          Through years the SlotStat team were collecting experience and
          expertise in gambling industry separately and finally teamed up to
          give a form to the SlotStat concept.
        </p>
        <p className="mb-12">
          The SlotStat team during the years were observing, learning and
          analyzing slot game statistics, doing research and developing its own
          algorithms.
        </p>
        <p className="mb-12">
          Based on our knowledge, connections and aim at this very moment we’re
          launching SlotStat, the following pace of playing development and a
          book of tools to take with, into the risky journey of gambling.
        </p>
      </div>
    </>
  );
}
