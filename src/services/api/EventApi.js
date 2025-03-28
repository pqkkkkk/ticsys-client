import axios from 'axios';

const BASE_URL = "http://localhost:8080/api";
const api = axios.create({
    baseURL: BASE_URL,
    timeout: 20000,
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
export const CreateEventApi = async (eventRequest) => {
    try{
        const response = await api.post("/event", eventRequest,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
        }
    catch(err){
        console.log(err);
    }
}
export const GetEventByIdApi = async (eventId) => {
    try{
        const response = await api.get(`/event/${eventId}`);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}
export const GetEventWithTicketsByIdApi = async (eventId) => {
    try{
        const response = await api.get(`/event/${eventId}?include=tickets`);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}
export const GetEventsApi = async () => {
    try{
        const response = await api.get("/event");
        return response.data;
    }

    catch(err){
        console.log(err);
    }
}
export const GetEventsByOrganizerIdApi = async (organizerId) => {
    try{
        const response = await api.get(`/event?organizerId=${organizerId}`);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}
 export const GetTicketCountByDateApi = async (eventId,startDate,endDate) => {
    try{
        const response = await api.get(`/event/statastics/ticketCount/${eventId}?statasticsUnit=date&startDate=${startDate}&endDate=${endDate}`);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}
export const GetEventRevenueByDateApi = async (eventId,startDate,endDate) => {
    try{
        const response = await api.get(`/event/statastics/revenue/${eventId}?statasticsUnit=date&startDate=${startDate}&endDate=${endDate}`);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}
export const GetTicketCountOfAllEventByDateApi = async (startDate,endDate) => {
    try{
        const response = await api.get(`/event/statastics/ticketCount?statasticsUnit=date&startDate=${startDate}&endDate=${endDate}`);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}
export const GetRevenueOfAllEventByDateApi = async (startDate,endDate) => {
    try{
        const response = await api.get(`/event/statastics/revenue?statasticsUnit=date&startDate=${startDate}&endDate=${endDate}`);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}