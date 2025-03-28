import React from "react";
import styles from "./ManageOrder.module.css";
import { useEffect, useState } from "react";
import { GetOrdersWithDetailOrderAndTicketAndEventAndUserInfoApi } from "../../../services/api/OrderApi";

function ManageOrder() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await GetOrdersWithDetailOrderAndTicketAndEventAndUserInfoApi();
            console.log(response.orderDtos);
            setOrders(response?.orderDtos);
        };
        fetchOrders();
    }, []);
    const HandleSearch = async () =>{

    }
    return (
      <div className={styles["manage-order-container"]}>
        <div className={styles["main-header"]}>
                        <h1>Manage Orders</h1>
        </div>
        <div className={styles["search-input"]}>
            <input
                type="text" placeholder="Search by name..."/>
            <button
                onClick={HandleSearch}><i className="fas fa-search"></i></button>
        </div>
        <div className={styles["header"]}>
            <div className={styles["checkbox"]}><input type="checkbox"/></div>
            <div className={styles["order-title"]}>{orders?.length} ORDERs</div>
            <div className={styles["event-title"]}>Event</div>
            <div className={styles["order-detail-title"]}>Detail</div>
            <div className={styles["quantity-title"]}>QTY</div>
            <div className={styles["total-title"]}>TOTAL 0</div>
        </div>
        <ul className={styles["order-list"]}>
            {orders?.map((order) => (
            <li className={styles["order-item"]}>
                <div className={styles["checkbox"]}><input type="checkbox"/></div>
                <div className={styles["order-info"]}>
                    <i class="fas fa-check-circle"></i>
                    <div className={styles["details"]}>
                        <div className={styles["name"]}>{order.userInfos?.fullName}</div>
                        <div className={styles["email"]}>{order.userInfos?.email}</div>
                        <div className={styles["phone"]}>{order.userInfos?.phoneNumber}</div>
                        <div className={styles["date"]}>Order at <span>{order.order?.dateCreatedAt}</span></div>
                    </div>
                </div>
                <div className={styles["event-name"]}>{order.event?.name}</div>
                <div className={styles["order-detail"]}>
                    {order.ticketOfOrders?.map((ticketOfOrder,index) => (
                    <div className={styles["product-name"]}>{ticketOfOrder.quantity} {order.ticketInfos?.at(index).name}</div>
                    ))}
                </div>
                <div className={styles["quantity"]}>2</div>
                <div className={styles["price"]}>{order.order?.price?.toLocaleString('vi-VN')} đ</div>
            </li>
            ))}
        </ul>
      </div>
    );
}
export default ManageOrder;