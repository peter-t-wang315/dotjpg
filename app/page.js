"use client";
import MainSetDisplay from "@/components/MainSetDisplay";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [legoSets, setLegoSets] = useState([]);
  const [initialSets, setInitialSets] = useState([]);
  const { push } = useRouter();

  const submitLegoSetSearch = async (searchQuery) => {
    const currentURL = window.location.origin;
    if (searchQuery) {
      try {
        const response = await fetch(
          `${currentURL}/api/legosets/search?name=${encodeURIComponent(
            searchQuery
          )}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setLegoSets(data);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setLegoSets(initialSets);
    }
  };

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
          setLegoSets(data);
          setInitialSets(data);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getPopularSets();
  }, []); // a loading modal while the promise hasn't been fulfilled would be a nice touch

  //Add check to see if valid user

  //If not valid user, redirect to login page

  //Else display menu

  return (
    <>
      <div className="flex flex-col items-center justify-center pb-7 w-full gap-3">
        <h2>Search for a Lego set</h2>
        <input
          className="input-primary w-1/3"
          name="query"
          placeholder="Enter LEGO set name..."
          // value={searchQuery}
          onChange={async (e) => {
            await submitLegoSetSearch(e.target.value);
          }}
        />
      </div>
      <div className="grid grid-cols-3 w-full gap-5">
        {legoSets === initialSets && (
          <h3 className="flex col-span-3 justify-center -mb-4">
            Check out the most popular Lego sets
          </h3>
        )}
        {legoSets?.map((set, index) => (
          <MainSetDisplay
            id={set.id}
            key={index}
            image={set.image}
            title={set.name}
            brick_count={set.numParts}
            year={set.year}
            rating={Math.round(set.averageReviewStars)}
            push={push}
          />
        ))}
      </div>
    </>
  );
}
