import {z} from "zod";

export const NewTaskSchema = z.object({
    title: z.string().min(3, "Errors.too-short-3"),
    description: z.string().min(3,  "Errors.too-short-3").optional(),
});