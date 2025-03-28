import React from "react";
import CreateVoucher from "../CreateVoucher/CreateVoucher";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetPromotionByIdApi } from "../../../../services/api/PromotionApi";
function EditVoucher() {
    const {eventId, promotionId} = useParams();
    const navigate = useNavigate();

    const [initialPromotionId, setInitialPromotionId] = useState(promotionId);
    const [promotion, setPromotion] = useState(null);

    useEffect(() => {
        const fetchPromotion = async () => {
            try {
                const response = await GetPromotionByIdApi(initialPromotionId);
                setPromotion(response);
            } catch (err) {
                console.log(err);
            }
        }
        fetchPromotion();
    }, [initialPromotionId]);

    return (
        <CreateVoucher initialPromotion={promotion}/>
    );
}

export default EditVoucher;