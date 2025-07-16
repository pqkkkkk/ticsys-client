import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetEventsApi } from "../../../services/api/EventApi";
import ArtificialParadise from "../../../assets/image/ArtificialParadise.jpg";
import RoadTripTo1900 from "../../../assets/image/RoadTripTo1900.png";

function CustomerDashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Music", "Theater & Art", "Sport", "Others"];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await GetEventsApi();
        setEvents(data?.eventDtos || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const HandleClickEventCard = (eventId) => {
    navigate(`/${eventId}`);
  };

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === "All" || event.event.category === selectedCategory;
    const matchesSearch = event.event.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Category Filter Bar */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 py-4 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap py-2 px-4 border-b-2 font-medium text-sm transition-all duration-200 ${
                  selectedCategory === category
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-secondary-500 dark:text-gray-400 hover:text-secondary-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-700 dark:to-secondary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Hero Content */}
            <div className="text-white">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Discover Amazing
                <span className="block text-primary-200">Events</span>
              </h1>
              <p className="text-xl mb-8 text-primary-100">
                Find and book tickets for the best events in your city. From concerts to conferences, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setSelectedCategory("Music")}
                  className="px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200"
                >
                  Explore Events
                </button>
                <button 
                  onClick={() => navigate("/become-organizer")}
                  className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-200"
                >
                  Host an Event
                </button>
              </div>
            </div>

            {/* Hero Images */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="transform rotate-3 hover:rotate-6 transition-transform duration-300">
                  <img 
                    src={ArtificialParadise} 
                    alt="Featured Event" 
                    className="w-full h-64 object-cover rounded-2xl shadow-2xl"
                  />
                </div>
                <div className="transform -rotate-3 hover:-rotate-6 transition-transform duration-300 mt-8">
                  <img 
                    src={RoadTripTo1900} 
                    alt="Featured Event" 
                    className="w-full h-64 object-cover rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-secondary-700 dark:text-white mb-4">Find Your Perfect Event</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by event name..."
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-secondary-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200"
              />
            </div>
            <button className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors duration-200">
              Search Events
            </button>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-secondary-700 dark:text-white">
            {selectedCategory === "All" ? "Top Picks for You" : `${selectedCategory} Events`}
          </h2>
          <span className="text-secondary-500 dark:text-gray-400">
            {filteredEvents.length} events found
          </span>
        </div>

        {loading ? (
          /* Loading State */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300 dark:bg-gray-600"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          /* Events Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map((event) => (
              <div 
                key={event.event.id}
                onClick={() => HandleClickEventCard(event.event.id)}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={event.event.bannerPath || ArtificialParadise} 
                    alt={event.event.name}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full">
                      {event.event.category || "Event"}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-secondary-700 dark:text-white mb-2 line-clamp-2">
                    {event.event.name}
                  </h3>
                  
                  <div className="flex items-center text-secondary-500 dark:text-gray-400 text-sm mb-2">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {event.event.date}
                  </div>
                  
                  <div className="flex items-center text-secondary-500 dark:text-gray-400 text-sm mb-4">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {event.event.time}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                      From {event.minPriceOfTicket?.toLocaleString('vi-VN') || "0"} đ
                    </span>
                    <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-lg transition-colors duration-200">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <svg className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-xl font-semibold text-secondary-700 dark:text-white mb-2">No Events Found</h3>
            <p className="text-secondary-500 dark:text-gray-400 mb-6">
              We couldn't find any events matching your criteria. Try adjusting your search or category filter.
            </p>
            <button 
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors duration-200"
            >
              Show All Events
            </button>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="bg-primary-600 dark:bg-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss out on the hottest events in your city.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-secondary-700 placeholder-gray-400 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 outline-none"
              />
              <button className="px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CustomerDashboard;
