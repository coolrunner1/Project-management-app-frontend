import {useTranslations} from "next-intl";
import {BlueButton} from "@/components/Global/BlueButton";

export type ErrorModalProps = {
    error: string;
    setClose: () => void;
}

export const ErrorModal = (props: ErrorModalProps) => {
    const t = useTranslations();

    return (
        <div className="flex justify-center items-center absolute z-50 w-screen h-screen backdrop-blur-2xl">
            <div className="flex flex-col gap-4 bg-blue-500 rounded-2xl items-center justify-center h-full w-full max-w-xl max-h-96 p-10">
                <span className="text-xl font-bold">{t(props.error)}</span>
                <BlueButton
                    label={"OK"}
                    handleClick={props.setClose}
                    customStyles={"border-white border-2 max-w-30"}
                />
            </div>
        </div>
    );
};