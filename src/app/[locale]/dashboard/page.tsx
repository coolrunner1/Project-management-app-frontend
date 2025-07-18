"use client"
import {useMutation, useQuery} from "@tanstack/react-query";
import {createProject, getProjects} from "@/api/projects";
import {LoadingIndicator} from "@/components/Global/LoadingIndicator";
import {useTranslations} from "next-intl";
import {SmallBlueButton} from "@/components/Global/SmallButtons/SmallBlueButton";
import {useState} from "react";
import {ProjectEntry} from "@/components/Dashboard/Project/ProjectEntry";
import {EditProjectModal} from "@/components/Dashboard/Project/EditProjectModal";
import {ProjectOrTaskErrors} from "@/types/errors";
import {validator} from "@/utils/validator";
import {ProjectSchema} from "@/schemas/project";
import {NavBar} from "@/components/Dashboard/NavBar/NavBar";
import {BlueButton} from "@/components/Global/RegularButtons/BlueButton";

export default function DashboardPage() {
    const t = useTranslations();

    const [newProjectTitle, setNewProjectTitle] = useState('');
    const [newProjectDescription, setNewProjectDescription] = useState('');
    const [errors, setErrors] = useState<ProjectOrTaskErrors | null>(null)

    const [showNewProjectModal, setShowNewProjectModal] = useState(false);

    const {
        data,
        isLoading,
        isError,
        error,
        refetch
    } = useQuery({
        queryFn: getProjects,
        queryKey: ['_projects']
    });

    const {mutate} = useMutation({
        mutationFn: createProject,
        onSuccess: () => {
            setShowNewProjectModal(false);
            setNewProjectTitle("");
            setNewProjectDescription("");
            refetch();
        },
        onError: () => {
            alert(t("Errors.server-error"))
        }
    });

    const handleSave = async () => {
        const body = {
            title: newProjectTitle,
            description: newProjectDescription || undefined,
        };

        const validationErrors = validator(ProjectSchema, body);

        if (validationErrors) {
            setErrors(validationErrors as ProjectOrTaskErrors);
            setTimeout(() => setErrors(null), 10000);
            return;
        }

        mutate(body);
    }

    return (
        <>
            {showNewProjectModal && (
                <EditProjectModal
                    title={newProjectTitle}
                    description={newProjectDescription}
                    setTitle={setNewProjectTitle}
                    setDescription={setNewProjectDescription}
                    onSave={() => handleSave()}
                    onClose={() => setShowNewProjectModal(false)}
                    errors={errors}
                />
            )}
            <NavBar/>
            <div className="min-h-[90vh]">
                <div className='text-center'>
                    <h6 className='text-xl md:text-2xl font-bold'>{t('Project.projects')}</h6>
                </div>
                <div className='flex flex-col items-center justify-center px-4 py-4 overflow-auto'>
                    {isLoading && <LoadingIndicator/>}
                    {error && (
                        <div className='text-center text-xl'>{t(error.message)}</div>
                    )}
                    {!isLoading && !isError &&
                        <>
                            {data &&
                                <>
                                    <BlueButton
                                        label={t('create')}
                                        customStyles={"max-w-48"}
                                        onClick={() => {setShowNewProjectModal(true)}}
                                    />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mt-4 max-w-6xl">
                                        {data.map(item => (
                                            <ProjectEntry key={item.id} item={item}/>
                                        ))}
                                    </div>
                                </>
                            }
                            {!data?.length &&
                                <div className="text-center text-xl">{t('Project.no-projects')}</div>
                            }
                        </>
                    }
                </div>
            </div>
        </>
    )
}