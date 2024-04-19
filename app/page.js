"use client";
import MainSetDisplay from "@/components/MainSetDisplay";
import { useEffect, useState } from "react";

export default function Home() {
  const [legoSets, setLegoSets] = useState([]);

  useEffect(() => {
    const getPopularSets = async () => {
      const currentURL = window.location.origin;
      try {
        const response = await fetch(`${currentURL}/api/legosets/popular`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Data", data);
          setLegoSets(data);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getPopularSets();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center pb-7 w-full gap-3">
        <h2>Search for a Lego set</h2>
        <input
          className="input-primary w-1/3"
          name="query"
          placeholder="Enter LEGO set name..."
        />
        <button className="btn-primary">Submit</button>
      </div>
      <h3>Check out our most frequently visited Lego sets</h3>
      <div className="grid grid-cols-3 w-full gap-5">
        {legoSets?.map((set, index) => (
          <MainSetDisplay key={index} image={set.image} title={set.name} brick_count={set.brick_count} year={set.year} />
        ))}
      </div>
    </>
  );
}
