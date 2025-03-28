import React from 'react';
import styles from './MyEventList.module.css';
import { GetEventsByOrganizerIdApi } from "../../../services/api/EventApi";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { GetUser } from '../../../services/UserStorageService';
function MyEventList() {
    
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [currentUser, setCurrentUser] = useState(GetUser());

     useEffect(() => {
            if(!currentUser || currentUser.roles.find(role => role === "ORGANIZER") === undefined){
                navigate("/error");
            }
            const FetchEvents = async () => {
                const response = await GetEventsByOrganizerIdApi(currentUser.userName);
                if(response){
                    console.log(response.eventDtos);
                    setEvents(response.eventDtos);
                }
            }
            FetchEvents();
    },[currentUser,navigate]);
    
    const HanleNavigateToEventManagement = (eventId) => {
        navigate(`/organizer/myevents/${eventId}`);
    }
    return (
        <div className={styles["main-content"]}>
            <div className={styles["title"]}>
                <h1>My Event</h1>
                <div className={styles["divider"]}></div>
            </div>
            <div className={styles["search-bar-and-filter"]}>
                <div className={styles["search-bar"]}>
                    <input type="text" placeholder="Tìm kiếm sự kiện"/>
                    <button>Tìm kiếm</button>
                </div>
                <div className={styles["filter"]}>
                    <button>Sắp tới</button>
                    <button>Đã qua</button>
                    <button>Chờ duyệt</button>
                    <button className={styles["green"]}>Nháp</button>
                </div>
            </div>
            <div className={styles["event-list"]}>
                {events.map((event) => (
                <div className={styles["event-item"]} onClick={() => HanleNavigateToEventManagement(event.event.id)}>
                    <div className={styles["event-header"]}>
                        <img src={event.event.bannerPath} alt="Event Image" width="100" height="60"/>
                        <div>
                            <h2>{event.event.name}</h2>
                            <p><i className="fas fa-calendar"></i> {event.event.time} - {event.event.date}</p>
                            <p><i className="fas fa-map-marker-alt"></i> {event.event.location}</p>
                        </div>
                    </div>
                    <div className={styles["divider"]}></div>
                    <div className={styles["event-footer"]}>
                        <div className={styles["event-footer-item"]}>
                            <i className="fas fa-sync-alt"></i>
                            <p> Overview</p>
                        </div>
                        <div className={styles["event-footer-item"]}>
                            <i className="fas fa-receipt"></i>
                            <p> Order</p>
                        </div>
                        <div className={styles["event-footer-item"]}>
                            <i className="fas fa-edit"></i>
                            <p> Edit</p>
                        </div>
                        <div className={styles["event-footer-item"]}>
                        <i className="fas fa-chair"></i>
                            <p> Ticket</p>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}

export default MyEventList;