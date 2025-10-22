import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMessage(`✅ ${data.message}`);
        setName("");
        setEmail("");
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error connecting to server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-green-700 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="font-bold text-2xl sm:text-3xl flex items-center gap-2">
              <span className="text-3xl">🌾</span>
              Zero Hunger
            </h1>
            <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base">
              <a href="#programs" className="hover:underline transition">
                Programs
              </a>
              <a href="#impact" className="hover:underline transition">
                Impact
              </a>
              <a href="#volunteer" className="hover:underline transition">
                Volunteer
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            End Hunger, One Meal at a Time
          </h2>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4">
            Join our mission to ensure no one goes hungry. Support programs, volunteer, or donate today!
          </p>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center text-gray-800">
            Our Programs
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🍲</div>
              <h4 className="font-semibold text-xl sm:text-2xl mb-3 text-green-700">
                Food Drives
              </h4>
              <p className="text-gray-600 text-sm sm:text-base">
                Collecting and distributing food to communities in need across the region.
              </p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">📚</div>
              <h4 className="font-semibold text-xl sm:text-2xl mb-3 text-green-700">
                Nutrition Education
              </h4>
              <p className="text-gray-600 text-sm sm:text-base">
                Teaching healthy eating habits to children and families for lasting impact.
              </p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow sm:col-span-2 lg:col-span-1">
              <div className="text-4xl mb-4">🚨</div>
              <h4 className="font-semibold text-xl sm:text-2xl mb-3 text-green-700">
                Emergency Aid
              </h4>
              <p className="text-gray-600 text-sm sm:text-base">
                Providing quick food support during natural disasters and crises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="bg-green-50 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-gray-800">
            Our Impact
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl sm:text-4xl font-bold text-green-700 mb-2">10,000+</div>
              <div className="text-gray-600 text-sm sm:text-base">Meals Distributed</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl sm:text-4xl font-bold text-green-700 mb-2">500+</div>
              <div className="text-gray-600 text-sm sm:text-base">Active Volunteers</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl sm:text-4xl font-bold text-green-700 mb-2">50+</div>
              <div className="text-gray-600 text-sm sm:text-base">Communities Served</div>
            </div>
          </div>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-gray-700 px-4">
            Together, we're making a real difference in fighting hunger and improving countless lives.
          </p>
        </div>
      </section>

      {/* Volunteer Section */}
      <section id="volunteer" className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center text-gray-800">
              Volunteer With Us
            </h3>
            <form 
              onSubmit={handleSubmit} 
              className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg"
            >
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Submitting..." : "Sign Up to Volunteer"}
                </button>
              </div>
              
              {message && (
                <div className={`mt-6 p-4 rounded-lg text-center ${
                  message.includes('✅') 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 sm:py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm sm:text-base">
            © 2025 Zero Hunger Initiative. Together, we can end hunger.
          </p>
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <a href="#" className="hover:text-green-400 transition">Privacy</a>
            <a href="#" className="hover:text-green-400 transition">Terms</a>
            <a href="#" className="hover:text-green-400 transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}