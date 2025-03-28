import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetEventsApi } from "../../../services/api/EventApi";
import styles from "./CustomerDashboard.module.css";
import ArtificialParadise from "../../../assets/image/ArtificialParadise.jpg";
import RoadTripTo1900 from "../../../assets/image/RoadTripTo1900.png";
function CustomerDashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await GetEventsApi();
      setEvents(data?.eventDtos);
    };
    fetchEvents();
  }, []);

  const HandleClickEventCard = (eventId) => {
    navigate(`/${eventId}`);
  };

  return (
    <div>
    <div className={styles["type-bar"]}>
        <nav>
            <a href="#">Music</a>
            <a href="#">Theater & Art</a>
            <a href="#">Sport</a>
            <a href="#">Others</a>
        </nav>
    </div>

    <div className={styles["hero"]}>
        <img src={ArtificialParadise} alt="Event 1"/>
        <img src={RoadTripTo1900} alt="Event 2"/>
    </div>

    <section className={styles["top-picks-section"]}>
        <h2>Top Picks for You</h2>
        <div className={styles["top-picks"]}>
          {events?.map((event) =>(
            <div onClick={() => HandleClickEventCard(event.event.id)} className={styles["dashboard-event-card"]}>
                <img src={event.event.bannerPath} alt="Event 1"/>
                <p className={styles["event-name"]}>{event.event.name}</p>
                <p className={styles["event-time"]}>{event.event.date}  {event.event.time}</p>
                <p className={styles["event-price"]}>From {event.minPriceOfTicket.toLocaleString('vi-VN')} đ</p>
            </div>
          ))}
            
        </div>
    </section>
</div>
  );
}
export default CustomerDashboard;