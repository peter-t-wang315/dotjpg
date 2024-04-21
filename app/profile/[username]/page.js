"use client";
import ProfileReviewCard from "@/components/ProfileReviewCard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { dateToString } from "@/util/util";
import "react-toastify/dist/ReactToastify.css";

const profilePic = "/images/profilePic.png";

// TODO: Don't allow non-admins in here

export default function Index({ params }) {
  const userName = params.username;
  const { push } = useRouter();
  const [user, setUser] = useState("");
  const [bio, setBio] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    let userData;
    const fetchState = async () => {
      const currentURL = window.location.origin;
      // Get User ID first from username
      try {
        const response = await fetch(
          `${currentURL}/api/users/?name=${userName}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          userData = data.user;
        } else {
          toast.error(`Failed to fetch data: ${response.statusText}`);
        }
      } catch (error) {
        toast.error(`Error fetching data: ${error}`);
      }

      try {
        const response = await fetch(
          `${currentURL}/api/users/reviews?userID=${encodeURIComponent(
            userData.id
          )}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setBio(data.bio);
          setIsAdmin(data.isAdmin);
          setReviews(data.reviews);
        } else {
          toast.error(`Failed to fetch data: ${response.statusText}`);
        }
      } catch (error) {
        toast.error(`Error fetching data: ${error}`);
      }
    };
    fetchState();
  }, []);

  const deleteUser = async () => {
    const currentURL = window.location.origin;
    const params = new URLSearchParams();
    params.append("id", encodeURIComponent(user.id));
    const username = user.name;
    try {
      const response = await fetch(`${currentURL}/api/users?${params}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();

        toast.success(`Successfully deleted ${username}`);
      } else {
        toast.error(`Failed to delete ${username}'s review`);
      }
    } catch (error) {
      toast.error(`Error deleting review: ${error}`);
    }
  };

  const goToReview = (legoSetID) => {
    push(`/review/${legoSetID}`);
  };

  return (
    <div className="flex w-full gap-10">
      <div className="flex flex-col w-1/6 items-center">
        <Image src={profilePic} width={200} height={200} alt={`Image`} />
        <h1>{user.name}</h1>
        <h3>{reviews?.length ?? 0} Reviews</h3>
        {isAdmin ? (
          <p className="border border-black px-3 rounded-full bg-background-darker mt-1">
            Administrator
          </p>
        ) : (
          <button className="btn-primary mt-5" onClick={deleteUser}>
            Delete User
          </button>
        )}
      </div>
      <div className="flex flex-col w-5/6">
        <h2>Bio</h2>
        <p>{bio}</p>

        <h2 className="mt-10">Most Recent Reviews</h2>
        <div className="grid grid-cols-3 gap-5">
          {reviews?.map((review, index) => (
            <ProfileReviewCard
              setID={review.legosetID}
              rating={review.stars}
              timeCreated={dateToString(review.createdAt)}
              goToReview={goToReview}
            />
          ))}
          <ToastContainer />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
