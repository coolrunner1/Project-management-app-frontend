import {InputProps} from "@/components/Global/Inputs/BlurryInput";

export const ModalInput = (
    props: InputProps,
) => {
    return (
        <>
            <label className="font-semibold text-md block">{props.label}</label>
            <input
                ref={props.ref}
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                onKeyDown={props.onKeyDown}
                className={`border-white border-2 rounded-lg px-3 py-2 mt-1 text-sm w-full`}
            />
        </>
    );
};