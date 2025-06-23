import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext.jsx'; 

export default function CitizenDashboard() {
    const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  const actions = [
    {
      label: "Report an Issue",
      description: "Raise complaints like garbage, roads, electricity, etc.",
      onClick: () => navigate("/report"),
    },
    {
      label: "Events & Festivals",
      description: "Check upcoming village events and festivals.",
      onClick: () => navigate("/events"),
    },
    {
      label: "My Reports",
      description: "View your submitted reports and their status.",
      onClick: () => navigate("/my-reports"),
    },
    {
      label: "Village Info",
      description: "Access contact info of local authorities and offices.",
      onClick: () => navigate("/village-info"),
    },
    {
      label: "Announcements",
      description: "See latest government notices and schemes.",
      onClick: () => navigate("/announcements"),
    },
    {
      label: "Feedback / Contact",
      description: "Send suggestions, issues or appreciation.",
      onClick: () => navigate("/feedback"),
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-zinc-800 mb-6 text-center">
          Welcome to CivicLink Dashboard
        </h1>

        <p className="text-center text-zinc-600 mb-10">
          Empowering Villages through Digital Governance 🌱
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {actions.map((action, idx) => (
            <div
              key={idx}
              onClick={action.onClick}
              className="bg-white rounded-xl p-6 shadow hover:shadow-md cursor-pointer transition border border-zinc-200 hover:border-zinc-400"
            >
              <h3 className="text-xl font-semibold text-zinc-800 mb-2">
                {action.label}
              </h3>
              <p className="text-zinc-600 text-sm">{action.description}</p>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Log Out
      </button>
    </div>
  );
}
