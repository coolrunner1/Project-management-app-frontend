import {useQuery} from "@tanstack/react-query";
import {fetchTasks} from "@/api/tasks";

export const useGetGroupedTasks = ({id}: {id: string | number}) => {
    const {
        data: toDoTasks,
        refetch: refetchToDoTasks,
    } = useQuery({
        queryFn: fetchTasks,
        queryKey: ["_tasks", id, "to_do"]
    });

    const {
        data: inProgressTasks,
    } = useQuery({
        queryFn: fetchTasks,
        queryKey: ["_tasks", id, "in_progress"],
    });

    const {
        data: inTestingTasks,
    } = useQuery({
        queryFn: fetchTasks,
        queryKey: ["_tasks", id, "in_testing"]
    });

    const {
        data: rejectedTasks,
    } = useQuery({
        queryFn: fetchTasks,
        queryKey: ["_tasks", id, "rejected"],
    });

    const {
        data:doneTasks,
    } = useQuery({
        queryFn: fetchTasks,
        queryKey: ["_tasks", id, "done"]
    });

    return {
        toDoTasks,
        refetchToDoTasks,
        inProgressTasks,
        inTestingTasks,
        rejectedTasks,
        doneTasks
    };
}