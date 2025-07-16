import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { GetEventWithTicketsByIdApi } from "../../../../services/api/EventApi";
import { GetUser } from "../../../../services/UserStorageService";
import {format} from 'date-fns';
import { CreateOrderApi } from "../../../../services/api/OrderApi";
import { GetPromotionInfosOfEvent } from "../../../../services/api/PromotionApi";
import ThemeToggle from "../../../../components/ThemeToggle/ThemeToggle";
function SelectTicket() {
    const navigate = useNavigate();
    const {eventId} = useParams();

    const [currentUser] = useState(GetUser());
    const [event, setEvent] = useState({});
    const [tickets, setTickets] = useState([]);
    const [totalTickets, setTotalTickets] = useState(0);
    const [promotionInfos, setPromotionInfos] = useState([]);
    const [selectedPromotion, setSelectedPromotion] = useState({
        promotionId: -1,
        reduction: 0
    });
    const [order, setOrder] = useState({
        price: 0,
        createdBy: currentUser?.userName || '',
        eventId: eventId,
        dateCreatedAt: format(new Date(), 'yyyy-MM-dd'),
        timeCreatedAt: format(new Date(), 'HH:mm:ss'),
        status: "PENDING",
        promotionId: -1
    });
    const [isReadyForContinue, setIsReadyForContinue] = useState(false);

    useEffect(() => {
        if(!currentUser || !currentUser.roles?.find(role => role === "USER")) {
            sessionStorage.setItem('redirectAfterLogin', `/booking/${eventId}/select-ticket`);
            navigate("/signin", { replace: true });
            return;
        }
        console.log("first use Effect");
        const fetchEvent = async () => {
            const data = await GetEventWithTicketsByIdApi(eventId);
            setEvent(data.event);
            setTickets(data.tickets.map(ticket => ({...ticket, qtyInOrder: 0})));
        }
        fetchEvent();
    }, [eventId,navigate,currentUser]);
    
    useEffect(() => {
        setOrder((prev) => (
            {...prev, price: tickets.reduce((total, ticket) =>
                 total + ticket.price * ticket.qtyInOrder, 0)}));
        setTotalTickets(tickets.reduce((total, ticket) => total + ticket.qtyInOrder, 0));
    }, [tickets]);
    useEffect(() => {
        const fetchPromotionInfos = async () => {
            const response = await GetPromotionInfosOfEvent(eventId, order.price);
            console.log(response);
            setPromotionInfos(response.promotions);
        }
        fetchPromotionInfos();
        setSelectedPromotion({
            promotionId: -1,
            reduction: 0
        });
    }, [eventId,order]);
    useEffect(() => {
        const createOrder = async () => {
            if(isReadyForContinue){
                const ticketsOfOrder =  tickets.filter(ticket => ticket.qtyInOrder > 0).map(ticket => ({ticketId: ticket.id, quantity: ticket.qtyInOrder}));
                const finalOrder ={
                    ...order,
                    promotionId: selectedPromotion.promotionId
                }
                const createOrderRequest = {
                    order: finalOrder,
                    ticketOfOrders: ticketsOfOrder
                };

                console.log(createOrderRequest);

                const createOrderResponse = await CreateOrderApi(createOrderRequest);
                if(createOrderResponse){
                    if(createOrderResponse.message === "success"){
                        navigate(`/booking/${eventId}/question-form/${createOrderResponse.orderId}`);
                    }
                    else{
                        alert("Error: " + createOrderResponse.message);
                        return;
                    }
                }
                else {
                    alert("Error: Can not create order");
                    return;
                }
            }
        }
        createOrder();
    }, [selectedPromotion,order,tickets,isReadyForContinue,eventId,navigate]);
    const HandleTicketQuantityChange = (ticketId, quantity) => {
        setTickets((prev) =>{
            if(prev.some(ticket => ticket.id === ticketId))
            {
                return prev.map((ticket) => ticket.id === ticketId ? {...ticket, qtyInOrder: quantity} : ticket);
            }
            return [...prev, {id: ticketId, qtyInOrder: quantity}];
        })
    };
    const HandleBack = () => {
        window.history.back();
    }
    const HandleContinue = async () => {
        setIsReadyForContinue(true);
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <ThemeToggle />
            
            <div className="flex flex-col lg:flex-row min-h-screen">
                {/* Left Section - Ticket Selection */}
                <div className="flex-1 bg-white dark:bg-gray-800 p-6 lg:p-8">
                    <div className="flex items-center justify-between mb-8">
                        <button 
                            onClick={HandleBack} 
                            className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="font-medium">Back</span>
                        </button>

                        <h1 className="text-2xl lg:text-3xl font-bold text-primary-600 dark:text-primary-400">
                            Select Tickets
                        </h1>

                        {/* Empty div để cân bằng layout */}
                        <div className="w-20"></div>
                    </div>

                    <div className="space-y-6 max-w-3xl mx-auto">
                        {tickets.map(ticket => ( 
                            <div key={ticket.id} className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600">
                                <h2 className="text-xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                                    {ticket.name}
                                </h2>
                                
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                                    <div className="text-2xl font-bold text-secondary-700 dark:text-white">
                                        {ticket.price.toLocaleString('vi-VN')} đ
                                    </div>
                                    
                                    <div className="flex items-center bg-white dark:bg-gray-600 rounded-lg border border-gray-300 dark:border-gray-500 overflow-hidden">
                                        <button
                                            className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-500 hover:bg-gray-200 dark:hover:bg-gray-400 text-primary-600 dark:text-primary-400 font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                            disabled={ticket.qtyInOrder === 0} 
                                            onClick={() => HandleTicketQuantityChange(ticket.id, ticket.qtyInOrder - 1)}
                                        >
                                            −
                                        </button>
                                        <span className="w-16 h-12 flex items-center justify-center bg-white dark:bg-gray-600 text-secondary-700 dark:text-white font-bold text-lg">
                                            {ticket.qtyInOrder}
                                        </span>
                                        <button
                                            className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-500 hover:bg-gray-200 dark:hover:bg-gray-400 text-primary-600 dark:text-primary-400 font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                            disabled={ticket.qtyInOrder >= ticket.maxQtyInOrder}
                                            onClick={() => HandleTicketQuantityChange(ticket.id, ticket.qtyInOrder + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="bg-secondary-100 dark:bg-gray-600 p-4 rounded-lg flex items-center">
                                    <svg className="w-5 h-5 mr-3 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-secondary-700 dark:text-gray-200">{ticket.service}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Section - Order Summary */}
                <div className="lg:w-96 bg-secondary-50 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
                    <div className="p-6 lg:p-8 flex-1">
                        <h2 className="text-2xl font-bold text-secondary-700 dark:text-white mb-6">
                            {event.name}
                        </h2>
                        
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center text-secondary-600 dark:text-gray-300">
                                <svg className="w-5 h-5 mr-3 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>{event.time} - {event.date}</span>
                            </div>
                            <div className="flex items-center text-secondary-600 dark:text-gray-300">
                                <svg className="w-5 h-5 mr-3 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{event.location}</span>
                            </div>
                        </div>

                        {/* Pricing Section */}
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-secondary-700 dark:text-white mb-4">Order Summary</h3>
                            <div className="space-y-2">
                                {tickets.filter(ticket => ticket.qtyInOrder > 0).map(ticket => (
                                    <div key={`pricing-${ticket.id}`} className="flex justify-between items-center py-2">
                                        <span className="text-secondary-600 dark:text-gray-300">
                                            {ticket.name} × {ticket.qtyInOrder}
                                        </span>
                                        <span className="font-semibold text-primary-600 dark:text-primary-400">
                                            {(ticket.qtyInOrder * ticket.price).toLocaleString('vi-VN')} đ
                                        </span>
                                    </div>
                                ))}
                                {tickets.filter(ticket => ticket.qtyInOrder > 0).length === 0 && (
                                    <div className="text-center py-4 text-secondary-500 dark:text-gray-400">
                                        No tickets selected
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Promotion Section */}
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-secondary-700 dark:text-white mb-4">Promotions</h3>
                            <div className="space-y-3">
                                {promotionInfos?.map(promotionInfo => (
                                    <div key={promotionInfo.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                                        <label className="flex items-center cursor-pointer">
                                            <input 
                                                disabled={promotionInfo.reduction === 0}
                                                checked={selectedPromotion.promotionId === promotionInfo.id}
                                                onChange={() => setSelectedPromotion({promotionId: promotionInfo.id, reduction: promotionInfo.reduction})}
                                                type="radio" 
                                                name="promotion"
                                                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <span className="ml-3 text-secondary-700 dark:text-white font-medium">
                                                {promotionInfo.type}
                                            </span>
                                        </label>
                                        <span className="font-bold text-primary-600 dark:text-primary-400">
                                            -{promotionInfo.reduction.toLocaleString('vi-VN')} đ
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center text-secondary-700 dark:text-white">
                                <svg className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                </svg>
                                <span className="font-medium">× {totalTickets} tickets</span>
                            </div>
                        </div>

                        <button 
                            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl flex items-center justify-between transition-colors duration-200 shadow-lg hover:shadow-xl"
                            disabled={order.price === 0} 
                            onClick={HandleContinue}
                        >
                            <span>Continue</span>
                            <div className="flex items-center">
                                <span className="mr-2">
                                    {(order.price - selectedPromotion.reduction).toLocaleString('vi-VN')} đ
                                </span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SelectTicket;