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
export const CreateOrderApi = async (createOrderRequest) => {
    try {
        const response = await api.post("/order", createOrderRequest);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const GetOrderByIdApi = async (orderId) => {
    try {
        const response = await api.get(`/order/${orderId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const GetOrdersWithDetailOrderAndTicketAndEventApi = async () => {
    try {
        const response = await api.get(`/order?include=ticketOfOrders,ticket,event`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const GetOrdersWithDetailOrderAndTicketAndEventAndUserInfoApi = async () => {
    try {
        const response = await api.get(`/order?include=ticketOfOrders,ticket,event,user`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const GetOrdersOfEventWithDetailOrderAndTicketAndUserInfoApi = async (eventId) => {
    try {
        const response = await api.get(`/order?include=ticketOfOrders,ticket,user&eventId=${eventId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const GetOrdersOfEventWithDetailOrderAndTicketAndUserInfoBySearchApi = async (eventId,userFullNameKeyword) => {
    try {
        const response = await api.get(`/order/search?include=ticketOfOrders,ticket,user&eventId=${eventId}&userFullNameKeyword=${userFullNameKeyword}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const GetOrdersWithEventApi = async () => {
    try {
        const response = await api.get(`/order?include=event`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const GetOrdersWithEventOfUserApi = async (userId) => {
    try {
        const response = await api.get(`/order?include=event&userId=${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const GetOrderByIdWithDetailOrderAndTicketApi = async (orderId) => {
    try {
        const response = await api.get(`/order/${orderId}?include=ticketOfOrders,ticket`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const GetOrderByIdWithDetailOrderAndTicketAndPromotionApi = async (orderId) => {
    try {
        const response = await api.get(`/order/${orderId}?include=ticketOfOrders,ticket,promotion`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const GetOrderByIdWithDetailOrderApi = async (orderId) => {
    try {
        const response = await api.get(`/order/${orderId}?include=ticketOfOrders`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const GetOrderByIdWithDetailOrderAndTicketAndEventApi = async (orderId) => {
    try {
        const response = await api.get(`/order/${orderId}?include=ticketOfOrders,ticket,event`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const ReserveOrderApi = async (orderId,voucherOfUserId) => {
    try {
        let url = `/order/${orderId}/reserve`;
        if(voucherOfUserId){
            url = `/order/${orderId}/reverse?voucherOfUserId=${voucherOfUserId}`;
        }
        const response = await api.put(url);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const PayOrderApi = async (orderId, bankAccountId, voucherOfUserId) => {
    try {
        let url = `/order/${orderId}/payment?bankAccountId=${bankAccountId}`;
        if(voucherOfUserId){
            url = `/order/${orderId}/payment?bankAccountId=${bankAccountId}&voucherOfUserId=${voucherOfUserId}`;
        }
        const response = await api.put(url);
        return response.data;
    } catch (error) {
        throw error;
    }
}