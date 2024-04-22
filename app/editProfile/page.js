"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const profilePic = "/images/profilePic.png";

export default function Index() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const { push } = useRouter();
  const [session, setSession] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
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

  const handleSubmit = async () => {
    const currentURL = window.location.origin;
    try {
      const response = await fetch(`${currentURL}/api/users/bio`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          bio: bio,
        }),
      });
      if (response.ok) {
        toast.success("Successfully updated account");
        push("/profile");
      } else {
        toast.error(`Error uploading data`);
        console.log("We broke");
      }
    } catch (error) {
      console.log("ERror");
      toast.error(`Error fetching data:${error}`);
    }
  };

  return (
    <div className="flex w-full gap-10">
      <div className="flex flex-col w-1/5 items-center gap-5">
        <Image src={profilePic} width={300} height={300} alt={`Image`} />
        <button className="btn-primary">Edit Profile Picture</button>
      </div>
      <div className="flex flex-col w-4/5 gap-7 w-full">
        <div>
          <h2>Name:</h2>
          <input
            className="input-primary w-4/6"
            name="name"
            onChange={async (e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <h2>Bio:</h2>
          <textarea
            className="textarea-primary min-h-48 w-4/6"
            onChange={(e) => {
              setBio(e.target.value);
            }}
          />
        </div>
        <button className="btn-primary self-start">Update Profile</button>
      </div>
      <ToastContainer />
    </div>
  );
}
