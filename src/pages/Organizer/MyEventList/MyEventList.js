import React, { useEffect, useState } from 'react';
import { GetEventsByOrganizerIdApi } from "../../../services/api/EventApi";
import { useNavigate } from "react-router-dom";
import { GetUser } from '../../../services/UserStorageService';
function MyEventList() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [currentUser] = useState(GetUser());
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");

    useEffect(() => {
        if(!currentUser || currentUser.roles.find(role => role === "ORGANIZER") === undefined){
            navigate("/error");
        }
        const FetchEvents = async () => {
            try {
                const response = await GetEventsByOrganizerIdApi(currentUser.userName);
                if(response){
                    console.log(response.eventDtos);
                    setEvents(response.eventDtos);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setIsLoading(false);
            }
        }
        FetchEvents();
    },[currentUser, navigate]);
    
    const HandleNavigateToEventManagement = (eventId) => {
        navigate(`/organizer/myevents/${eventId}`);
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatTime = (timeString) => {
        const time = new Date(timeString);
        return time.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             event.event.location.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (activeFilter === "all") return matchesSearch;
        // Add more filter logic here based on event status
        return matchesSearch;
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <p className="text-secondary-600 dark:text-gray-300">Loading events...</p>
                </div>
            </div>
        );
    }

    return (
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-700 dark:text-white mb-2">
            My Events
          </h1>
          <div className="h-px bg-gray-200 dark:bg-gray-700"></div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-secondary-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Search events by name or location..."
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3">
              {[
                { key: "all", label: "All Events" },
                { key: "upcoming", label: "Upcoming" },
                { key: "past", label: "Past" },
                { key: "pending", label: "Pending" },
                { key: "draft", label: "Draft" },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeFilter === filter.key
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-secondary-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3a1 1 0 012 0v4h4V3a1 1 0 012 0v4h3a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h3z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-secondary-700 dark:text-white mb-2">
              No events found
            </h3>
            <p className="text-secondary-500 dark:text-gray-400 mb-6">
              {searchTerm
                ? "No events match your search criteria."
                : "You haven't created any events yet."}
            </p>
            <button
              onClick={() => navigate("/organizer/create_event")}
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create Your First Event
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredEvents.map((event) => (              <div
                key={event.event.id}
                onClick={() => HandleNavigateToEventManagement(event.event.id)}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="p-6">
                  {/* Top section: Banner + Event Info */}
                  <div className="flex flex-col md:flex-row gap-6 mb-6">
                    {/* Event Image */}
                    <div className="relative w-full md:w-64 h-48 md:h-40 bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0 rounded-lg">
                      {event.event.bannerPath ? (
                        <img
                          src={event.event.bannerPath}
                          alt={event.event.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center rounded-lg">
                          <svg
                            className="w-16 h-16 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}

                      {/* Status Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                          Active
                        </span>
                      </div>
                    </div>

                    {/* Event Info */}
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-secondary-700 dark:text-white mb-4 line-clamp-2">
                        {event.event.name}
                      </h3>

                      <div className="space-y-3">
                        <div className="flex items-center text-secondary-600 dark:text-gray-300">
                          <svg
                            className="w-5 h-5 mr-3 flex-shrink-0 text-primary-600 dark:text-primary-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3a1 1 0 012 0v4h4V3a1 1 0 012 0v4h3a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h3z"
                            />
                          </svg>
                          <span className="text-sm font-medium">
                            {formatDate(event.event.date)} • {formatTime(event.event.date)}
                          </span>
                        </div>
                        <div className="flex items-center text-secondary-600 dark:text-gray-300">
                          <svg
                            className="w-5 h-5 mr-3 flex-shrink-0 text-primary-600 dark:text-primary-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span className="text-sm font-medium">
                            {event.event.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gray-200 dark:bg-gray-700 mb-4"></div>

                  {/* Bottom section: Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button className="flex items-center px-4 py-2 text-sm font-medium text-secondary-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors border border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      Overview
                    </button>
                    <button className="flex items-center px-4 py-2 text-sm font-medium text-secondary-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors border border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Orders
                    </button>
                    <button className="flex items-center px-4 py-2 text-sm font-medium text-secondary-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors border border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
                    </button>
                    <button className="flex items-center px-4 py-2 text-sm font-medium text-secondary-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors border border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a1 1 0 001 1h1a1 1 0 001-1V7a2 2 0 00-2-2H5zM5 14a2 2 0 00-2 2v3a1 1 0 001 1h1a1 1 0 001-1v-3a2 2 0 00-2-2H5z"
                        />
                      </svg>
                      Tickets
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
}

export default MyEventList;