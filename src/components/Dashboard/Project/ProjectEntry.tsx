import {Link} from "@/i18n/navigation";
import {Project} from "@/types/project";
import {useTranslations} from "next-intl";
import {shortenDescription, shortenTitle} from "@/utils/textShorteners";

export type ProjectEntryProps = {
    item: Project;
}

export const ProjectEntry = ({item}: ProjectEntryProps) => {
    const t = useTranslations();

    return (
        <Link href={`/dashboard/${item.id}`} className="flex flex-col p-5 w-full rounded-2xl bg-container shadow-lg text-wrap truncate">
            <span className="text-lg sm:text-xl font-bold">{shortenTitle(item.title)}</span>
            <span className="text-md sm:text-lg">{shortenDescription(item.description || "")}</span>
            <span className="text-sm font-light mt-2">{t("created_at")}: {new Date(item.created_at).toLocaleString()}</span>
            <span className="text-sm font-light">{t("updated_at")}: {new Date(item.updated_at).toLocaleString()}</span>
        </Link>
    );
};