"use client"
import {AuthContainer} from "@/components/Auth/AuthContainer";
import {BlurryInput} from "@/components/Global/BlurryInput";
import {useTranslations} from "next-intl";
import Link from "next/link";
import {KeyboardEvent} from "react";
import {BlueButton} from "@/components/Global/BlueButton";

export default function RegistrationPage() {
    const t = useTranslations();

    const handleRegistration = () => {
        alert("Handle registration placeholder")
    }

    const handleEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleRegistration();
        }
    }

    return (
        <AuthContainer>
            <h1 className="font-bold text-center text-2xl mb-5">{t("app-title")}</h1>
            <div className="w-full">
                <h3 className='font-bold text-center'>
                    {t('Auth.have-account')}
                    <Link
                        href="/login"
                        className='text-blue-200 hover:text-blue-400 transition duration-200'
                    >
                        {t('Auth.login-now')}
                    </Link>
                </h3>
                <div className="px-5 py-7">
                    <BlurryInput
                        label={t('Auth.username')}
                        type={"text"}
                        value={""}
                        onChange={() => {}}
                        onKeyDown={handleEnterPress}
                    />
                    <BlurryInput
                        label={"Email"}
                        type={"text"}
                        value={""}
                        onChange={() => {}}
                        onKeyDown={handleEnterPress}
                    />
                    <BlurryInput
                        label={t('Auth.password')}
                        type={"password"}
                        value={""}
                        onChange={() => {}}
                        onKeyDown={handleEnterPress}
                    />
                    <BlurryInput
                        label={t('Auth.confirm-password')}
                        type={"password"}
                        value={""}
                        onChange={() => {}}
                        onKeyDown={handleEnterPress}
                    />
                    <BlueButton
                        label={t('Auth.sign-up')}
                        handleClick={() => handleRegistration()}
                    />
                </div>
            </div>
        </AuthContainer>
    );
}