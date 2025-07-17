import {z} from "zod";

export const LoginSchema = z.object({
    login: z.string().min(3, "Errors.too-short-3"),
    password: z.string().min(8,  "Errors.too-short-8"),
});

export const RegistrationSchema = z.object({
    username: z.string().min(3, "Errors.too-short-3"),
    email: z.email("Errors.invalid-email"),
    password: z.string().min(8, "Errors.too-short-8"),
    confirmPassword: z.string().min(8, "Errors.too-short-8"),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Errors.passwords-no-match",
        path: ["confirmPassword"]
});