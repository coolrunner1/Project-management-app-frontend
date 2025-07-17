import {Task} from "@/types/task";
import axiosClient from "@/api/axiosClient";

export const fetchTasks = async ({queryKey}: any): Promise<Task[]> => {
    const [_key, projectId, status] = queryKey;
    const res = await axiosClient.get(`/projects/${projectId}/tasks?updatedAt=desc${status && `&status=${status}`}`);
    console.log(res.data);
    return res.data;
}