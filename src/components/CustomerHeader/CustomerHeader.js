import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GetUser } from "../../services/UserStorageService";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

function CustomerHeader() {
  const navigate = useNavigate();
  const user = GetUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const HandleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      console.log("Searching for:", searchQuery);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex-shrink-0 cursor-pointer" 
            onClick={() => navigate("/")}
          >
            <h1 className="text-2xl font-bold text-primary-500 hover:text-primary-600 transition-colors duration-200">
              TicSys
            </h1>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events..."
                className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-lg text-secondary-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-r-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          {/* Action Buttons - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Become Organizer / Organizer Dashboard */}
            {user && user.roles?.find(role => role === "ORGANIZER") === undefined && (
              <button 
                onClick={() => navigate("/become-organizer")}
                className="px-4 py-2 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Become Organizer
              </button>
            )}
            
            {user && user.roles?.find(role => role === "ORGANIZER") !== undefined && (
              <button 
                onClick={() => navigate("/organizer")}
                className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Organizer Dashboard
              </button>
            )}
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-6">
            {!user && (
              <>
                <NavLink 
                  to="/signin" 
                  className={({ isActive }) => 
                    `px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' 
                        : 'text-secondary-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                    }`
                  }
                >
                  Sign In
                </NavLink>
                <NavLink 
                  to="/signup" 
                  className={({ isActive }) => 
                    `px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-primary-500 hover:bg-primary-600 text-white'
                    }`
                  }
                >
                  Sign Up
                </NavLink>
              </>
            )}

            {user && (
              <>
                <NavLink 
                  to="/orders" 
                  className={({ isActive }) => 
                    `px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' 
                        : 'text-secondary-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                    }`
                  }
                >
                  My Tickets
                </NavLink>
                <NavLink 
                  to="/profile" 
                  className={({ isActive }) => 
                    `px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' 
                        : 'text-secondary-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                    }`
                  }
                >
                  Profile
                </NavLink>
              </>
            )}
          </nav>

          {/* User Actions and Theme Toggle */}
          <div className="flex items-center space-x-3">
            {user && (
              <div className="hidden md:flex items-center space-x-3">
                {/* Notifications */}
                <button className="p-2 text-secondary-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-12a3 3 0 016 0v12z" />
                  </svg>
                </button>
                
                {/* Logout */}
                <button 
                  onClick={HandleLogout}
                  className="p-2 text-secondary-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                  title="Logout"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            )}

            {/* Theme Toggle - Always visible */}
            <div className="relative">
              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-secondary-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="py-4 space-y-3">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="flex px-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events..."
                  className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-lg text-secondary-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-r-lg transition-colors duration-200"
                >
                  Search
                </button>
              </form>

              {/* Mobile Navigation */}
              <div className="space-y-2">
                {!user && (
                  <>
                    <NavLink 
                      to="/signin" 
                      className="block px-4 py-2 text-secondary-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </NavLink>
                    <NavLink 
                      to="/signup" 
                      className="block px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </NavLink>
                  </>
                )}

                {user && (
                  <>
                    <NavLink 
                      to="/orders" 
                      className="block px-4 py-2 text-secondary-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Tickets
                    </NavLink>
                    <NavLink 
                      to="/profile" 
                      className="block px-4 py-2 text-secondary-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Profile
                    </NavLink>

                    {/* Mobile Action Buttons */}
                    {user.roles.find(role => role === "ORGANIZER") === undefined && (
                      <button 
                        onClick={() => {
                          navigate("/become-organizer");
                          setIsMobileMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg transition-colors duration-200"
                      >
                        Become Organizer
                      </button>
                    )}
                    
                    {user.roles.find(role => role === "ORGANIZER") !== undefined && (
                      <button 
                        onClick={() => {
                          navigate("/organizer");
                          setIsMobileMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-200"
                      >
                        Organizer Dashboard
                      </button>
                    )}

                    {/* Mobile User Actions */}
                    <div className="flex justify-between px-4 py-2">
                      <button className="p-2 text-secondary-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-12a3 3 0 016 0v12z" />
                        </svg>
                      </button>
                      
                      <button 
                        onClick={() => {
                          HandleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="p-2 text-secondary-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default CustomerHeader;
