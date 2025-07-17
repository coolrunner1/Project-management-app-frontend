"use client"
import {useQuery} from "@tanstack/react-query";
import {getProjects} from "@/api/projects";
import {LoadingIndicator} from "@/components/Global/LoadingIndicator";
import {useTranslations} from "next-intl";
import {SmallBlueButton} from "@/components/Global/SmallButtons/SmallBlueButton";
import {useState} from "react";
import {ProjectEntry} from "@/components/Project/ProjectEntry";
import {EditProjectModal} from "@/components/Project/EditProjectModal";

export default function DashboardPage() {
    const t = useTranslations();

    const [newProjectTitle, setNewProjectTitle] = useState('')
    const [newProjectDescription, setNewProjectDescription] = useState('');

    const [showNewProjectModal, setShowNewProjectModal] = useState(false);

    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery({
        queryFn: getProjects,
        queryKey: ['_projects']
    });

    const handleSave = async () => {
        alert("Placeholder");
        setShowNewProjectModal(false);
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
                />
            )}
            <div>
                <div className='text-center'>
                    <h6 className='text-blueGray-700 text-xl font-bold'>{t('Project.projects')}</h6>
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
                                    <SmallBlueButton label={t('create')} onClick={() => {setShowNewProjectModal(true)}}/>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mt-2">

                                        {data.map(item => (
                                            <ProjectEntry key={item.id} item={item}/>
                                        ))}
                                    </div>
                                </>
                            }
                            {!data?.length &&
                                <div className="text-center text-xl">{t('no-projects')}</div>
                            }
                        </>
                    }
                </div>
            </div>
        </>
    )
}