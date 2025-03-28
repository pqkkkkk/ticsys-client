import React from "react";
import EventInfo from "./EventInfo/EventInfo";
import { format } from "date-fns";
import styles from "./CreateEvent.module.css"
import TicketSetUp from "./TicketSetUp/TicketSetUp";
import { useState } from "react";
import { CreateEventApi } from "../../../services/api/EventApi";
import { Box, LinearProgress } from "@mui/material";
import {useNavigate} from "react-router-dom";
function CreateEvent(){
    const navigate = useNavigate();
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
        <div className={styles["create-event"]}>
            <div className={styles["step-container"]}>
                <div className={styles["steps"]}>
                    <div className={styles["step"]}>
                        <div className={currentStep === 1 ? `${styles["circle"]} ${styles["circle-active"]}` : styles["circle"]}>1</div>
                        <span>Event information</span>
                    </div>
                    <div className={styles["step"]}>
                    <div className={currentStep === 2 ? `${styles["circle"]} ${styles["circle-active"]}` : styles["circle"]}>2</div>
                        <span>Ticket</span>
                    </div>
                </div>
                <div className={styles["buttons"]}>
                    {currentStep !== 1 && <button onClick={HandleBackClick} className={styles["continue"]}>Back</button>}
                    {currentStep !== 2 && <button onClick={HandleContinueClick} className={styles["continue"]}>Continue</button>}
                    {currentStep !== 1 && <button onClick={HandleCreateEvent} className={styles["continue"]}>Create</button>}
                </div>
            </div>
             {creatWaiting && <Box sx={{ width: '100%' }}>
                <LinearProgress/>
            </Box>}
            <div className={styles["create-event-main-content"]}>
                {currentStep === 1 && <EventInfo event={eventData}
                    HandleEventDataChange={HandleEventDataChange} />}
                {currentStep === 2 && <TicketSetUp tickets={ticketsData}
                    HandleTicketsDataChange={HandleTicketsDataChange}
                    HandleFieldOfTicketInTicketsDataChange={HandleFieldOfTicketInTicketsDataChange} />}
            </div>
        </div>
    );
}

export default CreateEvent;