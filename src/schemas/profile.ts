import {z} from "zod";

export const ProfileSchema = z.object({
    username: z.string().min(3, "Errors.too-short-3"),
    email: z.email("Errors.invalid-email"),
    password: z.string().min(8, "Errors.too-short-8")
});