"use client";
import { useState } from "react";

const defaultSets = [
  ["Trafalgar Square", "images/lego-set1.png"],
  ["City Block", "images/lego-set2.png"],
  ["Heavy Cargo Transport", "images/lego-set3.png"],
  ["Bengal Tiger", "images/lego-set4.png"],
  ["Police Station", "images/lego-set5.png"],
  ["Jungle Raider", "images/lego-set6.png"],
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
      <div className="grid grid-cols-3">
        <h3>Check out our most frequently visited Lego sets</h3>
        <div className="set-grid">
          <div className="set-card">
            <img className="set-img" src="images/lego-set1.png" />
            <p className="set-caption">Trafalgar Square</p>
          </div>
          <div className="set-card">
            <img className="set-img" src="images/lego-set2.jpg" />
            <p className="set-caption">City Block</p>
          </div>
          <div className="set-card">
            <img className="set-img" src="images/lego-set3.jpg" />
            <p className="set-caption">Heavy Cargo Transport</p>
          </div>
          <div className="set-card">
            <img className="set-img" src="images/lego-set4.jpg" />
            <p className="set-caption">Bengal Tiger</p>
          </div>
          <div className="set-card">
            <img className="set-img" src="images/lego-set5.jpg" />
            <p className="set-caption">Police Station</p>
          </div>
          <div className="set-card">
            <img className="set-img" src="images/lego-set6.jpg" />
            <p className="set-caption">Jungle Raider</p>
          </div>
        </div>
      </div>
    </>
  );
}
