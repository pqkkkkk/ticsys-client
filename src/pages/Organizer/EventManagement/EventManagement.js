import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import styles from "./EventManagement.module.css";
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
        <div className={styles["event-management"]}>
            <div className={styles["sidebar"]}>
                <div className={styles["logo"]}>
                    <img src="https://storage.googleapis.com/a1aa/image/egUqrJYZmIVz_juYqi8JRwIOMzTOPPBmL-fKEcOq9Sc.jpg"  alt="Logo"/>
                    <span>Organizer Center</span>
                </div>
                <a onClick={HandleReturnOrganizerDashboard}><i class="fas fa-arrow-left"></i> Organizer Dashboard</a>
                <div>
                    <h2>Report</h2>
                    <Link className={activeItem === "Summary" ? styles["active"] : ""}
                        onClick={() => setActiveItem("Summary")}
                        to={`/organizer/myevents/${eventId}/summary`}><i class="fas fa-chart-pie"></i> Summary</Link>
                    <a href="#"><i class="fas fa-bullhorn"></i> Analysis</a>
                    <Link
                        className={activeItem === "OrderList" ? styles["active"] : ""}
                        onClick={() => setActiveItem("OrderList")} 
                        to={`/organizer/myevents/${eventId}/order-list`}><i class="fas fa-list"></i> Order List</Link>
                </div>
                <div>
                    <h2>Event setting</h2>
                    <a href="#"><i class="fas fa-user"></i> Co-member</a>
                    <a href="#"><i class="fas fa-edit"></i> Edit </a>
                    <a href="#"><i class="fas fa-map-marker-alt"></i> SeatMap</a>
                </div>
                <div>
                    <h2>Marketing</h2>
                    <Link
                        className={activeItem === "Promotion" ? styles["active"] : ""}
                        onClick={() => setActiveItem("Promotion")} 
                        to={`/organizer/myevents/${eventId}/voucher`}><i class="fas fa-cog"></i> Promotion</Link>
                </div>
            </div>
            <div className={styles["content-field"]}>
                <div className={styles["title"]}>
                    <h1>{event?.event?.name}</h1>
                    <div className={styles["divider"]}></div>
                </div>
                <div className={styles["main-content"]}>
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