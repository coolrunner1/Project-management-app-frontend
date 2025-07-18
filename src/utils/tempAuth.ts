//This solution is temporary and will be replaced in future commits with custom AuthContext
import {User} from "@/types/user";
import Cookies from 'js-cookie'

export const signIn = (user: User, token: string) => {
    Cookies.set('_token', token);
    window.location.href = "/dashboard";
}

export const signOut = () => {
    Cookies.remove('_token');
    window.location.href = "/login";
}

export const getToken = () => {
    return Cookies.get("_token");
}

export const isAuthenticated = () => {
    return !!Cookies.get("_token");
}