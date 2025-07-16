"use client"
import {AuthContainer} from "@/components/Auth/AuthContainer";
import {BlurryInput} from "@/components/Global/BlurryInput";
import {useTranslations} from "next-intl";
import Link from "next/link";
import {KeyboardEvent} from "react";
import {BlueButton} from "@/components/Global/BlueButton";

export default function LoginPage() {
    const t = useTranslations();

    const handleLogin = () => {
        alert("Handle login placeholder")
    }

    const handleEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    }

    return (
        <AuthContainer>
            <h1 className="font-bold text-center text-2xl mb-5">{t("app-title")}</h1>
            <div className="w-full">
                <h3 className='font-bold text-center'>
                    {t('Auth.no-account')}
                    <Link
                        href="/register"
                        className='text-blue-200 hover:text-blue-400 transition duration-200'
                    >
                        {t('Auth.register-now')}
                    </Link>
                </h3>
                <div className="px-5 py-7">
                    <BlurryInput
                        label={t('Auth.username-or-email')}
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
                    <BlueButton
                        label={t('Auth.sign-in')}
                        handleClick={() => handleLogin()}
                    />
                </div>
            </div>
        </AuthContainer>
    );
}