import axiosClient from "@/api/axiosClient";
import {authResponse} from "@/types/authResponse";

export const login = (body: any): Promise<authResponse> => {
    return axiosClient.post('/auth/login', body);
}

export const register = (body: any): Promise<authResponse> => {
    return axiosClient.post('/auth/register', body);
}