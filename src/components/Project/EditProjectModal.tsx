import {BlurryModalBackground} from "@/components/Global/Modal/BlurryModalBackground";
import {BlueButton} from "@/components/Global/RegularButtons/BlueButton";
import {ModalContainer} from "@/components/Global/Modal/ModalContainer";
import {useTranslations} from "next-intl";
import {ModalInput} from "@/components/Global/Inputs/ModalInput";
import {InputError} from "@/components/Global/Inputs/InputError";
import {ProjectErrors} from "@/types/errors";

export type NewProjectModalProps = {
    title: string;
    description: string;
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
    onClose: () => void;
    onSave: () => void;
    errors?: ProjectErrors | null;
}

export const EditProjectModal = (props: NewProjectModalProps) => {
    const t = useTranslations();

    return (
        <BlurryModalBackground>
            <ModalContainer>
                <ModalInput
                    label={t("Project.title")}
                    value={props.title}
                    onChange={(e) => props.setTitle(e.target.value)}
                />
                <InputError error={props.errors?.title}/>
                <ModalInput
                    label={t("Project.description")}
                    value={props.description}
                    onChange={(e) => props.setDescription(e.target.value)}
                />
                <InputError error={props.errors?.description}/>
                <div className="flex w-full justify-center gap-2">
                    <BlueButton
                        label={t("save")}
                        onClick={props.onSave}
                        customStyles={"border-white border-2 max-w-30"}
                    />
                    <BlueButton
                        label={t("close")}
                        onClick={props.onClose}
                        customStyles={"border-white border-2 max-w-30"}
                    />
                </div>
            </ModalContainer>
        </BlurryModalBackground>
    );
};