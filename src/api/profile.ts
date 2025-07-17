import axiosClient from "@/api/axiosClient";
import {User} from "@/types/user";

const updateProfile = async (data: any): Promise<User> => {
    const res = await axiosClient.put('/profile', data);
    return res.data;
}

const deleteProfile = async () => {
    return await axiosClient.delete('/profile');
}