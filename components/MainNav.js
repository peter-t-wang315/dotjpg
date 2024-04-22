"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MainNav() {
  const { push } = useRouter();
  const [session, setSession] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const session_id = sessionStorage.getItem("id");
    if (session_id) {
      setSession(true);
    }
}, []);

  useEffect(() => {
    console.log(session); // Log session whenever it changes

    // Check if session is empty and redirect to login if so
    if (!isLoading && (!session || Object.keys(session).length === 0)) {
      //window.location.href = "/login"; // Redirect to login page
    }
  }, [isLoading, session]);

  return (
    <div className="flex bg-neutral-500 justify-between px-5 py-2 border-b-2 border-black">
      <div
        className="flex items-center gap-3 hover:cursor-pointer"
        onClick={() => {
          push("/");
        }}
      >
        <h1>BRICKS FOR US</h1>
        <Image src="/images/brick-icon.png" width={65} height={65} />
      </div>
      <div className="flex items-center gap-3">
        <button
          className="btn-primary"
          type="submit"
          onClick={() => {
            push("/logout");
          }}
        >
          {session ? "Log Out" : "Login"}
        </button>
        {session ? (
          <Image
            className="hover:cursor-pointer"
            src="/images/profilePic.png"
            width={60}
            height={60}
            onClick={() => {
              push("/profile");
            }}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
