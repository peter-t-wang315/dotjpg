"use client";
import MainSetDisplay from "@/components/MainSetDisplay";
import { useState } from "react";
import { useEffect } from "react";
import { applyMiddleware } from "./api/middleware";

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
  const [session, setSession] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const session_id = sessionStorage.getItem("id");
    if (!session_id) {
      window.location.href = "/login";
    }

    const getSessionData = async (session_id) => {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: parseInt(session_id) }),
      });
      const data = await response.json();
      setSession(data); // Update session state
      setIsLoading(false); // Update loading state
    };

    getSessionData(session_id);
  }, []);

  useEffect(() => {
    console.log(session); // Log session whenever it changes

    // Check if session is empty and redirect to login if so
    if (!isLoading && (!session || Object.keys(session).length === 0)) {
      window.location.href = "/login"; // Redirect to login page
    }
  }, [isLoading, session]);

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
          <MainSetDisplay key={index} image={set[1]} title={set[0]} />
        ))}
      </div>
    </>
  );
}
