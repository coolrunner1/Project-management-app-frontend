import {User} from "@/types/user";

export type authResponse = {
    token: string;
    user: User;
}