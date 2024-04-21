"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("Atempting Login");
      console.log(JSON.stringify({ email, password }));

      // Call your authentication endpoint to validate credentials
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const cookieHeader = await response.headers.get("Set-Cookie");
        document.cookie = cookieHeader;
        const data = await response.json();

        //setSession({ id: data.id, eamil: data.email });
        // Set up session upon successful authentication
        sessionStorage.setItem("id", data.id);

        window.location.href = "/";
        //window.location.href = `/?id=${encodeURIComponent(data.id)}`; // Redirect to dashboard upon successful login
        console.log("End of Login");
      } else {
        throw new Error("Invalid Credentials");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pb-7 w-full gap-3">
      <h2 className="mb-4">Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label className="textBoxText" htmlFor="email">
            Email:
          </label>
          <br />
          <input
            className="input-primary"
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-4">
          <label className="textBoxText" htmlFor="password">
            Password:
          </label>
          <br />
          <input
            className="input-primary"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-4">
          <input className="btn-primary mr-2" type="submit" value="Login" />
          <a href="/signup">Sign Up</a>
        </div>
      </form>
    </div>
  );
}
