import axios from "axios";

const BASE_URL = "http://localhost:8081/api";
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
export const SignInWithGoogleApi = async (signInWithGoogleRequest) => {
    try{
        const response = await api.post("/v1/auth/signin/with-google", signInWithGoogleRequest);
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
export const SignUpWithGoogleApi = async (signUpWithGoogleRequest) => {
    try{
        const response = await api.post("/v1/auth/signup/with-google", signUpWithGoogleRequest);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}
export const handleOTPRequestToActivateUser = async (otpRequest) => {
    try {
        const response = await api.post("/v1/auth/signup/with-google", otpRequest);
        return response.data;
    } catch (error) {
        console.error("Error activating user:", error);
        throw error;
    }
};
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
export const LinkToBankAccountApi = async (linkToBankAccountRequest, username) => {
    try {
        const response = await api.post(`/account/user/${username}/banking`, linkToBankAccountRequest);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const GetPaymentMethodsOfUserApi = async (username, bankName) => {
    try {
        const response = await api.get(`/account/user/${username}/banking?bankName=${bankName}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
