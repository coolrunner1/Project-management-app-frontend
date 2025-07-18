import {Task} from "@/types/task";
import {useTranslations} from "next-intl";
import {shortenDescription} from "@/utils/textShorteners";
import {EntryContainer} from "@/components/Global/Containers/EntryContainer";
import formatDateTime from "@/utils/formatDateTime";

export type TasksEntryProps = {
    task: Task;
}

export const TasksEntry = (props: TasksEntryProps) => {
    const t = useTranslations()

    return (
        <EntryContainer href={`/dashboard/${props.task.project_id}/tasks/${props.task.id}`}>
            <span className="text-lg sm:text-xl font-bold">{props.task.title}</span>
            <span className="text-md sm:text-lg">{shortenDescription(props.task.description || "")}</span>
            <span className="text-sm font-light mt-2">{t("created_at")}: {formatDateTime(props.task.created_at)}</span>
            <span className="text-sm font-light">{t("updated_at")}: {formatDateTime(props.task.updated_at)}</span>
        </EntryContainer>
    );
};