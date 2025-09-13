import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import OrganizerNavigation from "../../components/OrganizerNavigation/OrganizerNavigation";
import CreateEvent from "./CreateEvent/CreateEvent";
import MyEventList from "./MyEventList/MyEventList";
import { GetUser } from "../../services/UserStorageService";
function OrganizerMainPage() {
  const navigate = useNavigate();
  const [user] = useState(GetUser());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(user === null){
      navigate('/error');
    } else {
      setIsLoading(false);
    }
  }, [navigate, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-secondary-600 dark:text-gray-300">Loading organizer dashboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <OrganizerNavigation />
      
      <main className="flex-1 ml-64 transition-all duration-300">
        <div className="p-6">
          <Routes>
            <Route path="create_event" Component={CreateEvent} />
            <Route path="events" Component={MyEventList} />
            <Route path="profile" Component={MyEventList} />
            <Route path="/" element={
              <div className="max-w-7xl mx-auto">
                {/* Dashboard Header */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-secondary-700 dark:text-white mb-2">
                    Welcome to Organizer Dashboard
                  </h1>
                  <p className="text-secondary-600 dark:text-gray-300">
                    Manage your events and create amazing experiences for your audience
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-secondary-700 dark:text-white">Create Event</h3>
                        <p className="text-sm text-secondary-500 dark:text-gray-400">Start organizing your next event</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 012 0v4h4V3a1 1 0 012 0v4h3a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h3z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-secondary-700 dark:text-white">My Events</h3>
                        <p className="text-sm text-secondary-500 dark:text-gray-400">View and manage your events</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-secondary-700 dark:text-white">Analytics</h3>
                        <p className="text-sm text-secondary-500 dark:text-gray-400">Track your event performance</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default OrganizerMainPage;