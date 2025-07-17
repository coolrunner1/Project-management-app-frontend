import {useTranslations} from "next-intl";
import {signOut} from "@/utils/tempAuth";
import Link from "next/link";
import {NavBarButton} from "@/components/Dashboard/NavBar/NavBarButton";

export const NavBar = () => {
    const t = useTranslations()
    return (
        <>
            <header className="flex justify-evenly fixed bg-container px-5 pt-2 w-screen max-w-full">
                <Link href="/dashboard">
                    <NavBarButton title={t("home")}/>
                </Link>
                <Link href="/profile">
                    <NavBarButton title={t("profile")}/>
                </Link>
                <button
                    onClick={signOut}
                >
                    <NavBarButton title={t("Auth.sign-out")}/>
                </button>
            </header>
            <div className="p-9"></div>
        </>
    );
};