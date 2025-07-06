import React, { useState } from "react";

function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/feedback/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedback }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Error analyzing sentiment:", err);
      setResult({ sentiment: "error", score: "N/A" });
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Give Your Feedback</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback here..."
          required
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Submit Feedback"}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: "1rem" }}>
          <h4>Sentiment: {result.sentiment}</h4>
          <p>Score: {result.score}</p>
        </div>
      )}
    </div>
  );
}

export default Feedback;
