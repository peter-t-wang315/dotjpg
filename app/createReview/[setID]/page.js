"use client";
import RatingStars from "@/components/RatingStars";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Index({ params }) {
  const legoSetID = Number(params.setID);
  const [setName, setSetName] = useState("");
  const [setImage, setSetImage] = useState("");
  const [pieceCount, setPieceCount] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(3);
  const [review, setReview] = useState("");
  const [session, setSession] = useState({});
  const [userID, setUserID] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const { push } = useRouter();

  useEffect(() => {
    const getSetData = async () => {
      const currentURL = window.location.origin;
      try {
        const response = await fetch(
          `${currentURL}/api/legosets?id=${encodeURIComponent(legoSetID)}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setSetName(data.name);
          setPieceCount(data.numParts);
          setYear(data.year);
          setSetImage(`data:image/jpeg;base64,${data.image}`);
        } else {
          toast.error(`Failed to fetch data: ${response.statusText}`);
        }
      } catch (error) {
        toast.error(`Error fetching data: ${error}`);
      }
    };

    getSetData();
    const session_id = sessionStorage.getItem("id");
    if (!session_id) {
      window.location.href = "/login";
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
          console.log(data);
          setUserID(data.id);
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
  const updateUserStars = (add) => {
    if (add && userRating < 5) {
      setUserRating(userRating + 1);
    } else if (!add && userRating > 0) {
      setUserRating(userRating - 1);
    }
  };

  const handleSubmit = async () => {
    const currentURL = window.location.origin;
    try {
      const response = await fetch(`${currentURL}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          review: review,
          stars: userRating,
          userID: userID,
          legosetID: legoSetID,
        }),
      });
      if (response.ok) {
        toast.success("Successfully uploaded review");
        push(`/review/${legoSetID}`);
      } else {
        toast.error(`${response.statusText}`);
      }
    } catch (error) {
      toast.error(`Error uploading review: ${error}`);
    }
  };

  return (
    <div className="flex gap-10">
      <div
        className=" card-clickable w-1/4 p-5 items-center"
        onClick={() => {
          push(`/review/${legoSetID}`);
        }}
      >
        <h2>{setName}</h2>
        <Image src={setImage} width={375} height={375} alt={`Image`} />
        <div className="flex justify-between w-full mt-7">
          <p>Piece Count: {pieceCount}</p>
          <p>Year: {year}</p>
          <RatingStars numStars={rating} />
        </div>
      </div>
      <div className="flex flex-col w-3/4 font-medium">
        <h4>What would you rate this set out of 5 stars?</h4>
        <div className="flex gap-2">
          <button
            className="border border-black rounded-full px-2"
            onClick={() => updateUserStars(false)}
          >
            -
          </button>
          <RatingStars numStars={userRating} />
          <button
            className="border border-black rounded-full px-1.5"
            onClick={() => updateUserStars(true)}
          >
            +
          </button>
        </div>
        <h4 className="mt-5">Please write your review here:</h4>
        <textarea
          className="textarea-primary h-full"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />
        <button className="btn-primary self-end mt-2" onClick={handleSubmit}>
          Submit
        </button>
        <ToastContainer />
      </div>
      <ToastContainer />
    </div>
  );
}
