import React from "react";
import styles from "./OrderList.module.css";
import { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import { GetOrdersOfEventWithDetailOrderAndTicketAndUserInfoApi,GetOrdersOfEventWithDetailOrderAndTicketAndUserInfoBySearchApi } from "../../../../services/api/OrderApi";
function OrderList(){
    const {eventId} = useParams();

    const [orders, setOrders] = useState([]);
    const [userFullNameKeyword, setUserFullNameKeyword] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    useEffect(() =>{
        const fetchOrders = async () =>{
           try{
                const response = await GetOrdersOfEventWithDetailOrderAndTicketAndUserInfoBySearchApi(eventId,"");
                setOrders(response.orderDtos);
           }
              catch(error){
                console.log("Failed to fetch orders: ", error);
              }
        };

        fetchOrders();
    }, [eventId]);
    useEffect(() =>{
        if(isSearching){
            const fetchOrders = async () =>{
                try{
                        const response = await GetOrdersOfEventWithDetailOrderAndTicketAndUserInfoBySearchApi(eventId,userFullNameKeyword);
                        setOrders(response.orderDtos);
                }
                catch(error){
                    console.log("Failed to fetch orders: ", error);
                }
            };
            fetchOrders();
            setIsSearching(false);
        }
    },[isSearching,userFullNameKeyword,eventId]);
    const HandleSearch = async () =>{
        setIsSearching(true);
    }
    return(
        <div className={styles["order-list-container"]}>
            <div className={styles["search-input"]}>
                <input
                    value={userFullNameKeyword}
                    onChange={(e) => setUserFullNameKeyword(e.target.value)} 
                    type="text" placeholder="Search by name..."/>
                <button
                    onClick={HandleSearch}><i className="fas fa-search"></i></button>
            </div>
            <div className={styles["header"]}>
                <input type="checkbox"/>
                <div className={styles["order-title"]}>9 ORDERs</div>
                <div className={styles["quantity-title"]}>QTY</div>
                <div className={styles["total-title"]}>TOTAL 0</div>
            </div>
            <ul className={styles["order-list"]}>
                {orders?.map((order) => (
                    <li className={styles["order-item"]}>
                        <input type="checkbox"/>
                        <div className={styles["order-info"]}>
                            <i class="fas fa-check-circle"></i>
                            <div className={styles["details"]}>
                                <div className={styles["name"]}>{order.userInfos.fullName}</div>
                                <div className={styles["email"]}>{order.userInfos.email}</div>
                                <div className={styles["phone"]}>{order.userInfos.phoneNumber}</div>
                                <div className={styles["date"]}>Order at <span>{order.order.dateCreatedAt} - {order.order.timeCreatedAt}</span></div>
                            </div>
                        </div>
                        <div className={styles["quantity"]}>2</div>
                        <div className={styles["price"]}>{order?.order?.price?.toLocaleString('vi-VN')} đ</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OrderList;