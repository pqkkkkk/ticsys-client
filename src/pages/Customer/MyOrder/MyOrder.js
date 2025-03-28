import React from "react";
import styles from "./MyOrder.module.css";
import { useState, useEffect } from "react";
import { GetOrdersWithEventApi, GetOrdersWithEventOfUserApi } from "../../../services/api/OrderApi";
import { GetUser } from "../../../services/UserStorageService";
import { ConvertDateStringToDateWithMonthName } from "../../../utils/DateUtils";
import {useNavigate} from "react-router-dom";
function MyTicket() {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState(GetUser());
    useEffect(() => {
        if(!user)
        {
            navigate("/signin");
        }
        else{
            GetOrdersWithEventOfUserApi(user.userName).then((response) => {
                setOrders(response.orderDtos);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [user,navigate]);

    const HandleViewDetailOrder = (orderId) => {
        navigate(`/orders/${orderId}`);
    }

    return (
        <div className={styles["container"]}>
            <h1 className={styles["header"]}>My Tickets</h1>
            <div className={styles["tabs"]}>
                <div className={styles["tab"] + " " + styles["active"]}>All</div>
                <div className={styles["tab"] + " " + styles["inactive"]}>Finished</div>
                <div className={styles["tab"] + " " + styles["inactive"]}>Processing</div>
                <div className={styles["tab"] + " " + styles["inactive"]}>Cancelled</div>
            </div>
            <div className={styles["sub-tabs"]}>
                <div className={styles["sub-tab"] + " " + styles["active"]}>Upcoming</div>
                <div className={styles["sub-tab"] + " " + styles["inactive"]}>Past</div>
            </div>
            {orders.map((order) => (
                <div onClick={() => HandleViewDetailOrder(order.order.id)}
                    className={styles["ticket"]}>
                    <div className={styles["ticket-date"]}>
                        <p className={styles["day"]}>{ConvertDateStringToDateWithMonthName(order.event.date)[2]}</p>
                        <p className={styles["month"]}>{ConvertDateStringToDateWithMonthName(order.event.date)[1]}</p>
                        <p className={styles["year"]}>{ConvertDateStringToDateWithMonthName(order.event.date)[0]}</p>
                    </div>
                    <div className={styles["ticket-details"]}>
                        <h2>{order.event.name}</h2>
                        <div className={styles["status"]}>
                            <span>Finished</span>
                            <span>E-ticket</span>
                        </div>
                        <p><i class="fas fa-receipt"></i>Order code: {order.order.id}</p>
                        <p><i class="far fa-clock"></i> {order.event.time} - {order.event.date}</p>
                        <p><i class="fas fa-map-marker-alt"></i>{order.event.location}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MyTicket;