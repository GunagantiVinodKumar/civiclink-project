import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/feedback/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ feedback }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      if (!data || data.score === undefined) {
        throw new Error("Invalid response from backend");
      }

      navigate("/feedback/result", { state: { result: data } });
    } catch (err) {
      console.error("Error analyzing sentiment:", err);
      alert("Failed to submit feedback. Please check backend and try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-12">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6 text-center">
          ✨ Share Your Feedback
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            rows="6"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Type your feedback here..."
            required
            className="w-full p-4 text-lg border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-lg font-semibold rounded-xl text-white shadow transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Analyzing..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;
