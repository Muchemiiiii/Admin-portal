import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigator = useNavigate();
  const validateCredentials = (email, password) => {
    return email === "test@example.com" && password === "password123";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateCredentials(email, password);
    setMessage(isValid ? "Approved: Login successful!" : "Error: Invalid credentials.");
    navigator("/dashboard")
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-blue-500">
      <div className="p-10 bg-white rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">EASY STAY</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-blue-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>
        {message && (
          <div
            className={`mt-4 p-2 text-center rounded ${
              message.startsWith("Approved")
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
