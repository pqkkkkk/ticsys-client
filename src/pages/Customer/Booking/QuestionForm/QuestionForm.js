import React from "react";
import styles from "./QuestionForm.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetEventByIdApi } from "../../../../services/api/EventApi";
import { GetOrderByIdWithDetailOrderAndTicketAndPromotionApi } from "../../../../services/api/OrderApi";
import { GetUser } from "../../../../services/UserStorageService";

function QuestionForm() {
    const navigate = useNavigate();
    const {eventId, orderId} = useParams();
    const currentUser = GetUser();

    const [event, setEvent] = useState({});
    const [order, setOrder] = useState({});
    const [ticketOfOrders, setTicketOfOrders] = useState([]);
    const [ticketInfos, setTicketInfos] = useState([]);
    const [totalTickets, setTotalTickets] = useState(0);
    const [promotionInfo, setPromotionInfo] = useState({});
    useEffect(() => {
        const fetchEvent = async () => {
            const [eventData, orderData] = await Promise.all([GetEventByIdApi(eventId),
                                            GetOrderByIdWithDetailOrderAndTicketAndPromotionApi(orderId)]);
            
            if(orderData.order.status === "PAID") {
                navigate("/error");
            }

            setOrder(orderData.order);
            setTicketOfOrders(orderData.ticketOfOrders);
            setTicketInfos(orderData.ticketInfos);
            setPromotionInfo(orderData.promotionInfo);
            setEvent(eventData);
        }
        fetchEvent();
    }, [eventId]);
    useEffect(() => {
        setTotalTickets(ticketOfOrders.reduce((total, ticketOfOrder) => total + ticketOfOrder.quantity, 0));
    }, [ticketOfOrders]);
    const HandleContinue = () => {
        navigate(`/booking/${eventId}/payment-info/${orderId}`);
    };

    return(
    <div className={styles["main"]}>
        <div className={styles["step-container"]}>
            <div className={styles["step"]}>
                <div className={styles["circle"] + " " + styles["completed"]}>
                    <i class="fas fa-check"></i>
                </div>
                <div className={styles["text"] + " " + styles["completed"]}>Select Ticket</div>
            </div>
            <div className={styles["divider"]}></div>
            <div className={styles["step"]}>
                <div className={styles["circle"] + " " + styles["active"]}>
                    <div className={styles["inner-circle"]}></div>
                </div>
                <div className={styles["text"] + " " + styles["active"]}>Question Form</div>
            </div>
            <div className={styles["divider"]}></div>
            <div className={styles["step"]}>
                <div className={styles["circle"] + " " + styles["inactive"]}></div>
                <div className={styles["text"] + " " + styles["inactive"]}>Payment Info</div>
            </div>
        </div>
        <div className={styles["header"]}>
        <div className={styles["container"]}>
            <div>
                <h1>{event?.event?.name}</h1>
                <div className={styles["info"]}>
                    <div><i class="fas fa-map-marker-alt"></i>{event?.event?.location}</div>
                    <div><i class="fas fa-calendar-alt"></i>{event?.event?.time} - {event?.event?.date}</div>
                </div>
            </div>
            <div className={styles["timer"]}>
                <div>Complete your booking within</div>
                <div className={styles["time"]}>14 : 50</div>
            </div>
        </div>
    </div>
    <div className={styles["container"]}>
        <div className={styles["main-content"]}>
            <div className={styles["form-section"]}>
                <h2>QUESTION FORM</h2>
                <form>
                    <h3>Other information</h3>
                    <div className={styles["form-group"]}>
                        <label htmlFor="full-name">* Họ & tên / Full name</label>
                        <input
                            value={currentUser ? currentUser.fullName : ""}
                             type="text" id="full-name" placeholder="Enter your answer"/>
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="phone">* Số điện thoại</label>
                        <input
                            value={currentUser ? currentUser.phoneNumber : ""} 
                            type="text" id="phone" placeholder="Enter your answer"/>
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="email">* Email</label>
                        <input
                            value={currentUser ? currentUser.email : ""} 
                            type="email" id="email" placeholder="Enter your answer"/>
                    </div>
                </form>
            </div>
            <div className={styles["ticket-section"]}>
                <h3>Ticket information</h3>
                <div className={styles["ticket-info"]}>
                    <h3>Ticket type</h3>
                    <h3>Quantity</h3>
                </div>
                {ticketOfOrders.map((ticketOfOrder, index) => (
                    <div className={styles["ticket-info-container"]}>
                        <div className={styles["ticket-info"]}>
                            <span>{ticketInfos.at(index).name}</span>
                            <span>{ticketOfOrder.quantity}</span>
                        </div>
                        <div className={styles["ticket-info"]}>
                            <span>{ticketInfos.at(index).price?.toLocaleString('vi-VN')} đ</span>
                            <span>{(ticketInfos.at(index).price * ticketOfOrder.quantity).toLocaleString('vi-VN')} đ</span>
                        </div>
                        <div className={styles["ticket-info-divider"]}></div>
                    </div>
                ))}
                <div className={styles["actual-price"]}>
                    <span>Actual Price</span>
                    <span className={styles["amount"]}> {promotionInfo ?  (order.price + promotionInfo.reduction).toLocaleString('vi-VN') : order.price.toLocaleString('vi-VN')} đ</span>
                </div>
                {promotionInfo?.type === "Flash Sale" && <div className={styles["promotion-info"]}>
                    <span>Promotion</span>
                    <span className={styles["amount"]}> - {promotionInfo.reduction.toLocaleString('vi-VN')} đ</span>
                </div> }
                {promotionInfo?.type === "Voucher Gift" &&  <div className={styles["promotion-info"]}>
                    <span>Promotion</span>
                    <span className={styles["amount"]}> Voucher {promotionInfo.voucherValue.toLocaleString('vi-VN')} đ</span>
                </div> }
                <div className={styles["subtotal"]}>
                    <span>Subtotal {totalTickets} ticket</span>
                    <span className={styles["amount"]}>{order?.price?.toLocaleString('vi-VN')} đ</span>
                </div>
                <p className={styles["required-message"]}>Please answer all questions to continue</p>
                <button onClick={HandleContinue} className={styles["continue-btn"]}>Continue <i class="fas fa-arrow-right"></i></button>
                <div className={styles["reselect"]}>
                    <a href="#">Reselect Ticket</a>
                </div>
            </div>
        </div>
    </div>
    </div>
    );
}

export default QuestionForm;