import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext"; // make sure the path is correct

export default function AdminPanel() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(); // Clears token + role from context and localStorage
    navigate("/", { replace: true }); // Redirect to login, no back navigation
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-zinc-800 mb-4">Admin Dashboard</h1>
        <p className="text-zinc-600 text-lg">Welcome, Admin! 🔐</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <button className="bg-zinc-800 text-white py-3 rounded-xl hover:bg-zinc-700 transition">
            Manage Residents
          </button>
          <button className="bg-zinc-800 text-white py-3 rounded-xl hover:bg-zinc-700 transition">
            View All Reports
          </button>
          <button className="bg-zinc-800 text-white py-3 rounded-xl hover:bg-zinc-700 transition">
            Announcements
          </button>
          <button className="bg-zinc-800 text-white py-3 rounded-xl hover:bg-zinc-700 transition">
            Settings
          </button>
        </div>

        {/* 🔴 Logout button */}
        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
