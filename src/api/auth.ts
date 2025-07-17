import axiosClient from "@/api/axiosClient";
import {authResponse} from "@/types/authResponse";

export const login = async (body: any): Promise<authResponse> => {
    const res = await axiosClient.post('/auth/login', body);
    return res.data;
}

export const register = async (body: any): Promise<authResponse> => {
    const res = await axiosClient.post('/auth/register', body);
    return res.data;
}