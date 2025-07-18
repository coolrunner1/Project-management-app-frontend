import axiosClient from "@/api/axiosClient";
import {User} from "@/types/user";

export const getProfile = async () => {
    const res = await axiosClient.get('/profile');
    return res.data;
}

export const updateProfile = async (data: any): Promise<User> => {
    const res = await axiosClient.put('/profile', data);
    return res.data;
}

export const deleteProfile = async () => {
    return await axiosClient.delete('/profile');
}