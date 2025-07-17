"use client"
import {signOut} from "@/utils/tempAuth";
import {NavBar} from "@/components/Dashboard/NavBar/NavBar";
import {useQuery} from "@tanstack/react-query";
import {getProject} from "@/api/projects";
import {useParams} from "next/navigation";
import {LoadingIndicator} from "@/components/Global/LoadingIndicator";
import {SmallBlueButton} from "@/components/Global/SmallButtons/SmallBlueButton";
import {ProjectEntry} from "@/components/Dashboard/Project/ProjectEntry";
import {useTranslations} from "next-intl";
import {BlueButton} from "@/components/Global/RegularButtons/BlueButton";
import {RedButton} from "@/components/Global/RegularButtons/RedButton";
import {TasksContainer} from "@/components/Dashboard/Task/TasksContainer";
import { fetchTasks } from "@/api/tasks";
import {GreenButton} from "@/components/Global/RegularButtons/GreenButton";

export default function ProjectPage() {
    const t = useTranslations();

    const params = useParams();

    const {
        data: project,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryFn: getProject,
        queryKey: ["_projects", params.id]
    });

    const {
        data: toDoTasks,
    } = useQuery({
        queryFn: fetchTasks,
        queryKey: ["_tasks", params.id, "to_do"]
    });

    const {
        data: inProgressTasks,
    } = useQuery({
        queryFn: fetchTasks,
        queryKey: ["_tasks", params.id, "in_progress"],
    });

    const {
        data: inTestingTasks,
    } = useQuery({
        queryFn: fetchTasks,
        queryKey: ["_tasks", params.id, "in_testing"]
    });

    const {
        data: rejectedTasks,
    } = useQuery({
        queryFn: fetchTasks,
        queryKey: ["_tasks", params.id, "rejected"],
    });

    const {
        data:doneTasks,
    } = useQuery({
        queryFn: fetchTasks,
        queryKey: ["_tasks", params.id, "done"]
    });

    return (
        <>
            <NavBar />
            <div className="min-h-[90vh]">
                {isLoading && <LoadingIndicator/>}
                {error && (
                    <div className='text-center text-xl'>{t(error.message)}</div>
                )}
                {project &&
                    <>
                        <div className='flex flex-col justify-center items-center bg-container max-w-7xl mx-auto rounded-2xl shadow-lg p-4'>
                            <span className="text-xl sm:text-2xl">{project.title}</span>
                            <span className="text-lg sm:text-xl">{project.description}</span>
                            <span className="text-sm">{t("created_at")}: {new Date(project.created_at).toLocaleString()}</span>
                            <span className="text-sm">{t("updated_at")}: {new Date(project.updated_at).toLocaleString()}</span>
                            <div className="flex flex-col sm:flex-row gap-2 w-96 mt-4">
                                <GreenButton
                                    label={t("Project.add-new-task")}
                                    onClick={() => {refetch()}}
                                />
                                <BlueButton
                                    label={t("edit")}
                                    onClick={() => {refetch()}}
                                />
                                <RedButton
                                    label={t("delete")}
                                    onClick={() => {refetch()}}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-7xl m-auto p-5">
                            {toDoTasks && toDoTasks.length > 0 &&
                                <TasksContainer tasks={toDoTasks} title={t("Tasks.to-do-tasks")}/>
                            }

                            {inProgressTasks && inProgressTasks.length > 0 &&
                                <TasksContainer tasks={inProgressTasks} title={t("Tasks.in-progress-tasks")}/>
                            }

                            {inTestingTasks && inTestingTasks.length > 0 &&
                                <TasksContainer tasks={inTestingTasks} title={t("Tasks.in-testing-tasks")}/>
                            }

                            {rejectedTasks && rejectedTasks.length > 0 &&
                                <TasksContainer tasks={rejectedTasks} title={t("Tasks.rejected-tasks")}/>
                            }

                            {doneTasks && doneTasks.length > 0 &&
                                <TasksContainer tasks={doneTasks} title={t("Tasks.done-tasks")}/>
                            }
                        </div>
                    </>
                }
            </div>
        </>
    );
}
