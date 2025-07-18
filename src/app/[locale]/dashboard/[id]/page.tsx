"use client"
import {NavBar} from "@/components/Dashboard/NavBar/NavBar";
import {useMutation, useQuery} from "@tanstack/react-query";
import {deleteProject, getProject, updateProject} from "@/api/projects";
import {useParams, useRouter} from "next/navigation";
import {LoadingIndicator} from "@/components/Global/LoadingIndicator";
import {useTranslations} from "next-intl";
import {BlueButton} from "@/components/Global/RegularButtons/BlueButton";
import {RedButton} from "@/components/Global/RegularButtons/RedButton";
import {TasksContainer} from "@/components/Dashboard/Task/TasksContainer";
import {createTask} from "@/api/tasks";
import {GreenButton} from "@/components/Global/RegularButtons/GreenButton";
import {useEffect, useState} from "react";
import {YesNoModal} from "@/components/Global/Modal/YesNoModal";
import {AxiosError} from "axios";
import {EditProjectModal} from "@/components/Dashboard/Project/EditProjectModal";
import {validator} from "@/utils/validator";
import {ProjectSchema} from "@/schemas/project";
import {ProjectOrTaskErrors} from "@/types/errors";
import {TaskSchema} from "@/schemas/task";
import {EditTaskModal} from "@/components/Dashboard/Task/EditTaskModal";
import {useGetGroupedTasks} from "@/hooks/useGetGroupedTasks";

export default function ProjectPage() {
    const t = useTranslations();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState<string | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editErrors, setEditErrors] = useState<ProjectOrTaskErrors | null>(null);

    const [showTaskModal, setShowTaskModal] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");

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

    useEffect(() => {
        if (!error) return;
        if ((error as AxiosError).status === 404) {
            router.replace("/dashboard");
        }
    }, [error]);

    useEffect(() => {
        if (!project) return;

        setTitle(project.title);
        setDescription(project.description);
    }, [project]);

    const {
        toDoTasks,
        refetchToDoTasks,
        inProgressTasks,
        inTestingTasks,
        rejectedTasks,
        doneTasks
    } = useGetGroupedTasks({id: Number(params.id)})

    const handleTaskCreate = () => {
        const body = {
            title: newTaskTitle,
            project_id: params.id,
            description: newTaskDescription || undefined,
        };

        const validationErrors = validator(TaskSchema, body);

        if (validationErrors) {
            setEditErrors(validationErrors as ProjectOrTaskErrors);
            setTimeout(() => {setEditErrors(null)}, 10000)
            return;
        }

        setEditErrors(null);

        createTaskMutate({body})
    }

    const {mutate: createTaskMutate} = useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            setShowTaskModal(false);
            setNewTaskTitle("");
            setNewTaskDescription("");
            refetchToDoTasks();
        },
        onError: (error) => {
            console.error(error);
            alert(t("Errors.server-error"))
        }
    });

    const handleUpdate = () => {
        const body = {
            title,
            description: description || undefined,
        };

        const validationErrors = validator(ProjectSchema, body);

        if (validationErrors) {
            setEditErrors(validationErrors as ProjectOrTaskErrors);
            setTimeout(() => {setEditErrors(null)}, 10000)
            return;
        }

        setEditErrors(null);

        updateMutate({ mutationKey: ["_project", params.id, body], })
    }

    const {mutate: updateMutate} = useMutation({
        mutationFn: updateProject,
        onSuccess: () => {
            setShowEditModal(false);
            refetch();
        },
        onError: (error) => {
            console.error(error);
            alert(t("Errors.server-error"))
        }
    });

    const handleDelete = () => {
        deleteMutate({ mutationKey: ["_project", params.id] })
    }

    const {mutate: deleteMutate} = useMutation({
        mutationFn: deleteProject,
        onSuccess: () => {
            router.push("/dashboard");
        },
        onError: () => {
            alert(t("Errors.failed-delete"));
        }
    });

    return (
        <>
            {showTaskModal &&
                <EditTaskModal
                    title={newTaskTitle}
                    description={newTaskDescription}
                    setTitle={setNewTaskTitle}
                    setDescription={setNewTaskDescription}
                    onClose={() => setShowTaskModal(false)}
                    onSave={handleTaskCreate}
                    errors={editErrors}
                />
            }
            {showDeleteModal &&
                <YesNoModal
                    title={"Project.delete-sure"}
                    onYesClick={handleDelete}
                    onNoClick={() => setShowDeleteModal(false)}
                />
            }
            {showEditModal &&
                <EditProjectModal
                    title={title}
                    description={description || ""}
                    setTitle={setTitle}
                    setDescription={setDescription}
                    onClose={() => setShowEditModal(false)}
                    onSave={handleUpdate}
                    errors={editErrors}
                />
            }
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
                                    onClick={() => {setShowTaskModal(true)}}
                                />
                                <BlueButton
                                    label={t("edit")}
                                    onClick={() => {setShowEditModal(true)}}
                                />
                                <RedButton
                                    label={t("delete")}
                                    onClick={() => setShowDeleteModal(true)}
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
