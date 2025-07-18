import {useTranslations} from "next-intl";
import {BlueButton} from "@/components/Global/RegularButtons/BlueButton";
import {BlurryModalBackground} from "@/components/Global/Modal/BlurryModalBackground";
import {ModalContainer} from "@/components/Global/Modal/ModalContainer";

export type ErrorModalProps = {
    title: string;
    onYesClick: () => void;
    onNoClick: () => void;
}

export const YesNoModal = (props: ErrorModalProps) => {
    const t = useTranslations();

    return (
        <BlurryModalBackground>
            <ModalContainer>
                <span className="text-xl font-bold mb-4">{t(props.title)}</span>
                <div className="flex flex-col items-center justify-center sm:flex-row gap-2 w-full">
                    <BlueButton
                        label={t("yes")}
                        onClick={props.onYesClick}
                        customStyles={"border-white border-2 max-w-30"}
                    />
                    <BlueButton
                        label={t("no")}
                        onClick={props.onNoClick}
                        customStyles={"border-white border-2 max-w-30"}
                    />                </div>
            </ModalContainer>
        </BlurryModalBackground>
    );
};