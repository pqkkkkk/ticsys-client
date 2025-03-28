import axios from 'axios';

const BASE_URL = "http://localhost:8080/api";

const api = axios.create({
    headers: {
        "Content-Type": "application/json"
    },
    baseURL: BASE_URL,
    timeout: 20000,
    maxRedirects: 0
});
api.interceptors.request.use(
    (config) =>{
        const token = sessionStorage.getItem("token");
        if(token){
            const cleanToken = token.replace(/"/g, '');
            config.headers.Authorization = `Bearer ${cleanToken}`;
        }
        console.log("Request Headers:", config.headers);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export const CreatePromotion = async (promotion) => {
    try{
        const response = await api.post("/promotion", promotion);
        return response.data;
    }
    catch(err){
        throw err;
    }
}
export const UpdatePromotion = async (promotion) => {
    try{
        const response = await api.put(`/promotion/${promotion.id}`, promotion);
        return response.data;
    }
    catch(err){
        throw err;
    }
}
export const GetPromotionByIdApi = async (promotionId) => {
    try{
        const response = await api.get(`/promotion/${promotionId}`);
        return response.data;
    }
    catch(err){
        throw err;
    }
}
export const GetPromotionsOfEvent = async (eventId) => {
    try{
        const response = await api.get(`/promotion?eventId=${eventId}`);
        return response.data;
    }
    catch(err){
        throw err;
    }
}
export const GetPromotionsOfEventWithOrderCount = async (eventId) => {
    try{
        const response = await api.get(`/promotion/orderCount?eventId=${eventId}`);
        return response.data;
    }
    catch(err){
        throw err;
    }
}
export const GetPromotionInfosOfEvent = async (eventId,currentPrice) => {
    try{
        const response = await api.get(`/promotion/reductionInfo?eventId=${eventId}&currentPrice=${currentPrice}`);
        return response.data;
    }
    catch(err){
        throw err;
    }
}
export const GetUnusedVoucherOfUsers = async (userId) => {
    try{
        const status = 'UNUSED';
        const response = await api.get(`/promotion/voucherOfUser?userId=${userId}&status=${status}`);
        return response.data;
    }
    catch(err){
        throw err;
    }
}