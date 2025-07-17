"use client"
import {useTranslations} from "next-intl";
import {useState} from "react";
import {FormInput} from "@/components/Global/Inputs/FormInput";
import {SmallBlueButton} from "@/components/Global/SmallButtons/SmallBlueButton";
import {NavBar} from "@/components/Dashboard/NavBar/NavBar";
import {getUser, signOut} from "@/utils/tempAuth";
import {SmallRedButton} from "@/components/Global/SmallButtons/SmallRedButton";
import {SmallGreenButton} from "@/components/Global/SmallButtons/SmallGreenButton";

export default function ProfilePage() {
    const t = useTranslations();

    const user = getUser();

    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');

    const onSubmit = () => {
        alert("Placeholder")
    }

    const onDelete = () => {
        alert("Placeholder")
    }

    return (
        <>
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
                                    <SmallGreenButton
                                        label={t('Auth.sign-out')}
                                        onClick={signOut}
                                    />
                                    <SmallBlueButton
                                        label={t('save')}
                                        onClick={onSubmit}
                                    />
                                    <SmallRedButton
                                        label={t('delete')}
                                        onClick={onDelete}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form>
                                <div className="flex flex-wrap">
                                    <FormInput
                                        name={t('Auth.username')}
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <FormInput
                                        name={"Email"}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <FormInput
                                        name={t('Auth.new-password')}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}