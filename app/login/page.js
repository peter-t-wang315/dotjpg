"use client";
import { useState } from "react";
import axios from "axios";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/login", { email, password }); // Use the correct relative path for the API endpoint
      console.log(response.data); // Log the response
      // Optionally, you can redirect the user to another page upon successful login
    } catch (error) {
      setError(error.response.data.message); // Set error message if login fails
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pb-7 w-full gap-3">
      <h2 className="mb-4">Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label className="textBoxText" htmlFor="username">
            Username:
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
          <a href="signupPage.html">Sign Up</a>
        </div>
      </form>
    </div>
  );
}
