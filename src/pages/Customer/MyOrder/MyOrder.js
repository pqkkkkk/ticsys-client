import React from "react";
import { useState, useEffect } from "react";
import { GetOrdersWithEventOfUserApi } from "../../../services/api/OrderApi";
import { GetUser } from "../../../services/UserStorageService";
import { ConvertDateStringToDateWithMonthName } from "../../../utils/DateUtils";
import { useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "../../../components/ThemeToggle/ThemeToggle";

function MyTicket() {
    const navigate = useNavigate();
    const location = useLocation();

    const [orders, setOrders] = useState([]);
    const [user] = useState(GetUser());
    const [activeTab, setActiveTab] = useState("All");
    const [activeSubTab, setActiveSubTab] = useState("Upcoming");

    useEffect(() => {
        if (!user) {
            // Lưu current location để redirect back sau khi đăng nhập
            sessionStorage.setItem('redirectAfterLogin', location.pathname);
            navigate("/signin", { replace: true });
        } else {
            GetOrdersWithEventOfUserApi(user.userName).then((response) => {
                setOrders(response.orderDtos);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [user, navigate, location.pathname]);

    const HandleViewDetailOrder = (orderId) => {
        navigate(`/orders/${orderId}`);
    }

    const tabs = ["All", "Finished", "Processing", "Cancelled"];
    const subTabs = ["Upcoming", "Past"];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <ThemeToggle />
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-secondary-700 dark:text-white mb-2">My Tickets</h1>
                    <p className="text-secondary-600 dark:text-gray-300">Manage and view your event tickets</p>
                </div>

                {/* Main Tabs */}
                <div className="mb-6">
                    <div className="flex flex-wrap gap-2 bg-white dark:bg-gray-800 rounded-xl p-2 shadow-lg">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                                    activeTab === tab
                                        ? "bg-primary-500 text-white shadow-md"
                                        : "text-secondary-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sub Tabs */}
                <div className="mb-8">
                    <div className="flex gap-2">
                        {subTabs.map((subTab) => (
                            <button
                                key={subTab}
                                onClick={() => setActiveSubTab(subTab)}
                                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                                    activeSubTab === subTab
                                        ? "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 border border-primary-300 dark:border-primary-600"
                                        : "text-secondary-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                }`}
                            >
                                {subTab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tickets List */}
                <div className="space-y-4">
                    {orders.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="mb-4">
                                <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-secondary-700 dark:text-white mb-2">No tickets found</h3>
                            <p className="text-secondary-600 dark:text-gray-300 mb-6">You haven't booked any events yet.</p>
                            <button 
                                onClick={() => navigate("/")}
                                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors duration-200"
                            >
                                Browse Events
                            </button>
                        </div>
                    ) : (
                        orders.map((order, index) => (
                            <div 
                                key={index}
                                onClick={() => HandleViewDetailOrder(order.order.id)}
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden"
                            >
                                <div className="flex flex-col lg:flex-row">
                                    {/* Date Section */}
                                    <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-6 lg:w-32 flex lg:flex-col items-center justify-center text-white">
                                        <div className="text-center">
                                            <p className="text-3xl font-bold mb-1">
                                                {ConvertDateStringToDateWithMonthName(order.event.date)[2]}
                                            </p>
                                            <p className="text-primary-100 text-sm font-medium mb-1">
                                                {ConvertDateStringToDateWithMonthName(order.event.date)[1]}
                                            </p>
                                            <p className="text-primary-200 text-xs">
                                                {ConvertDateStringToDateWithMonthName(order.event.date)[0]}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Ticket Details */}
                                    <div className="flex-1 p-6">
                                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                                            <div className="flex-1 mb-4 lg:mb-0">
                                                <h2 className="text-xl lg:text-2xl font-bold text-secondary-700 dark:text-white mb-3">
                                                    {order.event.name}
                                                </h2>
                                                
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium rounded-full">
                                                        Finished
                                                    </span>
                                                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium rounded-full">
                                                        E-ticket
                                                    </span>
                                                </div>

                                                <div className="space-y-2 text-secondary-600 dark:text-gray-300">
                                                    <div className="flex items-center">
                                                        <svg className="w-4 h-4 mr-3 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        <span className="text-sm">Order code: {order.order.id}</span>
                                                    </div>
                                                    
                                                    <div className="flex items-center">
                                                        <svg className="w-4 h-4 mr-3 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span className="text-sm">{order.event.time} - {order.event.date}</span>
                                                    </div>
                                                    
                                                    <div className="flex items-center">
                                                        <svg className="w-4 h-4 mr-3 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        <span className="text-sm">{order.event.location}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* View Details Button */}
                                            <div className="lg:ml-6">
                                                <div className="flex items-center text-primary-600 dark:text-primary-400 font-semibold">
                                                    <span className="mr-2">View Details</span>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyTicket;