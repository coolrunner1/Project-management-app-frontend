import axiosClient from "@/api/axiosClient";
import {Project} from "@/types/project";

export const getProjects = async (): Promise<Project[]> => {
    const res = await axiosClient.get('/projects');
    return res.data;
}