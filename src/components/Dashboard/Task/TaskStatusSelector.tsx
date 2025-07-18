import {useTranslations} from "next-intl";

export type TaskStatusSelectorProps = {
    currentStatus: string,
    setStatus: (status: string) => void,
}

export const TaskStatusSelector = (props: TaskStatusSelectorProps) => {
    const t = useTranslations("Tasks")

    const getStatuses = () => {
        switch (props.currentStatus) {
            case "to_do":
                return ["to_do", "in_progress"]
            case "in_progress":
                return ["to_do", "in_progress", "in_testing"]
            case "in_testing":
                return ["in_testing", "done", "rejected"]
            case "rejected":
                return ["rejected", "in_progress"]
            default:
                return [props.currentStatus]
        }
    }

    return (
        <>
            <label className="font-semibold text-md block">{t("status")}</label>
            <select
                className="border-white border-2 rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full"
                defaultValue={props.currentStatus}
                onChange={(e) => props.setStatus(e.target.value)}
            >
                {getStatuses().map((status, key) =>
                    <option key={key+status} value={status}>{t(status)}</option>
                )}
            </select>
        </>
    );
};