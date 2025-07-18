import {BlurryModalBackground} from "@/components/Global/Modal/BlurryModalBackground";
import {BlueButton} from "@/components/Global/RegularButtons/BlueButton";
import {ModalContainer} from "@/components/Global/Modal/ModalContainer";
import {useTranslations} from "next-intl";
import {ModalInput} from "@/components/Global/Inputs/ModalInput";
import {InputError} from "@/components/Global/Inputs/InputError";
import {EditProjectOrTaskModalProps} from "@/components/Dashboard/Project/EditProjectModal";

export const CreateTaskModal = (props: EditProjectOrTaskModalProps) => {
    const t = useTranslations();

    return (
        <BlurryModalBackground>
            <ModalContainer>
                <ModalInput
                    label={t("Tasks.title")}
                    value={props.title}
                    onChange={(e) => props.setTitle(e.target.value)}
                />
                <InputError error={props.errors?.title}/>
                <ModalInput
                    label={t("Tasks.description")}
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