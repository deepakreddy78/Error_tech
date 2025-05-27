import { useState } from "react";

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email } = formData;

    if (!name || !email || !/\S+@\S+\.\S+/.test(email)) {
      return setError("Please enter a valid name and email.");
    }

    try {
      const res = await fetch(
        "https://assess78.app.n8n.cloud/webhook-test/lead-capture",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to submit");

      alert("Lead submitted successfully!");
      setFormData({ name: "", email: "", company: "", message: "" });
      setError("");
    } catch (err) {
      console.error(err);
      setError("Submission failed.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Contact Us</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          name="name"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          name="email"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Company</label>
        <input
          type="text"
          name="company"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          value={formData.company}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Message</label>
        <textarea
          name="message"
          rows="4"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
}
