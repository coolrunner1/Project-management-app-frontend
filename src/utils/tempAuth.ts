//This solution is temporary and will be replaced in future commits with custom AuthContext
import {User} from "@/types/user";

export const signIn = (user: User, token: string) => {
    if (typeof window === "undefined") return;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = "/dashboard";
}

export const signOut = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = "/login";

}

export const isAuthenticated = () => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("user");
}

export const getAuthUser = () => {
    if (typeof window === "undefined") return null;
    return (JSON.parse(localStorage.getItem("user") || "") as User);
}