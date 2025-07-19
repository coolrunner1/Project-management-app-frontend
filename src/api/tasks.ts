import {Task} from "@/types/task";
import axiosClient from "@/api/axiosClient";
import {Project} from "@/types/project";
import {MutationKeyObject, QueryKeyObject} from "@/api/queryClient";

export const fetchTasks = async ({queryKey}: QueryKeyObject): Promise<Task[]> => {
    const [_key, projectId, status] = queryKey;
    const res = await axiosClient.get(`/projects/${projectId}/tasks?updatedAt=desc${status && `&status=${status}`}`);
    return res.data;
}

export const getTask = async ({queryKey}: QueryKeyObject): Promise<Task> => {
    const [_key, projectId, taskId] = queryKey;
    const res = await axiosClient.get(`/projects/${projectId}/tasks/${taskId}`);
    return res.data;
}

export const createTask = async ({body}: any): Promise<Task> => {
    const res = await axiosClient.post(`/projects/${body.project_id}/tasks`, body);
    return res.data;
}

export const updateTask = async ({mutationKey}: MutationKeyObject): Promise<Project> => {
    const [_key, projectId, taskId, body] = mutationKey;

    const res = await axiosClient.put(`/projects/${projectId}/tasks/${taskId}`, body);
    return res.data;
}

export const deleteTask = async ({mutationKey}: MutationKeyObject) => {
    const [_key, projectId, taskId] = mutationKey;
    return await axiosClient.delete(`/projects/${projectId}/tasks/${taskId}`);
}