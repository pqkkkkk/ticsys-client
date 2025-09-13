import React from "react";
import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ManageUser from "./ManageUser/ManageUser";
import ManageOrder from "./ManageOrder/ManageOrder";
import Report from "./Report/Report";

function AdminMainPage() {
    const [activeItem, setActiveItem] = useState("Users");

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <div className="w-64 h-screen bg-secondary-800 dark:bg-gray-800 shadow-lg">
                <div className="p-6">
                    {/* Logo */}
                    <div className="flex items-center mb-8">
                        <img 
                            src="https://storage.googleapis.com/a1aa/image/amaNA0uoERfg-3hwsjF3ljt2wJ_5uj8H471bBXMVPmg.jpg" 
                            alt="Logo" 
                            className="w-10 h-10 mr-3 rounded-lg"
                        />
                        <span className="text-primary-400 text-xl font-bold">Admin Center</span>
                    </div>

                    {/* Navigation */}
                    <nav>
                        <ul className="space-y-2">
                            <li>
                                <Link 
                                    to="/admin/report"
                                    onClick={() => handleItemClick("Report")}
                                    className={`flex items-center w-full text-left p-4 rounded-lg transition-colors ${
                                        activeItem === "Report" 
                                            ? "bg-secondary-700 dark:bg-gray-700 text-white" 
                                            : "text-gray-300 hover:bg-secondary-700 dark:hover:bg-gray-700 hover:text-white"
                                    }`}
                                >
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    Report
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/admin/users"
                                    onClick={() => handleItemClick("Users")}
                                    className={`flex items-center w-full text-left p-4 rounded-lg transition-colors ${
                                        activeItem === "Users" 
                                            ? "bg-secondary-700 dark:bg-gray-700 text-white" 
                                            : "text-gray-300 hover:bg-secondary-700 dark:hover:bg-gray-700 hover:text-white"
                                    }`}
                                >
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                    </svg>
                                    Users
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/admin/orders"
                                    onClick={() => handleItemClick("Orders")}
                                    className={`flex items-center w-full text-left p-4 rounded-lg transition-colors ${
                                        activeItem === "Orders" 
                                            ? "bg-secondary-700 dark:bg-gray-700 text-white" 
                                            : "text-gray-300 hover:bg-secondary-700 dark:hover:bg-gray-700 hover:text-white"
                                    }`}
                                >
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                    Orders
                                </Link>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleItemClick("Organizer register request")}
                                    className={`flex items-center w-full text-left p-4 rounded-lg transition-colors ${
                                        activeItem === "Organizer register request" 
                                            ? "bg-secondary-700 dark:bg-gray-700 text-white" 
                                            : "text-gray-300 hover:bg-secondary-700 dark:hover:bg-gray-700 hover:text-white"
                                    }`}
                                >
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Organizer Requests
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 h-screen overflow-y-auto bg-white dark:bg-gray-900">

                {/* Content */}
                <div className="p-8">
                    <Routes>
                        <Route path="users" Component={ManageUser}/>
                        <Route path="orders" Component={ManageOrder}/>
                        <Route path="report" Component={Report}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AdminMainPage;