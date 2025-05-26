import axios from "axios";

const BASE_URL = "http://localhost:8088/api";
const api = axios.create({
    baseURL: BASE_URL,
    timeout: 20000,
});

export const GetAccountsOfCustomerApi = async (customerId) => {
    try {
        const response = await api.get(`account?customerId=${customerId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const GetTransactionsOfAccountApi = async (accountId) => {
    try {
        const response = await api.get(`/account/${accountId}/transactions`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const DepositApi = async (depositRequest) => {
    try {
        const response = await api.post(`/account/deposit`, depositRequest);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const WithdrawApi = async (withdrawRequest) => {
    try {
        const response = await api.post(`/account/withdraw`, withdrawRequest);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const TransferApi = async (transferRequest) => {
    try {
        const response = await api.post(`/account/transfer`, transferRequest);
        return response.data;
    } catch (error) {
        throw error;
    }
}