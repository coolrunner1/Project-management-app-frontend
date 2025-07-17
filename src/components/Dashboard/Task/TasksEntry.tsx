import {Task} from "@/types/task";
import Link from "next/link";
import {useTranslations} from "next-intl";
import {shortenDescription} from "@/utils/textShorteners";

export type TasksEntryProps = {
    task: Task;
}

export const TasksEntry = (props: TasksEntryProps) => {
    const t = useTranslations()

    return (
        <Link
            className="flex flex-col gap-2 p-3 rounded-2xl bg-container shadow-lg text-wrap truncate"
            href={`/dashboard/${props.task.project_id}/tasks/${props.task.id}`}
        >
            <span className="text-lg sm:text-xl font-bold">{props.task.title}</span>
            <span className="text-md sm:text-lg">{shortenDescription(props.task.description || "")}</span>
            <span className="text-sm font-light mt-2">{t("created_at")}: {new Date(props.task.created_at).toLocaleString()}</span>
            <span className="text-sm font-light">{t("updated_at")}: {new Date(props.task.updated_at).toLocaleString()}</span>
        </Link>
    );
};