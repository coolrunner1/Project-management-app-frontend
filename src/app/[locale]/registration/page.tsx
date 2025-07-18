"use client"
import {AuthContainer} from "@/components/Auth/AuthContainer";
import {BlurryInput} from "@/components/Global/Inputs/BlurryInput";
import {useTranslations} from "next-intl";
import Link from "next/link";
import {KeyboardEvent, useState} from "react";
import {BlueButton} from "@/components/Global/RegularButtons/BlueButton";
import {RegistrationSchema} from "@/schemas/auth";
import {register} from "@/api/auth";
import {InputError} from "@/components/Global/Inputs/InputError";
import {signIn} from "@/utils/tempAuth";
import {validator} from "@/utils/validator";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {RegistrationErrors, RegistrationResponseErrors} from "@/types/errors";


export default function RegistrationPage() {
    const t = useTranslations();

    const setErrorsWithTimeout = (validationErrors: RegistrationErrors) => {
        setErrors(validationErrors);

        setTimeout(() => {
            setErrors(null);
        }, 10000)
    }

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState<RegistrationErrors | null>(null);

    const {mutate} = useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            signIn(data.token);
        },
        onError: (error: AxiosError) => {
            console.error('Login error:', error);
            if (error.status === 422) {
                const res = error.response?.data as RegistrationResponseErrors;
                const formattedErrors: RegistrationErrors = {};

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

    const handleRegistration = async () => {
       const body = {
           username,
           email,
           password,
           confirmPassword,
       }

        const validationErrors = validator(RegistrationSchema, body) || null

        if (!validationErrors) {
            mutate(body);
            return;
        }

        setErrorsWithTimeout(validationErrors);
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
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handleEnterPress}
                    />
                    <InputError error={errors?.username}/>
                    <BlurryInput
                        label={"Email"}
                        type={"email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={handleEnterPress}
                    />
                    <InputError error={errors?.email}/>
                    <BlurryInput
                        label={t('Auth.password')}
                        type={"password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleEnterPress}
                    />
                    <InputError error={errors?.password}/>
                    <BlurryInput
                        label={t('Auth.confirm-password')}
                        type={"password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onKeyDown={handleEnterPress}
                    />
                    <InputError error={errors?.confirmPassword}/>
                    <BlueButton
                        label={t('Auth.sign-up')}
                        onClick={() => handleRegistration()}
                    />
                </div>
            </div>
        </AuthContainer>
    );
}