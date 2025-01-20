import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Explore the World with Ease
          </h1>
          <p className="text-xl mb-8">
            Discover amazing destinations and create unforgettable memories
          </p>
          <div className="space-x-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-full hover:bg-blue-100 transition">
              Start Exploring
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-blue-600 transition">
              Learn More
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Travel App
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p>Simple and intuitive booking process</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Best Deals</h3>
              <p>Competitive prices and exclusive offers</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 10l-2.293 2.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p>Customer support available anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Destinations
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {/* Add destination cards here */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img src="https://placehold.co/600x400" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">Bali, Indonesia</h3>
                <p>Tropical Paradise</p>
              </div>
            </div>
            {/* Add more destination cards */}
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
}
