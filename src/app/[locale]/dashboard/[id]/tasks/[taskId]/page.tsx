"use client"
import {NavBar} from "@/components/Dashboard/NavBar/NavBar";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useParams, useRouter} from "next/navigation";
import {LoadingIndicator} from "@/components/Global/LoadingIndicator";
import {useTranslations} from "next-intl";
import {BlueButton} from "@/components/Global/RegularButtons/BlueButton";
import {RedButton} from "@/components/Global/RegularButtons/RedButton";
import {deleteTask, getTask, updateTask} from "@/api/tasks";
import {useEffect, useState} from "react";
import {YesNoModal} from "@/components/Global/Modal/YesNoModal";
import {AxiosError} from "axios";
import {validator} from "@/utils/validator";
import {ProjectOrTaskErrors} from "@/types/errors";
import {TaskSchema} from "@/schemas/task";
import {EditTaskModal} from "@/components/Dashboard/Task/EditTaskModal";

export default function TasksPage() {
    const t = useTranslations();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState<string | null>(null);
    const [status, setStatus] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editErrors, setEditErrors] = useState<ProjectOrTaskErrors | null>(null);

    const params = useParams();

    const {
        data: task,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryFn: getTask,
        queryKey: ["_tasks", params.id, params.taskId]
    });

    useEffect(() => {
        if (!error) return;
        if ((error as AxiosError).status === 404) {
            router.replace("/dashboard");
        }
    }, [error]);

    useEffect(() => {
        if (!task) return;

        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
    }, [task]);

    const handleUpdate = () => {
        const body = {
            title,
            project_id: task?.project_id,
            status,
            description
        };

        const validationErrors = validator(TaskSchema, body);

        if (validationErrors) {
            setEditErrors(validationErrors as ProjectOrTaskErrors);
            setTimeout(() => {setEditErrors(null)}, 10000)
            return;
        }

        setEditErrors(null);

        updateMutate({ mutationKey: ["_tasks", task?.project_id, task?.id, body], })
    }

    const {mutate: updateMutate} = useMutation({
        mutationFn: updateTask,
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
        deleteMutate({ mutationKey: ["_", task?.project_id, task?.id] });
    }

    const {mutate: deleteMutate} = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            router.push(`/dashboard/${params.id}`);
        },
        onError: () => {
            alert(t("Errors.failed-delete"));
        }
    });

    return (
        <>
            {showDeleteModal &&
                <YesNoModal
                    title={"Project.delete-sure"}
                    onYesClick={handleDelete}
                    onNoClick={() => setShowDeleteModal(false)}
                />
            }
            {showEditModal &&
                <EditTaskModal
                    title={title}
                    description={description || ""}
                    status={status}
                    setTitle={setTitle}
                    setDescription={setDescription}
                    setStatus={setStatus}
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
                {task &&
                    <>
                        <div className='flex flex-col justify-center items-center bg-container max-w-7xl mx-auto rounded-2xl shadow-lg p-4'>
                            <span className="text-xl sm:text-2xl">{task.title}</span>
                            <span className="text-lg sm:text-xl">{task.description}</span>
                            <span className="text-lg sm:text-xl">{t(`Tasks.${task.status}`)}</span>
                            <span className="text-sm">{t("created_at")}: {new Date(task.created_at).toLocaleString()}</span>
                            <span className="text-sm">{t("updated_at")}: {new Date(task.updated_at).toLocaleString()}</span>
                            <div className="flex flex-col sm:flex-row gap-2 w-96 mt-4">
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
                    </>
                }
            </div>
        </>
    );
}
