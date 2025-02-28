"use client";
import { useState } from "react";

export default function AddTeacherForm() {
  const [showForm, setShowForm] = useState(false);
  const [teacher, setTeacher] = useState({
    id: "",
    name: "",
    subject: "",
    experience: "",
  });

  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/teachers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(teacher),
    });

    if (response.ok) {
      alert("Teacher added successfully!");
      setShowForm(false);
      setTeacher({ id: "", name: "", subject: "", experience: "" });
    } else {
      alert("Failed to add teacher.");
    }
  };

  return (
    <div>
      {/* Button to Show Form */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        {showForm ? "Close Form" : "Add Teacher"}
      </button>

      {/* Form (Appears When Button Clicked) */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded-lg shadow-md">
          <input
            type="number"
            name="id"
            placeholder="ID"
            value={teacher.id}
            onChange={handleChange}
            required
            className="block w-full p-2 border mb-2"
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={teacher.name}
            onChange={handleChange}
            required
            className="block w-full p-2 border mb-2"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={teacher.subject}
            onChange={handleChange}
            required
            className="block w-full p-2 border mb-2"
          />
          <input
            type="number"
            name="experience"
            placeholder="Experience (Years)"
            value={teacher.experience}
            onChange={handleChange}
            required
            className="block w-full p-2 border mb-2"
          />
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
