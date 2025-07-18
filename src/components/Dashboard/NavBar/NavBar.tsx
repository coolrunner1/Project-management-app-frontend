import {useTranslations} from "next-intl";
import Link from "next/link";
import {NavBarButton} from "@/components/Dashboard/NavBar/NavBarButton";
import {LanguageSwitcher} from "@/components/Global/LanguageSwitcher";

export const NavBar = () => {
    const t = useTranslations()
    return (
        <>
            <header className="flex justify-evenly fixed bg-container px-5 pt-2 w-screen max-w-full">
                <Link href="/dashboard">
                    <NavBarButton>
                        {t("Project.projects")}
                    </NavBarButton>
                </Link>
                <Link href="/profile">
                    <NavBarButton>
                        {t("profile")}
                    </NavBarButton>
                </Link>
                <NavBarButton>
                    <LanguageSwitcher/>
                </NavBarButton>
            </header>
            <div className="p-9"></div>
        </>
    );
};