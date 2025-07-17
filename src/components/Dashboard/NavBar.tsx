import {useTranslations} from "next-intl";
import {signOut} from "@/utils/tempAuth";

export const NavBar = () => {
    const t = useTranslations()
    return (
        <>
            <header className="fixed bg-container p-5 w-screen max-w-full">
                <span>placeholder navbar  </span>
                <button onClick={signOut}>{t('Auth.sign-out')}</button>
            </header>
            <div className="p-9"></div>
        </>
    );
};