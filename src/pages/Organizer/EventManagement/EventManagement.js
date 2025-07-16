import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Voucher from "./Voucher/Voucher";
import OrderList from "./OrderList/OrderList";
import CreateVoucher from "./CreateVoucher/CreateVoucher";
import Summary from "./Summary/Summary";
import { GetEventByIdApi } from "../../../services/api/EventApi";
import EditVoucher from "./EditVoucher/EditVoucher";

function EventManagement() {
    const navigate = useNavigate();
    const { eventId } = useParams();

    const [event, setEvent] = useState({});
    const [activeItem, setActiveItem] = useState("Summary");

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await GetEventByIdApi(eventId);
                setEvent(response);
            } catch (err) {
                console.log(err);
            }
        }
        fetchEvent();
    }, [eventId]);

    const HandleReturnOrganizerDashboard = () => {
        navigate("/organizer");
    }
    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <div className="w-64 h-screen bg-gradient-to-b from-secondary-700 to-secondary-800 dark:from-gray-800 dark:to-gray-900 shadow-lg">
                <div className="p-6">
                    {/* Logo */}
                    <div className="flex items-center mb-8">
                        <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <span className="text-primary-400 text-lg font-bold ml-3">Organizer Center</span>
                    </div>

                    {/* Back to Dashboard */}
                    <button 
                        onClick={HandleReturnOrganizerDashboard}
                        className="flex items-center w-full text-white text-left p-3 mb-6 rounded-lg hover:bg-secondary-600 dark:hover:bg-gray-700 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Organizer Dashboard
                    </button>

                    {/* Navigation Sections */}
                    <div className="space-y-6">
                        {/* Report Section */}
                        <div>
                            <h2 className="text-gray-300 text-sm font-semibold uppercase tracking-wider mb-3">Report</h2>
                            <nav className="space-y-2">
                                <Link 
                                    className={`flex items-center w-full text-white text-left p-3 rounded-lg transition-colors ${
                                        activeItem === "Summary" 
                                            ? "bg-secondary-600 dark:bg-gray-700" 
                                            : "hover:bg-secondary-600 dark:hover:bg-gray-700"
                                    }`}
                                    onClick={() => setActiveItem("Summary")}
                                    to={`/organizer/myevents/${eventId}/summary`}
                                >
                                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                    </svg>
                                    Summary
                                </Link>
                                <button className="flex items-center w-full text-white text-left p-3 rounded-lg hover:bg-secondary-600 dark:hover:bg-gray-700 transition-colors">
                                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    Analysis
                                </button>
                                <Link
                                    className={`flex items-center w-full text-white text-left p-3 rounded-lg transition-colors ${
                                        activeItem === "OrderList" 
                                            ? "bg-secondary-600 dark:bg-gray-700" 
                                            : "hover:bg-secondary-600 dark:hover:bg-gray-700"
                                    }`}
                                    onClick={() => setActiveItem("OrderList")} 
                                    to={`/organizer/myevents/${eventId}/order-list`}
                                >
                                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    Order List
                                </Link>
                            </nav>
                        </div>

                        {/* Event Setting Section */}
                        <div>
                            <h2 className="text-gray-300 text-sm font-semibold uppercase tracking-wider mb-3">Event Setting</h2>
                            <nav className="space-y-2">
                                <button className="flex items-center w-full text-white text-left p-3 rounded-lg hover:bg-secondary-600 dark:hover:bg-gray-700 transition-colors">
                                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Co-member
                                </button>
                                <button className="flex items-center w-full text-white text-left p-3 rounded-lg hover:bg-secondary-600 dark:hover:bg-gray-700 transition-colors">
                                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit
                                </button>
                                <button className="flex items-center w-full text-white text-left p-3 rounded-lg hover:bg-secondary-600 dark:hover:bg-gray-700 transition-colors">
                                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    SeatMap
                                </button>
                            </nav>
                        </div>

                        {/* Marketing Section */}
                        <div>
                            <h2 className="text-gray-300 text-sm font-semibold uppercase tracking-wider mb-3">Marketing</h2>
                            <nav className="space-y-2">
                                <Link
                                    className={`flex items-center w-full text-white text-left p-3 rounded-lg transition-colors ${
                                        activeItem === "Promotion" 
                                            ? "bg-secondary-600 dark:bg-gray-700" 
                                            : "hover:bg-secondary-600 dark:hover:bg-gray-700"
                                    }`}
                                    onClick={() => setActiveItem("Promotion")} 
                                    to={`/organizer/myevents/${eventId}/voucher`}
                                >
                                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.994 1.994 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    Promotion
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 h-screen overflow-y-auto bg-white dark:bg-gray-900">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 pl-4 pt-6">
                    <h1 className="text-2xl font-bold text-secondary-700 dark:text-white">
                        {event?.event?.name || 'Event Management'}
                    </h1>
                </div>

                {/* Content */}
                <div className="p-6">
                    <Routes>
                        <Route path="voucher" element={<Voucher/>}/>
                        <Route path="order-list" element={<OrderList/>}/>
                        <Route path="create-voucher" element={<CreateVoucher/>}/>
                        <Route path="summary" element={<Summary/>}/>
                        <Route path="edit-voucher/:promotionId" element={<EditVoucher/>} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default EventManagement;