import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      alert(data.message);
      setName("");
      setEmail("");
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="p-4 bg-green-700 text-white flex justify-between items-center">
        <h1 className="font-bold text-2xl">Zero Hunger</h1>
        <nav className="space-x-4">
          <a href="#programs" className="hover:underline">
            Programs
          </a>
          <a href="#impact" className="hover:underline">
            Impact
          </a>
          <a href="#volunteer" className="hover:underline">
            Volunteer
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-green-100 p-10 text-center">
        <h2 className="text-4xl font-bold mb-4">End Hunger, One Meal at a Time</h2>
        <p className="text-lg max-w-xl mx-auto">
          Join our mission to ensure no one goes hungry. Support programs, volunteer, or donate today!
        </p>
      </section>

      {/* Programs Section */}
      <section id="programs" className="p-10 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold mb-6">Our Programs</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <h4 className="font-semibold text-xl mb-2">Food Drives</h4>
            <p>Collecting and distributing food to communities in need.</p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <h4 className="font-semibold text-xl mb-2">Nutrition Education</h4>
            <p>Teaching healthy eating habits to children and families.</p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <h4 className="font-semibold text-xl mb-2">Emergency Aid</h4>
            <p>Providing quick food support during natural disasters and crises.</p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="bg-green-50 p-10 text-center">
        <h3 className="text-3xl font-bold mb-6">Our Impact</h3>
        <p className="text-lg max-w-2xl mx-auto">
          Over 10,000 meals distributed last year, 500 volunteers engaged, and countless lives improved.
        </p>
      </section>

      {/* Volunteer Section */}
      <section id="volunteer" className="p-10 max-w-2xl mx-auto">
        <h3 className="text-3xl font-bold mb-4">Volunteer With Us</h3>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className="w-full border p-2 rounded"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
          >
            Submit
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="p-6 text-center bg-gray-100 mt-10">
        © 2025 Zero Hunger Initiative
      </footer>
    </div>
  );
}
