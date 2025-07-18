import {useTranslations} from "next-intl";
import {BlueButton} from "@/components/Global/RegularButtons/BlueButton";
import {BlurryModalBackground} from "@/components/Global/Modal/BlurryModalBackground";
import {ModalContainer} from "@/components/Global/Modal/ModalContainer";

export type OkModalProps = {
    message: string;
    setClose: () => void;
}

export const OkModal = (props: OkModalProps) => {
    const t = useTranslations();

    return (
        <BlurryModalBackground>
            <ModalContainer>
                <span className="text-xl font-bold mb-4">{t(props.message)}</span>
                <BlueButton
                    label={"OK"}
                    onClick={props.setClose}
                    customStyles={"border-white border-2 max-w-30"}
                />
            </ModalContainer>
        </BlurryModalBackground>
    );
};