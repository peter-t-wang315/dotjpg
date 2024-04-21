"use client";
import { useEffect, useState } from "react";
import { isReturnStatement } from "typescript";

export default function LogoutPage() {
  useEffect(() => {
    const handleSubmit = async () => {
      try {
        console.log("Atempting Logout");

        sessionStorage.setItem("id", "");

        window.location.href = "/login";
        console.log("End of Logout");
      } catch (error) {
        setError(error.message);
      }
    };
    handleSubmit();
  }, []);

  return null;
}
