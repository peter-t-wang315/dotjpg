"use client";
import MainSetDisplay from "@/components/MainSetDisplay";
import { useState } from "react";

const defaultSets = [
  ["Trafalgar Square", "/images/lego-set1.jpg"],
  ["City Block", "/images/lego-set2.jpg"],
  ["Heavy Cargo Transport", "/images/lego-set3.jpg"],
  ["Bengal Tiger", "/images/lego-set4.jpg"],
  ["Police Station", "/images/lego-set5.jpg"],
  ["Jungle Raider", "/images/lego-set6.jpg"],
];

export default function Home() {
  const [legoSets, setLegoSets] = useState(defaultSets);

  return (
    <>
      <div className="flex flex-col items-center justify-center py-10 w-full gap-3">
        <h2>Search for a Lego set</h2>
        <input
          className="input-primary w-1/3"
          name="query"
          placeholder="Enter LEGO set name..."
        />
        <button className="btn-primary">Submit</button>
      </div>
      <div className="grid grid-cols-3 w-full gap-10">
        <h3 className="col-span-3">
          Check out our most frequently visited Lego sets
        </h3>
        {legoSets?.map((set, index) => (
          <MainSetDisplay key={index} image={set[1]} title={set[0]} />
        ))}
      </div>
    </>
  );
}
