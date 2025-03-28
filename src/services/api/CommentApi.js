import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

const api = axios.create({
    headers: {
        "Content-Type": "application/json"
    },
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
export const CreateCommentApi = async (createCommentRequest) => {
    try{
        const response = await api.post("/comment", createCommentRequest);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}
export const UpdateCOmmentApi = async (updateCommentRequest) => {
    try{
        const response = await api.put("/comment", updateCommentRequest);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}
export const GetCommentsApi = async (senderId,eventId,parentId) => {
    try{
        let url = "/comment";
        if(senderId !== null){
            if(url.includes("?")){
                url += "&";
            }
            else{
                url += "?";
            }
            url += `senderId=${senderId}`;
        }
        if(eventId !== null){
            if(url.includes("?")){
                url += "&";
            }
            else{
                url += "?";
            }
            url += `eventId=${eventId}`;
        }
        if(parentId !== null){
            if(url.includes("?")){
                url += "&";
            }
            else{
                url += "?";
            }
            url += `parentId=${parentId}`;
        }
        const response = await api.get(url);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}