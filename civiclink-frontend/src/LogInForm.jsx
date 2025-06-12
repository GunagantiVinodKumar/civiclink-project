import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from './AuthContext.jsx';

function LogInForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [aadharNumber, setAadharNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const formatAadhar = (value) => {
    const digits = value.replace(/\D/g, "");
    const parts = [];
    for (let i = 0; i < digits.length; i += 4) {
      parts.push(digits.substring(i, i + 4));
    }
    return parts.join("-");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aadharNumber, password }),
      });

      if (response.ok) {
        //login();
        const data = await response.json();
            console.log(data.message);
      }
       else {
        const data = await response.json();
        setErrorMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Something went wrong or Turn on the Backend");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-zinc-800">Login to Your Account</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700">Aadhar Number</label>
            <input
              type="text"
              value={aadharNumber}
              onChange={(e) => {
                const formatted = formatAadhar(e.target.value);
                setAadharNumber(formatted);
              }}
              maxLength={14}
              required
              className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition"
              placeholder="1234-5678-9012"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
              className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition"
              placeholder="Enter Password (min 6 chars)"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-zinc-800 text-white py-2 rounded-lg hover:bg-zinc-700 transition"
          >
            Login
          </button>
        </form>


        {loginSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-sm">
            Login successful! Redirecting to dashboard...
          </div>
        )}


        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
            {errorMessage}
          </div>
        )}

        <p className="text-center text-sm text-zinc-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-zinc-800 hover:underline font-medium">
            Register
          </Link>
        </p>

        <button
          onClick={() => navigate("/home")}
          className="w-full text-sm text-zinc-500 underline hover:text-zinc-700 transition"
        >
          Test Go to Home
        </button>
      </div>
    </div>
  );
}

export default LogInForm;
