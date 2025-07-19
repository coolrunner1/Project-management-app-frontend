import axiosClient from "@/api/axiosClient";
import {Project} from "@/types/project";
import {MutationKeyObject, QueryKeyObject} from "@/api/queryClient";

export const getProjects = async (): Promise<Project[]> => {
    const res = await axiosClient.get('/projects');
    return res.data;
}

export const getProject = async ({queryKey}: QueryKeyObject): Promise<Project> => {
    const [_key, id] = queryKey;

    const res = await axiosClient.get('/projects/' + id);
    return res.data;
}

export const createProject = async (body: any): Promise<Project> => {
    const res = await axiosClient.post('/projects', body);
    return res.data;
}

export const updateProject = async ({mutationKey}: MutationKeyObject): Promise<Project> => {
    const [_key, id, body] = mutationKey;

    const res = await axiosClient.put('/projects/' + id, body);
    return res.data;
}

export const deleteProject = async ({mutationKey}: MutationKeyObject) => {
    const [_key, id] = mutationKey;
    return await axiosClient.delete('/projects/' + id);
}