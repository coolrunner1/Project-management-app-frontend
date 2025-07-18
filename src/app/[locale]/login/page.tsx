"use client"
import {AuthContainer} from "@/components/Auth/AuthContainer";
import {BlurryInput} from "@/components/Global/Inputs/BlurryInput";
import {useTranslations} from "next-intl";
import Link from "next/link";
import {KeyboardEvent, useState} from "react";
import {BlueButton} from "@/components/Global/RegularButtons/BlueButton";
import {login} from "@/api/auth";
import {LoginSchema} from "@/schemas/auth";
import {validator} from "@/utils/validator";
import {InputError} from "@/components/Global/Inputs/InputError";
import {useMutation} from "@tanstack/react-query";
import {signIn} from "@/utils/tempAuth";
import {AxiosError} from "axios";
import {OkModal} from "@/components/Global/Modal/OkModal";
import {LoginErrors} from "@/types/errors";

export default function LoginPage() {
    const t = useTranslations();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState<LoginErrors | null>(null);

    const {mutate} = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            signIn(data.token);
        },
        onError: (error: AxiosError) => {
            console.error('Login error:', error);
            if (error.status === 422) {
                setErrors({
                    login: "Errors.invalid-login-password",
                    password: "Errors.invalid-login-password"
                });
                return;
            }
            setErrors({serverError: "Errors.server-error"});
        }
    });

    const handleLogin = () => {
        const body = {
            login: username,
            password
        }

        const validationErrors = validator(LoginSchema, body) || null

        if (!validationErrors) {
            mutate(body);
            return;
        }

        setErrors(validationErrors);
        setTimeout(() => {
            setErrors(null);
        }, 10000);
    }

    const handleEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    }

    return (
        <>
            {errors?.serverError &&
                <OkModal
                    message={errors.serverError}
                    setClose={() => setErrors(null)}
                />
            }
            <AuthContainer>
                <h1 className="font-bold text-center text-2xl mb-5">{t("app-title")}</h1>
                <div className="w-full">
                    <h3 className='font-bold text-center'>
                        {t('Auth.no-account')}
                        <Link
                            href="/registration"
                            className='text-blue-200 hover:text-blue-400 transition duration-200'
                        >
                            {t('Auth.register-now')}
                        </Link>
                    </h3>
                    <div className="px-5 py-7">
                        <BlurryInput
                            label={t('Auth.username-or-email')}
                            type={"text"}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={handleEnterPress}
                        />
                        <InputError error={errors?.login}/>
                        <BlurryInput
                            label={t('Auth.password')}
                            type={"password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleEnterPress}
                        />
                        <InputError error={errors?.password}/>
                        <BlueButton
                            label={t('Auth.sign-in')}
                            onClick={() => handleLogin()}
                        />
                    </div>
                </div>
            </AuthContainer>
        </>
    );
}