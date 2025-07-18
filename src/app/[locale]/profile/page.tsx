"use client"
import {useTranslations} from "next-intl";
import {useEffect, useState} from "react";
import {FormInput} from "@/components/Global/Inputs/FormInput";
import {SmallBlueButton} from "@/components/Global/SmallButtons/SmallBlueButton";
import {NavBar} from "@/components/Dashboard/NavBar/NavBar";
import {signOut} from "@/utils/tempAuth";
import {SmallRedButton} from "@/components/Global/SmallButtons/SmallRedButton";
import {SmallGreenButton} from "@/components/Global/SmallButtons/SmallGreenButton";
import {useMutation, useQuery} from "@tanstack/react-query";
import {deleteProfile, getProfile, updateProfile} from "@/api/profile";
import {YesNoModal} from "@/components/Global/Modal/YesNoModal";
import {AxiosError} from "axios";
import {ProfileUpdateErrors, RegistrationResponseErrors} from "@/types/errors";
import {validator} from "@/utils/validator";
import {ProfileSchema} from "@/schemas/profile";
import {InputError} from "@/components/Global/Inputs/InputError";
import {OkModal} from "@/components/Global/Modal/OkModal";

export default function ProfilePage() {
    const t = useTranslations();

    const [showDeletionModal, setShowDeletionModal] = useState(false);
    const [showUpdateSuccessModal, setShowUpdateSuccessModal] = useState(false);
    const [errors, setErrors] = useState<ProfileUpdateErrors | null>(null);

    const setErrorsWithTimeout = (validationErrors: ProfileUpdateErrors) => {
        setErrors(validationErrors);

        setTimeout(() => {
            setErrors(null);
        }, 10000);

    }

    const {
        data: user,
        refetch
    } = useQuery({
        queryFn: getProfile,
        queryKey: ["_profile"]
    });

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');

    const onSubmit = () => {
        const body = {
            username,
            email,
            password: password || undefined,
        }

        const validationErrors = validator(ProfileSchema, body) || null

        if (!validationErrors) {
            mutateUpdate(body);
            return;
        }

        setErrorsWithTimeout(validationErrors);
    }

    const onDelete = () => {
        mutateDelete();
    }

    const {mutate: mutateUpdate} = useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            setPassword("");
            setShowUpdateSuccessModal(true);
            refetch();
        },
        onError: (error: AxiosError) => {
            if (error.status === 422) {
                const res = error.response?.data as RegistrationResponseErrors;
                const formattedErrors: ProfileUpdateErrors = {};

                if (res?.email) {
                    formattedErrors.email = `Errors.${res.email[0]}`;
                }

                if (res?.username) {
                    formattedErrors.username = `Errors.${res.username[0]}`;
                }

                setErrorsWithTimeout(formattedErrors);
                return;
            }
            setErrors({serverError: "Errors.server-error"});
        }
    });

    const {mutate: mutateDelete} = useMutation({
        mutationFn: deleteProfile,
        onSuccess: () => {
            signOut()
        },
        onError: () => {
            alert(t("Errors.server-error"));
        }
    })

    useEffect(() => {
        if (!user) return;
        setUsername(user.username);
        setEmail(user.email);
    }, [user]);

    return (
        <>
            {showUpdateSuccessModal &&
                <OkModal
                    message={"update-success"}
                    setClose={() => setShowUpdateSuccessModal(false)}
                />
            }
            {showDeletionModal &&
                <YesNoModal
                    title={"Auth.delete-sure"}
                    onYesClick={onDelete}
                    onNoClick={() => setShowDeletionModal(false)}
                />
            }
            <NavBar />
            <section className="py-1">
                <div className="w-full lg:w-8/12 sm:px-4 mx-auto sm:mt-6">
                    <div
                        className="bg-light-default dark:bg-dark-default flex flex-col min-w-0 break-words w-full mb-6 sm:shadow-lg sm:rounded-lg bg-container border-0"
                    >
                        <div className="rounded-t mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">
                                    {t('Auth.my-account')}
                                </h6>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <SmallBlueButton
                                        label={t('save')}
                                        onClick={onSubmit}
                                    />
                                    <SmallRedButton
                                        label={t('delete')}
                                        onClick={() => setShowDeletionModal(true)}
                                    />
                                    <SmallGreenButton
                                        label={t('Auth.sign-out')}
                                        onClick={signOut}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form>
                                <div className="flex flex-col">
                                    <FormInput
                                        name={t('Auth.username')}
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <InputError error={errors?.username}/>
                                    <FormInput
                                        name={"Email"}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <InputError error={errors?.email}/>
                                    <FormInput
                                        name={t('Auth.new-password')}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <InputError error={errors?.password}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}