import {Link} from "@/i18n/navigation";
import {useState} from "react";
import {useTranslations} from "next-intl";
import {usePathname} from "next/navigation";

export type LanguageSwitcherProps = {
    className?: string;
}

export const LanguageSwitcher = (props: LanguageSwitcherProps) => {
    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState(false);

    const t = useTranslations()

    return (
        <div className="block relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={props.className}
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                {t("change-language")}
            </button>
            {isOpen && (
                <div
                    className="flex flex-col absolute bg-container shadow-lg w-24 rounded-md"
                    role="menu"
                    aria-orientation="vertical"
                >
                    <Link
                        className="hover:bg-gray-800 w-full"
                        href={pathname.slice(3)}
                        locale="ru"
                    >
                        Русский
                    </Link>
                    <Link
                        className="hover:bg-gray-800 w-full"
                        href={pathname.slice(3)}
                        locale="en"
                    >
                        English
                    </Link>
                </div>
            )}
        </div>
    );
};
