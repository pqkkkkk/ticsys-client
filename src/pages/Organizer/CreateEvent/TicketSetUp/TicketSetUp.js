import React, { useEffect } from "react";
import styles from "./TicketSetUp.module.css"
import { useState } from "react";
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
    },[isAddingTicket]);
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
    },[isEditingTicket]);

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
        <div className={styles["ticket-setup-container"]}>
            <div className={styles["ticket-list"]}>
                {ticketsData.map((ticket) =>(
                <div className={styles["ticket-item"]}>
                    <i class="fas fa-bars"></i>
                    <i class="fas fa-ticket-alt"></i>
                    <span>{ticket.name}</span>
                    <button onClick={() =>{
                        setSelectedTicket(ticket);
                        setIsAddTicketModalOpen(true);
                        setIsEditingTicket(-1);
                        }}><i class="fas fa-pen"></i></button>
                    <button class="delete"><i class="fas fa-trash"></i></button>
                </div>))}
            </div>
            <div className={styles["add-ticket"]}>
                <i class="fas fa-plus-circle" onClick={() => {
                    setIsAddingTicket(-1);
                    HandleOpenAddTicketModal()}}></i> Add another ticket type
            </div>
            
            {isAddTicketModalOpen && 
                <div className={styles["overlay"]}>
                    <div className={styles["add-ticket-modal"]}>
                        <div className={styles["header"]}>
                            <h2>Add another ticket type</h2>
                            <button onClick={HandleCloseAddTicketModal}>&times;</button>
                        </div>
                        <form>
                            <div className={styles["form-group"]}>
                                <label for="ticket-name">* Ticket name</label>
                                <div className={styles["input-group"]}>
                                    <input 
                                        value={selectedTicket.name}
                                        onChange={(e) => HandleSelectedTicketChange("name", e.target.value)}
                                        type="text" id="ticket-name"/>
                                    <span>0 / 50</span>
                                </div>
                            </div>
                            <div className={styles["form-group"]}>
                                <div clasName={styles["form-group"]}>
                                    <label for="price">* Price</label>
                                    <input 
                                        value={selectedTicket.price}
                                        onChange={(e) => HandleSelectedTicketChange("price", e.target.value)}
                                        type="text" id="price"/>
                                </div>
                                <div className={styles["form-group"]}>
                                    <label for="total-tickets">* Total number of ticket</label>
                                    <input 
                                        value={selectedTicket.quantity}
                                        onChange={(e) => HandleSelectedTicketChange("quantity", e.target.value)}
                                        type="text" id="total-tickets"/>
                                </div>
                                <div className={styles["form-group"]}>
                                    <label for="min-tickets">* Minimum number of tickets for one purchase</label>
                                    <input 
                                        value={selectedTicket.minQtyInOrder}
                                        onChange={(e) => HandleSelectedTicketChange("minQtyInOrder", e.target.value)}
                                        type="text" id="min-tickets"/>
                                </div>
                                <div className={styles["form-group"]}>
                                    <label for="max-tickets">* Maximum number of tickets for one purchase</label>
                                    <input 
                                        value={selectedTicket.maxQtyInOrder}
                                        onChange={(e) => HandleSelectedTicketChange("maxQtyInOrder", e.target.value)}
                                        type="text" id="max-tickets"/>
                                </div>
                            </div>

                            <div className={styles["form-group"]}>
                                <label for="description">Ticket description</label>
                                <textarea 
                                    value={selectedTicket.service}
                                    onChange={(e) => HandleSelectedTicketChange("service", e.target.value)}
                                    id="description" rows="4" placeholder="Description"></textarea>
                                <div className={styles["text-right text-gray-400 text-sm"]}>0 / 1000</div>
                            </div>
                            <div className={styles["text-center"]}>
                                {isAddingTicket === -1 &&<button
                                    onClick={(e) => HandleAddTicket(e)}
                                    type="submit" className={styles["btn"]}>Add</button>}
                                {isEditingTicket === -1 &&<button
                                    onClick={(e) => HandleEditSelectedTicket(e)}
                                    type="submit" className={styles["btn"]}>Save</button>}
                            </div>
                        </form>
                </div>
                </div>}
        </div>
    );
}

export default TicketSetUp;