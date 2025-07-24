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

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { sub: aadhar, name } = jwtDecode(token);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value);
    });

    try {
      const response = await fetch("http://localhost:8080/api/resident/issues", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const text = await response.text();
      setMessage(`✅ Thank you, ${name}, for reporting the issue!`);
      setFormData({
        description: "",
        ward: "",
        image: null,
        video: null,
        audio: null,
      });

      setTimeout(() => {
        navigate("/feedback");
      }, 1000);
    } catch (error) {
      console.error("Error reporting issue:", error);
      setMessage("❌ Failed to report issue.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">📢 Report an Issue</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
          encType="multipart/form-data"
        >
          <div>
            <label className="block font-medium mb-1 text-gray-700">Ward</label>
            <input
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              placeholder="Enter your ward number"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Briefly describe the issue..."
              required
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Attach Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Attach Video</label>
              <input
                type="file"
                name="video"
                accept="video/*"
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Attach Audio</label>
              <input
                type="file"
                name="audio"
                accept="audio/*"
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg shadow hover:bg-blue-700 transition"
          >
            🚀 Submit Issue
          </button>
        </form>

        {message && (
          <p className="mt-6 text-center text-lg font-medium text-green-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default ReportIssue;