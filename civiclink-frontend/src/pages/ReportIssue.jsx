import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

function ReportIssue() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    description: "",
    ward: "",
    image: null,
    video: null,
    audio: null,
  });

  const [predicted, setPredicted] = useState({
    title: "",
    category: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    const updatedData = { ...formData, [name]: files ? files[0] : value };
    setFormData(updatedData);

    if (name === "description" && value.trim().length > 10) {
      try {
        const res = await fetch("http://localhost:5001/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description: value }),
        });

        if (res.ok) {
          const data = await res.json();
          setPredicted({
            title: data.title,
            category: data.category,
          });
        }
      } catch (err) {
        console.error("Prediction failed:", err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { sub: aadhar, name } = jwtDecode(token);
    const formDataToSend = new FormData();

    // ✅ Add manually predicted fields + form fields
    formDataToSend.append("title", predicted.title);
    formDataToSend.append("category", predicted.category);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("ward", formData.ward);

    ["image", "video", "audio"].forEach((media) => {
      if (formData[media]) formDataToSend.append(media, formData[media]);
    });

    try {
      const res = await fetch("http://localhost:8080/api/issues", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          aadhar: aadhar,
        },
        body: formDataToSend,
      });

      const text = await res.text();
      setMessage(`✅ Thank you, ${name}, for reporting the issue!`);
      setFormData({
        description: "",
        ward: "",
        image: null,
        video: null,
        audio: null,
      });
      setPredicted({ title: "", category: "" });

      setTimeout(() => navigate("/feedback"), 1000);
    } catch (err) {
      console.error("Error reporting issue:", err);
      setMessage("❌ Failed to report issue.");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Report an Issue</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your issue..."
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="ward"
          value={formData.ward}
          onChange={handleChange}
          placeholder="Ward Number"
          required
          className="w-full border p-2 rounded"
        />
        <div className="flex flex-col gap-2">
          <label>Attach Image:
            <input type="file" name="image" accept="image/*" onChange={handleChange} />
          </label>
          <label>Attach Video:
            <input type="file" name="video" accept="video/*" onChange={handleChange} />
          </label>
          <label>Attach Audio:
            <input type="file" name="audio" accept="audio/*" onChange={handleChange} />
          </label>
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          Submit
        </button>
      </form>

      {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
    </div>
  );
}

export default ReportIssue;
