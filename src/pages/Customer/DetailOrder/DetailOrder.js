import React from "react";
import styles from "./DetailOrder.module.css";
import { useParams,useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetOrderByIdWithDetailOrderAndTicketAndEventApi } from "../../../services/api/OrderApi";
import { GetUser } from "../../../services/UserStorageService";
function DetailOrder() {
    const navigate = useNavigate();
    const [user, setUser] = useState(GetUser());
    const { orderId } = useParams();
    const [order, setOrder] = useState({});
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalTickets, setTotalTickets] = useState(0);

    useEffect(() => {
        if(user === null || user.role !== "CUSTOMER") {
            navigate('/signin');
        }
    }
    , [navigate,user]);
    useEffect(() => {
        GetOrderByIdWithDetailOrderAndTicketAndEventApi(orderId).then((response) => {
            setOrder(response);
        }).catch((error) => {
            console.log(error);
        });
    }, [orderId]);
    useEffect(() => {
        console.log("use effect for order", order);
        let totalAmount = 0;
        let totalTickets = 0;
        order.ticketOfOrders?.forEach((ticketOfOrder, index) => {
            totalAmount += ticketOfOrder.quantity * order.ticketInfos.at(index).price;
            totalTickets += ticketOfOrder.quantity;
        });
        setTotalAmount(totalAmount);
        setTotalTickets(totalTickets);
    }, [order]);
    
    return (
        <div className={styles["container"]}>
            <div className={styles["ticket-header"]}>
                <h2>{order.event?.name}</h2>
                <img src={order.event?.bannerPath} alt="Banner vé" className={styles["banner"]}/>
                <div className={styles["ticket-info"]}>
                    <p><strong>Ngày: </strong>{order.event?.date} </p>
                    <p><strong>Địa điểm:</strong> {order.event?.location}</p>
                </div>
            </div>
            
            <div className={styles["order-section"]}>
                <h3>Order: {order.order?.id}</h3>
                <table className={styles["order-table"]}>
                    <tr>
                        <th>Order date</th>
                        <th>Payment method</th>
                        <th>Order status</th>
                    </tr>
                    <tr>
                        <td>{order.order?.dateCreatedAt}</td>
                        <td>Free</td>
                        <td>{order.order?.status}</td>
                    </tr>
                </table>
            </div>
            
            <div className={styles["buyer-info"]}>
                <h3>Buyer information</h3>
                <div className={styles["buyer-table"]}>
                    <tr>
                        <th>Name</th>
                        <td>{user?.fullName}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{user?.email}</td>
                    </tr>
                    <tr>
                        <th>Phone number</th>
                        <td>{user?.phoneNumber}</td>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <td>{user?.address}</td>
                    </tr>
                </div>
            </div>
            
            <div className={styles["order-details"]}>
                <h3>Order details</h3>
                <table className={styles["order-table"]}>
                    <tr>
                        <th>Ticket type</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                    </tr>
                    {order.ticketOfOrders && order.ticketOfOrders.map((ticketOfOrder, index) => (
                        <tr>
                            <td>{order.ticketInfos.at(index).name}</td>
                            <td>{ticketOfOrder.quantity}</td>
                            <td>{(ticketOfOrder.quantity * order.ticketInfos.at(index).price).toLocaleString('vi-VN')} đ</td>
                        </tr>
                    ))}
                </table>
                <p><strong>Total tickets: </strong> {totalTickets}</p>
                <p><strong>Total Amount:</strong> {totalAmount?.toLocaleString('vi-VN')} đ</p>
            </div>
        </div>
    );
}

export default DetailOrder;