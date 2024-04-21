"use client";
import MainSetDisplay from "@/components/MainSetDisplay";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [legoSets, setLegoSets] = useState([]);
  const [initialSets, setInitialSets] = useState([]);
  const [session, setSession] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const { push } = useRouter();

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

    const session_id = sessionStorage.getItem("id");
    if (!session_id) {
      //window.location.href = "/login";
    } else {
      const getSessionData = async (session_id) => {
        const response = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: parseInt(session_id) }),
        });
        if (response.ok) {
          const data = await response.json();
          setSession(data); // Update session state
        }
        setIsLoading(false); // Update loading state
      };

      getSessionData(session_id);
    }
  }, []); // a loading modal while the promise hasn't been fulfilled would be a nice touch

  useEffect(() => {
    console.log(session); // Log session whenever it changes

    // Check if session is empty and redirect to login if so
    if (!isLoading && (!session || Object.keys(session).length === 0)) {
      //window.location.href = "/login"; // Redirect to login page
    }
  }, [isLoading, session]);

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
