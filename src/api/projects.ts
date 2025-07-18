import axiosClient from "@/api/axiosClient";
import {Project} from "@/types/project";

export const getProjects = async (): Promise<Project[]> => {
    const res = await axiosClient.get('/projects');
    return res.data;
}

export const getProject = async ({queryKey}: any): Promise<Project> => {
    const [_key, id] = queryKey;

    const res = await axiosClient.get('/projects/' + id);
    return res.data;
}

export const createProject = async (body: any): Promise<Project> => {
    const res = await axiosClient.post('/projects', body);
    return res.data;
}

export const deleteProject = async ({mutationKey}: any) => {
    const [_key, id] = mutationKey;
    return await axiosClient.delete('/projects/' + id);
}