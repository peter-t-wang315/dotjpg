"use client";
import Image from "next/image";
import SetReviewBlock from "@/components/SetReviewBlock";
import RatingStars from "@/components/RatingStars";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Index({ params }) {
  const legoSetID = Number(params.setID);
  const [setName, setSetName] = useState("");
  const [setImage, setSetImage] = useState("");
  const [pieceCount, setPieceCount] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);
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
          setSetImage(`data:image/jpeg;base64,${data?.image}`);
        } else {
          toast.error(`Failed to fetch data: ${response.statusText}`, {
            position: bottom - left,
          });
        }
      } catch (error) {
        toast.error(`Error fetching data: ${error}`, {
          position: bottom - left,
        });
      }
    };

    const getSetReviews = async () => {
      const currentURL = window.location.origin;
      try {
        const response = await fetch(
          `${currentURL}/api/reviews?id=${encodeURIComponent(legoSetID)}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        } else {
          toast.error(`Failed to fetch data: ${response.statusText}`, {
            position: bottom - left,
          });
        }
      } catch (error) {
        toast.error(`Error fetching data: ${error}`, {
          position: bottom - left,
        });
      }
    };

    getSetData();
    getSetReviews();
  }, []);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-col items-center border border-black rounded-lg p-4 mb-2">
        <h1>{setName}</h1>
        <Image src={setImage} width={375} height={375} alt={`Image`} />
        <div className="flex justify-between w-full mt-6">
          <div className="flex flex-col gap-5 w-full">
            <p>Piece Count: {pieceCount}</p>
            <p>Year: {year}</p>
          </div>
          <div className="flex justify-between w-full mt-6">
            <RatingStars numStars={rating} />
            <button
              className="btn-primary self-end"
              onClick={() => {
                push(`/createReview/${legoSetID}`);
              }}
            >
              Review Set
            </button>
          </div>
        </div>
      </div>
      {reviews?.length ?? 0 > 0 ? (
        reviews.map((review, index) => (
          <SetReviewBlock
            username={review.reviewer}
            numReviews={review.numReviews}
            rating={review.stars}
            review={review.review}
          />
        ))
      ) : (
        <p>No Reviews for this set</p>
      )}
      <ToastContainer />
    </div>
  );
}
