import {Project} from "@/types/project";
import {useTranslations} from "next-intl";
import {shortenDescription, shortenTitle} from "@/utils/textShorteners";
import {EntryContainer} from "@/components/Global/Containers/EntryContainer";
import formatDateTime from "@/utils/formatDateTime";

export type ProjectEntryProps = {
    item: Project;
}

export const ProjectEntry = ({item}: ProjectEntryProps) => {
    const t = useTranslations();

    return (
        <EntryContainer href={`/dashboard/${item.id}`}>
            <span className="text-lg sm:text-xl font-bold">{shortenTitle(item.title)}</span>
            <span className="text-md sm:text-lg">{shortenDescription(item.description || "")}</span>
            <span className="text-sm font-light mt-2">{t("created_at")}: {formatDateTime(item.created_at)}</span>
            <span className="text-sm font-light">{t("updated_at")}: {formatDateTime(item.updated_at)}</span>
        </EntryContainer>
    );
};