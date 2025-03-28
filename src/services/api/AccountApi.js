import axios from "axios";

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
export const SignInApi = async (signInRequest) => {
    try{
        const response = await api.post("/account/auth/signin", signInRequest);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}
export const SignUpApi = async (signUpRequest) => {
    try{
        const response = await api.post("/account/user", signUpRequest,{
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
export const RegisterOrganizerApi = async (registerOrganizerRequest) => {
    try{
        const response = await api.post("/account/user/organizer", registerOrganizerRequest);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}
export const GetUsersApi = async () => {
    try {
        const response = await api.get("/account/user");
        return response.data;
    } catch (error) {
        throw error;
    }
}
