import { useState } from "react";

function ReportIssue() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Water",
    ward: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const aadhar = localStorage.getItem("aadhar"); // Save this at login
      const res = await fetch("http://localhost:8080/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          aadhar: aadhar
        },
        body: JSON.stringify(form),
      });

      const result = await res.text();
      alert(result);
    } catch (err) {
      console.error(err);
      alert("Issue submission failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <input name="title" placeholder="Title" onChange={handleChange} className="border p-2 w-full" required />
      <textarea name="description" placeholder="Description" onChange={handleChange} className="border p-2 w-full" required />
      <select name="category" onChange={handleChange} className="border p-2 w-full">
        <option>Water</option>
        <option>Road</option>
        <option>Electricity</option>
        <option>Sanitation</option>
      </select>
      <input name="ward" placeholder="Ward Number" onChange={handleChange} className="border p-2 w-full" required />
      <button type="submit" className="bg-zinc-800 text-white px-4 py-2 rounded">Submit Issue</button>
    </form>
  );
}

export default ReportIssue;
