import {useTranslations} from "next-intl";

export type InputErrorProps = {
    error?: string;
}

export const InputError = (props: InputErrorProps) => {
    const t = useTranslations()

    return (
        <>
            {props.error ?
                <div className="text-red-500 mb-2">{t(props.error)}</div>
                : <div className="py-3"></div>
            }
        </>
    );
};