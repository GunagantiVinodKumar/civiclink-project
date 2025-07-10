import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const getSentimentLabel = (score) => {
  if (score <= -0.6) return "Very Negative 😠";
  if (score < -0.1) return "Negative 🙁";
  if (score <= 0.1) return "Neutral 😐";
  if (score < 0.6) return "Positive 🙂";
  return "Very Positive 😄";
};

function FeedbackResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Oops! No result found.</h2>
        <button
          onClick={() => navigate("/feedback")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-8 text-center">
        🎉 Thank you for your feedback!
      </h1>

      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full text-center border border-blue-300">
        <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
          <span className="text-blue-600">Interpretation:</span> {getSentimentLabel(result.score)}
        </p>
        <p className="text-lg text-gray-600 mb-6">
          <span className="font-semibold">Raw Score:</span> {result.score}
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-8 py-3 bg-blue-700 text-white text-lg font-medium rounded-xl shadow hover:bg-blue-800 transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export default FeedbackResult;
