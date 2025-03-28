import React from "react";
import styles from "./Voucher.module.css";
import {useNavigate, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import { GetPromotionsOfEvent, GetPromotionsOfEventWithOrderCount } from "../../../../services/api/PromotionApi";

function Voucher() {
    const navigate = useNavigate();
    const {eventId} = useParams();

    const [promotions, setPromotions] = useState([]);
    const [selectedPromotion, setSelectedPromotion] = useState(null);
    const [isOpenStatasticModal, setIsOpenStatasticModal] = useState(false);

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const data = await GetPromotionsOfEventWithOrderCount(eventId);
                setPromotions(data.promotions);
            } catch (err) {
                console.error(err);
            }
        };
        fetchPromotions();
    }, [eventId]);

    const HandleNavigateToCreateVoucher = () => {
        navigate(`/organizer/myevents/${eventId}/create-voucher`);
    };
    const HandleNavigateToEditVoucher = (promotionId) => {
        navigate(`/organizer/myevents/${eventId}/edit-voucher/${promotionId}`);
    }
    const HandleOpenStatasticModal = (promotion) => {
        setIsOpenStatasticModal(true);
        setSelectedPromotion(promotion);
    }
    const HandleCloseStatasticModal = () => {
        setIsOpenStatasticModal(false);
        setSelectedPromotion(null);
    }
    return (
        <div className={styles["container"]}>
            <div className={styles["search-bar"]}>
                <div className={styles["search-input"]}>
                    <input type="text" placeholder="Tìm kiếm theo tên chương trình và mã voucher"/>
                    <button><i className="fas fa-search"></i></button>
                </div>
                <button
                    onClick={HandleNavigateToCreateVoucher}  
                    className={styles["create-voucher"]}>Tạo voucher</button>
            </div>
            <div className={styles["table-container"]}>
                <table>
                    <thead>
                        <tr>
                            <th>Promotion Type</th>
                            <th>Reduced Rate (%)</th>
                            <th>Voucher value</th>
                            <th>Minimum price to apply</th>
                            <th>Duration time</th>
                            <th>Status<i class="fas fa-info-circle"></i></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {promotions.map((promotion) => (
                            <tr onClick={() => HandleOpenStatasticModal(promotion)}>
                                <td>
                                    <div className={styles["flex"]}>
                                        <i class="fas fa-plus-circle"></i>
                                        <div className={styles["ml-4"]}>{promotion.type}</div>
                                    </div>
                                </td>
                                <td>{promotion.promoPercent}</td>
                                <td>{promotion.voucherValue.toLocaleString('vi-VN')} đ</td>
                                <td>{promotion.minPriceToReach.toLocaleString('vi-VN')} đ</td>
                                <td>
                                    <div>
                                        <span className={styles["bg-green-100"]}>In progress</span>
                                        <div>{promotion.startDate} to {promotion.endDate}</div>
                                    </div>
                                </td>
                                <td>
                                    <input type="checkbox" className={styles["toggle-checkbox"]} checked/>
                                </td>
                                <td>
                                    <div className={styles["action-buttons"]}>
                                        <button
                                            onClick={() => HandleNavigateToEditVoucher(promotion.id)} 
                                            className={styles["text-green-600"]}><i class="fas fa-edit"></i></button>
                                        <button className={styles["text-green-600"]}><i class="fas fa-sync-alt"></i></button>
                                        <button className={styles["text-green-600"]}><i class="fas fa-trash"></i></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isOpenStatasticModal && 
                <div className={styles["overlay"]}>
                    <div className={styles["statastic-modal"]}>
                        <div className={styles["header"]}>
                            <button onClick={HandleCloseStatasticModal}>&times;</button>
                        </div>
                        <div className={styles["grid"]}>
                            <div className={styles["card"]}>
                                <p className={styles["title"]}>Tổng số đơn hàng được áp dụng</p>
                                <p className={styles["value"]}>Không giới hạn</p>
                            </div>
                            <div className={styles["card"]}>
                                <p className={styles["title"]}>Tổng số đơn hàng đã dùng</p>
                                <p className={styles["value"]}>{selectedPromotion.orderCount}</p>
                            </div>
                        </div>
                        <div className={styles["table-container"]}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Suất diễn</th>
                                            <th>Số vé đã dùng</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>27/02/2025 17:00</td>
                                            <td>0</td>
                                            <td><button className={styles["button"]}>Xem chi tiết</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                    </div>
                </div>
                }   
        </div>
    );
}

export default Voucher;