"use client";
import Link from "next/link";
import RatingStars from "./RatingStars";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SetReviewBlock({
  username,
  userID,
  legoSetID,
  reviewCount,
  rating,
  review,
  createdAt,
  isAdmin,
}) {
  const deleteReview = async () => {
    const currentURL = window.location.origin;
    const params = new URLSearchParams();
    params.append("userID", encodeURIComponent(userID));
    params.append("legoSetID", encodeURIComponent(legoSetID));
    console.log(`${currentURL}/api/reviews?${params}`);
    try {
      const response = await fetch(`${currentURL}/api/reviews?${params}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        toast.success(`Successfully deleted ${username}'s review`);
      } else {
        toast.error(`Failed to delete ${username}'s review`);
      }
    } catch (error) {
      toast.error(`Error deleting review: ${error}`);
    }
  };

  return (
    <div className="card-primary flex-row w-full p-0">
      <div className="flex flex-col bg-background-darker w-1/6 pt-2 pb-3 px-3 rounded-l-md gap-2">
        {isAdmin ? (
          <Link href={`/profile/${username}`}>
            <h4 className="font-semibold underline">{username}</h4>
          </Link>
        ) : (
          <h4 className="font-semibold">{username}</h4>
        )}
        <p>{reviewCount} Reviews</p>
        <p>{createdAt}</p>
        <RatingStars numStars={rating} />
        {isAdmin && (
          <button className="btn-primary self-start" onClick={deleteReview}>
            Delete
          </button>
        )}
      </div>
      <div className="flex w-5/6 p-2">{review}</div>
    </div>
  );
}
