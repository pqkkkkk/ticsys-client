import React, { useEffect, useState } from "react";
function TicketSetUp({tickets, HandleTicketsDataChange, HandleFieldOfTicketInTicketsDataChange}){
    const [ticketsData, setTicketsData] = useState(tickets);
    const [selectedTicket, setSelectedTicket] = useState({
        name: "",
        price: "",
        quantity: 0,
        service: "",
        minQtyInOrder: 0,
        maxQtyInOrder: 0,
    });
    const [isAddTicketModalOpen, setIsAddTicketModalOpen] = useState(false);
    const [isAddingTicket, setIsAddingTicket] = useState(0);
    const [isEditingTicket, setIsEditingTicket] = useState(0);

    useEffect(() =>{
        if(isAddingTicket === 1)
        {
            console.log("useEffect isAddingTicket");
            setTicketsData((prev) =>{
                 if(prev.some(ticket => ticket.name === selectedTicket.name)){
                    alert("Ticket name already exists");
                    return prev;
                 }
                 return [...prev, selectedTicket];
            });
            console.log("after setTicketsData");
            HandleTicketsDataChange(selectedTicket);
            HandleCloseAddTicketModal();
        }
    },[isAddingTicket, selectedTicket, HandleTicketsDataChange]);
    useEffect(() =>{
        if(isEditingTicket === 1)
        {
            setTicketsData((prev) => {
                if(prev.some(ticket => ticket.name === selectedTicket.name))
                {
                    alert("Ticket name already exists");
                    return prev;
                }
                return prev.map((ticket) => ticket.name === selectedTicket.name ? selectedTicket : ticket)
            });
            
            HandleFieldOfTicketInTicketsDataChange(selectedTicket);
            HandleCloseAddTicketModal();
        }
    },[isEditingTicket, selectedTicket, HandleFieldOfTicketInTicketsDataChange]);

    const HandleAddTicket = (e) =>{
        e.preventDefault();
        if(!selectedTicket.name || !selectedTicket.price || !selectedTicket.quantity || !selectedTicket.service || !selectedTicket.minQtyInOrder || !selectedTicket.maxQtyInOrder)
        {
            alert("Please fill all fields");
            return;
        }
        setIsAddingTicket(1);
    }
    const HandleEditSelectedTicket = (e) =>{
        e.preventDefault();
        if(!selectedTicket.name || !selectedTicket.price || !selectedTicket.quantity || !selectedTicket.service || !selectedTicket.minQtyInOrder || !selectedTicket.maxQtyInOrder)
            {
                alert("Please fill all fields");
                return;
            }
        setIsEditingTicket(1);
    };
    const HandleSelectedTicketChange = (key, value) =>{
        setSelectedTicket((prev) =>({
            ...prev,
            [key]: value
        }))
    };
    const HandleCloseAddTicketModal = () =>{
        setIsAddTicketModalOpen(false);
        setSelectedTicket({
            name: "",
            price: "",
            quantity: 0,
            service: "",
            minQtyInOrder: 0,
            maxQtyInOrder: 0,
        });
        setIsAddingTicket(0);
        setIsEditingTicket(0);
    }
    const HandleOpenAddTicketModal = () =>{
        setIsAddTicketModalOpen(true);
    }

    return(
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-secondary-700 dark:text-white mb-2">
                    Ticket Setup
                </h2>
                <p className="text-secondary-600 dark:text-gray-300">
                    Configure your event ticket types and pricing
                </p>
            </div>

            {/* Ticket List */}
            <div className="space-y-3">
                {ticketsData.map((ticket, index) => (
                    <div key={index} className="flex items-center justify-between bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 text-gray-400 dark:text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a1 1 0 001 1h1a1 1 0 001-1V7a2 2 0 00-2-2H5zM5 14a2 2 0 00-2 2v3a1 1 0 001 1h1a1 1 0 001-1v-3a2 2 0 00-2-2H5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-medium text-secondary-700 dark:text-white">{ticket.name}</h3>
                                    <p className="text-sm text-secondary-600 dark:text-gray-300">
                                        ${ticket.price} • {ticket.quantity} available
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button 
                                onClick={() => {
                                    setSelectedTicket(ticket);
                                    setIsAddTicketModalOpen(true);
                                    setIsEditingTicket(-1);
                                }}
                                className="p-2 text-gray-400 hover:text-primary-600 dark:text-gray-500 dark:hover:text-primary-400 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Ticket Button */}
            <div 
                onClick={() => {
                    setIsAddingTicket(-1);
                    HandleOpenAddTicketModal();
                }}
                className="flex items-center justify-center space-x-3 p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary-400 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all group"
            >
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                    <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </div>
                <span className="text-secondary-600 dark:text-gray-300 font-medium">Add another ticket type</span>
            </div>

            {/* Modal */}
            {isAddTicketModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-secondary-700 dark:text-white">
                                {isEditingTicket === -1 ? 'Edit Ticket Type' : 'Add Ticket Type'}
                            </h2>
                            <button 
                                onClick={HandleCloseAddTicketModal}
                                className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Form */}
                        <div className="p-6 space-y-6">
                            <form className="space-y-6">
                                {/* Ticket Name */}
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 dark:text-white mb-2">
                                        Ticket Name *
                                    </label>
                                    <div className="relative">
                                        <input 
                                            value={selectedTicket.name}
                                            onChange={(e) => HandleSelectedTicketChange("name", e.target.value)}
                                            type="text" 
                                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-secondary-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            placeholder="Enter ticket name"
                                        />
                                        <div className="absolute right-3 top-3 text-xs text-gray-400 dark:text-gray-500">
                                            {selectedTicket.name.length} / 50
                                        </div>
                                    </div>
                                </div>

                                {/* Price and Quantity Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-secondary-700 dark:text-white mb-2">
                                            Price *
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-3 text-secondary-600 dark:text-gray-300">$</span>
                                            <input 
                                                value={selectedTicket.price}
                                                onChange={(e) => HandleSelectedTicketChange("price", e.target.value)}
                                                type="number" 
                                                className="w-full p-3 pl-8 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-secondary-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-secondary-700 dark:text-white mb-2">
                                            Total Tickets *
                                        </label>
                                        <input 
                                            value={selectedTicket.quantity}
                                            onChange={(e) => HandleSelectedTicketChange("quantity", e.target.value)}
                                            type="number" 
                                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-secondary-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>

                                {/* Min/Max Quantity Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-secondary-700 dark:text-white mb-2">
                                            Min Tickets per Order *
                                        </label>
                                        <input 
                                            value={selectedTicket.minQtyInOrder}
                                            onChange={(e) => HandleSelectedTicketChange("minQtyInOrder", e.target.value)}
                                            type="number" 
                                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-secondary-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            placeholder="1"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-secondary-700 dark:text-white mb-2">
                                            Max Tickets per Order *
                                        </label>
                                        <input 
                                            value={selectedTicket.maxQtyInOrder}
                                            onChange={(e) => HandleSelectedTicketChange("maxQtyInOrder", e.target.value)}
                                            type="number" 
                                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-secondary-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            placeholder="10"
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 dark:text-white mb-2">
                                        Ticket Description
                                    </label>
                                    <div className="relative">
                                        <textarea 
                                            value={selectedTicket.service}
                                            onChange={(e) => HandleSelectedTicketChange("service", e.target.value)}
                                            rows={4} 
                                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-secondary-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                                            placeholder="Describe what's included with this ticket..."
                                        />
                                        <div className="absolute right-3 bottom-3 text-xs text-gray-400 dark:text-gray-500">
                                            {selectedTicket.service.length} / 1000
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end space-x-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={HandleCloseAddTicketModal}
                                        className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-secondary-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    {isAddingTicket === -1 && (
                                        <button
                                            onClick={(e) => HandleAddTicket(e)}
                                            type="submit" 
                                            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                                        >
                                            Add Ticket
                                        </button>
                                    )}
                                    {isEditingTicket === -1 && (
                                        <button
                                            onClick={(e) => HandleEditSelectedTicket(e)}
                                            type="submit" 
                                            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                                        >
                                            Save Changes
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TicketSetUp;