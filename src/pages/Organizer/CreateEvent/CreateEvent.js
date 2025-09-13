import React from "react";
import EventInfo from "./EventInfo/EventInfo";
import { format } from "date-fns";
import TicketSetUp from "./TicketSetUp/TicketSetUp";
import { useState, useEffect } from "react";
import { CreateEventApi } from "../../../services/api/EventApi";
import { useNavigate } from "react-router-dom";
import { GetUser } from "../../../services/UserStorageService";
import ThemeToggle from "../../../components/ThemeToggle/ThemeToggle";
function CreateEvent(){
    const navigate = useNavigate();
    const [user] = useState(GetUser());
    const [eventData, setEventData] = useState({
        banner: null,
        seatMap: null,
        date: null,
        time: null,
        name: null,
        description: "",
        location: null,
        category: null
    });
    const [ticketsData, setTicketsData] = useState([]);
    const [currentStep,setCurrenrStep] = useState(1);
    const [creatWaiting, setCreateWaiting] = useState(false);

    useEffect(() => {
        if(!user || !user.roles?.find(role => role === "ORGANIZER")) {
            sessionStorage.setItem('redirectAfterLogin', '/organizer/create-event');
            navigate("/signin", { replace: true });
        }
    }, [navigate, user]);
    const HandleEventDataChange = (key, value) =>{
        setEventData((prev) =>({
            ...prev,
            [key]: value
        }))
    }
    const HandleTicketsDataChange = (newTicket) =>{
        setTicketsData((prev) => [...prev, newTicket]);
    }
    const HandleFieldOfTicketInTicketsDataChange = (newTicket) =>{
        setTicketsData((prev) => prev.map((ticket) => ticket.name === newTicket.name ? newTicket : ticket));
    }
    const HandleBackClick = () =>{
        setCurrenrStep(currentStep-1);
    }
    const HandleContinueClick = () =>{
        setCurrenrStep(currentStep+1);
    }
    const HandleCreateEvent = async () =>{
        const eventRequest = new FormData();
        const event = {
            organizerId: "admin",
            status: "Upcoming",
            date: format(eventData.date, "yyyy-MM-dd"),
            time:format(eventData.time, "HH:mm:ss"),
            name: eventData.name,
            description: eventData.description,
            location: eventData.location,
            category: eventData.category
        };
        eventRequest.append("event", JSON.stringify(event));
        eventRequest.append("tickets", JSON.stringify(ticketsData));
        eventRequest.append("banner", eventData.banner);
        eventRequest.append("seatMap", eventData.seatMap);

        setCreateWaiting(true);
        const eventResponse = await CreateEventApi(eventRequest);

        if(eventResponse){
            if(eventResponse.message === "success")
            {
                alert("Event created successfully");
                navigate("/organizer/events");
            }
            else
            {
                alert(eventResponse.message);
            }
            setCreateWaiting(false);
        }
    }
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <ThemeToggle />
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Step Container */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        {/* Steps */}
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                                    currentStep === 1 
                                        ? 'bg-primary-600 text-white' 
                                        : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                                }`}>
                                    1
                                </div>
                                <span className="text-secondary-700 dark:text-white font-medium">
                                    Event Information
                                </span>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                                    currentStep === 2 
                                        ? 'bg-primary-600 text-white' 
                                        : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                                }`}>
                                    2
                                </div>
                                <span className="text-secondary-700 dark:text-white font-medium">
                                    Ticket Setup
                                </span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center gap-4">
                            {currentStep !== 1 && (
                                <button 
                                    onClick={HandleBackClick} 
                                    className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors duration-200"
                                >
                                    Back
                                </button>
                            )}
                            {currentStep !== 2 && (
                                <button 
                                    onClick={HandleContinueClick} 
                                    className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200"
                                >
                                    Continue
                                </button>
                            )}
                            {currentStep !== 1 && (
                                <button 
                                    onClick={HandleCreateEvent} 
                                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                                >
                                    Create Event
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Loading Progress */}
                {creatWaiting && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
                            <span className="text-secondary-700 dark:text-white font-medium">Creating event...</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-primary-600 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                    {currentStep === 1 && (
                        <EventInfo 
                            event={eventData}
                            HandleEventDataChange={HandleEventDataChange} 
                        />
                    )}
                    {currentStep === 2 && (
                        <TicketSetUp 
                            tickets={ticketsData}
                            HandleTicketsDataChange={HandleTicketsDataChange}
                            HandleFieldOfTicketInTicketsDataChange={HandleFieldOfTicketInTicketsDataChange} 
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateEvent;