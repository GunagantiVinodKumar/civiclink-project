import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../components/AuthContext";

function ReportIssue() {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    ward: "",
    image: null,
    video: null,
    audio: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const aadhar = jwtDecode(token).sub;

    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("ward", formData.ward);
    data.append("description", formData.description);
    if (formData.image) data.append("image", formData.image);
    if (formData.video) data.append("video", formData.video);
    if (formData.audio) data.append("audio", formData.audio);

    try {
      const response = await fetch("http://localhost:8080/api/issues", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          aadhar: aadhar,
        },
        body: data,
      });

      const text = await response.text();
      setMessage(text);
      setFormData({
        title: "",
        description: "",
        category: "",
        ward: "",
        image: null,
        video: null,
        audio: null,
      });
    } catch (error) {
      console.error("Error reporting issue:", error);
      setMessage("Failed to report issue.");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Report an Issue</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="ward"
          value={formData.ward}
          onChange={handleChange}
          placeholder="Ward"
          required
          className="w-full border p-2 rounded"
        />

        <div>
          <label className="block text-sm font-medium">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Upload Video</label>
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Upload Audio</label>
          <input
            type="file"
            name="audio"
            accept="audio/*"
            onChange={handleFileChange}
            className="w-full mt-1"
          />
        </div>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {message && (
        <p className="mt-4 text-green-600 font-medium">{message}</p>
      )}
    </div>
  );
}

export default ReportIssue;
