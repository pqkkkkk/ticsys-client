import React, { useEffect } from "react";
import styles from "./CreateVoucher.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CreatePromotion, UpdatePromotion } from "../../../../services/api/PromotionApi";
function CreateVoucher({initialPromotion}){
    const navigate = useNavigate();
    const [promotion, setPromotion] = useState({
        eventId:2,
        minPriceToReach: 0,
        promoPercent: 0,
        voucherValue:0,
        type: "Voucher Gift",
        startDate: "",
        endDate: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isReadyForAction, setIsReadyForAction] = useState(false);
    const [isValidPromotion, setIsValidPromotion] = useState(false);

    useEffect(() => {
        if(initialPromotion){
            setPromotion(initialPromotion);
            setIsEditing(true);
        }
    }, [initialPromotion]);

    useEffect(() => {
        const validStartDate = promotion?.startDate.match(/^\d{4}-\d{2}-\d{2}$/);
        const validEndDate = promotion?.endDate.match(/^\d{4}-\d{2}-\d{2}$/);

        if(promotion?.type === "Voucher Gift"){
            if(promotion?.voucherValue > 0 && validEndDate && validStartDate){
                setIsValidPromotion(true);
            }
            else{
                setIsValidPromotion(false);
            }
        }
        else if (promotion?.type === "Flash Sale"){
            if(promotion?.promoPercent > 0  && validEndDate && validStartDate){
                setIsValidPromotion(true);
            }
            else{
                setIsValidPromotion(false);
            }
        }
    }, [promotion]);
    useEffect(() => {
        if(isReadyForAction){
            if(isValidPromotion){
                if(isEditing){
                    HandleUpdatePromotion();
                }
                else{
                    HandleCreatePromotion();
                }
            }
            else{
                alert("Promotion information is not valid");
                setIsReadyForAction(false);
            }
        }
    }, [promotion, isReadyForAction, isValidPromotion]);

    const HandleBack = () => {
        navigate(-1);
    }
    const HandleUpdatePromotion = async () => {
        const response = await UpdatePromotion(promotion);

        if(response > 0){
            alert("Update promotion successfully");
            navigate(-1);
        }
        else{
            alert("Update promotion failed");
        }
    };
    const HandleCreatePromotion = async () => {
        const response = await CreatePromotion(promotion);

        if(response > 0){
            alert("Create promotion successfully");
            navigate(-1);
        }
        else{
            alert("Create promotion failed");
        }
    };
    const HandleChangePromotionType = (e) => {
        setPromotion({...promotion, type: e.target.value, promoPercent: 0, minPriceToReach: 0,voucherValue: 0});
    }
    return (
        <div className={styles["create-voucher-container"]}>
            <div onClick={HandleBack} className={styles["header"]}>
                <button><i class="fas fa-arrow-left"></i></button>
                <h1>{isEditing? "Update Promotion" : "Create Promotion"}</h1>
            </div>
            <div className={styles["grid"]}>
                <div className={styles["card"]}>
                    <h2>Tạo 1 mã</h2>
                    <p>Tạo một mã voucher duy nhất cho sự kiện của bạn</p>
                    <button>Đã chọn</button>
                </div>
                <div className={styles["card"]}>
                    <h2>Tạo nhiều mã</h2>
                    <p>Mã voucher sẽ được tạo ngẫu nhiên hàng loạt và các thiết lập bên dưới sẽ áp dụng cho tất cả các mã voucher</p>
                    <button>Chọn</button>
                </div>
            </div>
    
            <div className={styles["section"]}>
                <h2>Set up promotion</h2>
                <label>Promotion type:</label>
                <div className={styles["promotion-type"]}>
                    <select
                        disabled={isEditing}
                        value={promotion.type} 
                        onChange={(e) => HandleChangePromotionType(e)}>
                        <option>Voucher Gift</option>
                        <option>Flash Sale</option>
                    </select>
                    {promotion.type !== "Voucher Gift" &&
                    <input 
                        value={promotion.promoPercent}
                        onChange={(e) => setPromotion({...promotion, promoPercent: e.target.value})}
                        type="text" placeholder="Enterd reduced rate (%)"/>}
                    {promotion.type === "Voucher Gift" &&
                    <input
                        value={promotion.voucherValue?.toLocaleString('vi-VN')}
                        onChange={(e) => setPromotion({...promotion, voucherValue: e.target.value})}
                        type="text" placeholder="Enterd value of voucher"/>}
                </div>
                <label>Time duration:</label>
                <div className={styles["flex"]}>
                    <input
                        value={promotion.startDate}
                        onChange={(e) => setPromotion({...promotion, startDate: e.target.value})} 
                        type="text" placeholder="Start date (yyyy-mm-dd)"/>
                    <input
                        value={promotion.endDate}
                        onChange={(e) => setPromotion({...promotion, endDate: e.target.value})} 
                        type="text" placeholder="End date (yyyy-mm-dd)"/>
                </div>

                {promotion.type === "Voucher Gift" &&
                    <label>Minimum price of order to apply promotion: </label>}
                {promotion.type === "Voucher Gift" &&
                    <input
                    value={promotion.minPriceToReach?.toLocaleString('vi-VN')}
                    onChange={(e) => setPromotion({...promotion, minPriceToReach: e.target.value})} 
                    type="text" placeholder="Enter price"/>}
            </div>
            <div className={styles["footer"]}>
                <button className={styles["cancel"]}>Cancel</button>
                <button
                    onClick={() => setIsReadyForAction(true)} 
                    className={styles["create"]}>{isEditing ? "Update" :"Create"}</button>
            </div>
        </div>
    );
}

export default CreateVoucher;