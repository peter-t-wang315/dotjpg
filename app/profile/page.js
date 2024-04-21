"use client";
import ProfileReviewCard from "@/components/ProfileReviewCard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { dateToString } from "@/util/util";
import "react-toastify/dist/ReactToastify.css";

const profilePic = "/images/profilePic.png";

export default function Index() {
  const { push } = useRouter();
  const [user, setUser] = useState("");
  const [bio, setBio] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [session, setSession] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchState = async () => {
      const currentURL = window.location.origin;
      try {
        const response = await fetch(
          `${currentURL}/api/users/reviews?userID=${encodeURIComponent(
            parseInt(session?.id)
          )}`, // TODO: use session?
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
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

    const session_id = sessionStorage.getItem("id");
    console.log("session", session_id);
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
          if (session?.isAdmin === false) {
            window.location.href = "/";
          }
        }
        setIsLoading(false); // Update loading state
      };

      getSessionData(session_id);
      fetchState();
    }
  }, []); // a loading modal while the promise hasn't been fulfilled would be a nice touch

  useEffect(() => {
    console.log(session); // Log session whenever it changes

    // Check if session is empty and redirect to login if so
    if (!isLoading && (!session || Object.keys(session).length === 0)) {
      //window.location.href = "/login"; // Redirect to login page
    }
  }, [isLoading, session]);

  const goToReview = (legoSetID) => {
    push(`/review/${legoSetID}`);
  };

  return (
    <div className="flex w-full gap-10">
      <div className="flex flex-col w-1/6 items-center">
        <Image src={profilePic} width={200} height={200} alt={`Image`} />
        <h1 className="text-center">{user}</h1>
        <h3>{reviews?.length ?? 0} Reviews</h3>
        {isAdmin && (
          <p className="border border-black px-3 rounded-full bg-background-darker mt-1">
            Administrator
          </p>
        )}
        <button
          className="btn-primary mt-5"
          onClick={() => {
            push("/editProfile");
          }}
        >
          Edit Profile
        </button>
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
