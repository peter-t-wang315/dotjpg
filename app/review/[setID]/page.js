"use client";
import Image from "next/image";
import SetReviewBlock from "@/components/SetReviewBlock";
import RatingStars from "@/components/RatingStars";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { dateToString } from "@/util/util";

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
          setRating(data.averageReviewStars);
          setSetImage(`data:image/jpeg;base64,${data?.image}`);
        } else {
          toast.error(`Failed to fetch data: ${response.statusText}`);
        }
      } catch (error) {
        toast.error(`Error fetching data: ${error}`);
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
          toast.error(`Failed to fetch data: ${response.statusText}`);
        }
      } catch (error) {
        toast.error(`Error fetching data: ${error}`);
      }
    };

    getSetData();
    getSetReviews();
  }, []);

  const deleteReview = async (userID, username) => {
    const currentURL = window.location.origin;
    const params = new URLSearchParams();
    params.append("userID", encodeURIComponent(userID));
    params.append("legoSetID", encodeURIComponent(legoSetID));
    try {
      const response = await fetch(`${currentURL}/api/reviews?${params}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();

        // Set the new reviews after one has been deleted
        const updatedReviews = reviews.filter(
          (review) => review.userID !== data.deletedReview.userID
        );
        setReviews(updatedReviews);

        // Set the new average star rating
        const averageStars =
          updatedReviews.length > 0
            ? updatedReviews.reduce((acc, review) => acc + review.stars, 0) /
              updatedReviews.length
            : 0;
        setRating(averageStars);

        toast.success(`Successfully deleted ${username}'s review`);
      } else {
        toast.error(`Failed to delete ${username}'s review`);
      }
    } catch (error) {
      toast.error(`Error deleting review: ${error}`);
    }
  };

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
          <div className="flex flex-col gap-5 w-full items-end">
            <RatingStars numStars={rating} />
            <button
              className="btn-primary"
              onClick={() => {
                push(`/createReview/${legoSetID}`);
              }}
            >
              Review Set
            </button>
          </div>
        </div>
      </div>
      {reviews?.length > 0 ? (
        reviews.map((review, index) => (
          <SetReviewBlock
            key={index}
            username={review.reviewer}
            userID={review.userID}
            rating={review.stars}
            review={review.review}
            createdAt={dateToString(review.createdAt)}
            isAdmin={isAdmin}
            deleteReview={deleteReview}
          />
        ))
      ) : (
        <p>No Reviews for this set</p>
      )}

      <ToastContainer />
    </div>
  );
}
