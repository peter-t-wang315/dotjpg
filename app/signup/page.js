"use client";
import { useState } from "react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (confirmPassword === password) {
      try {
        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password, bio }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Invalid Credentials");
        }

        console.log("Signup successful!");
        // Redirect or show success message
      } catch (error) {
        setError(error.message);
      }
    } else {
      console.log("Passwords don't match");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pb-7 w-full gap-3">
      <h2 className="mb-4">Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label className="textBoxText" htmlFor="name">
            Enter Name:
          </label>
          <br />
          <input
            className="input-primary"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-4">
          <label className="textBoxText" htmlFor="username">
            Enter Username:
          </label>
          <br />
          <input
            className="input-primary"
            type="text"
            id="username"
            name="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-4">
          <label className="textBoxText" htmlFor="password">
            Enter Password:
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
          <div className="form-group mb-4">
            <label className="textBoxText" htmlFor="confirmPassword">
              Re-Enter Password:
            </label>
            <br />
            <input
              className="input-primary"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label className="textBoxText" htmlFor="bio">
              Bio:
            </label>
            <br />
            <input
              className="input-primary"
              type="text"
              id="bio"
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group mb-4">
          <input className="btn-primary mr-2" type="submit" value="Sign Up" />
          <a href="signupPage.html">Already Have an Account?</a>
        </div>
      </form>
    </div>
  );
}
