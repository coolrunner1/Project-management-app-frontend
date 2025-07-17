import {Task} from "@/types/task";
import {TasksEntry} from "@/components/Dashboard/Task/TasksEntry";

export type TasksContainerProps = {
    title: string;
    tasks: Task[];
}

export const TasksContainer = (props: TasksContainerProps) => {
    return (
        <div className='flex flex-col gap-3 p-4 rounded-2xl bg-container max-w-xl'>
            <h2 className="text-xl text-center">{props.title}</h2>
            {props.tasks.map((task: Task) => <TasksEntry key={task.id} task={task}/>)}
        </div>
    );
};