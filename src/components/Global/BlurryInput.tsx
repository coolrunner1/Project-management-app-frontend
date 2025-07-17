import {ChangeEvent, KeyboardEvent, Ref} from "react";

export type BlurryInputProps = {
    ref?: Ref<HTMLInputElement>;
    invalid?: boolean;
    label: string,
    type: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void,
}

export const BlurryInput = (
    props: BlurryInputProps
) => {
    return (
        <>
            <label className="font-semibold text-sm pb-1 block">{props.label}</label>
            <input
                ref={props.ref}
                type={!props.invalid ? props.type : 'text'}
                value={props.value}
                onChange={props.onChange}
                onKeyDown={props.onKeyDown}
                className={`bg-[#1447e65f] border border-[#1447e65f] rounded-lg px-3 py-2 mt-1 text-sm w-full ${props.invalid ? 'text-red-600 border-red-600' : ''}`}
            />
        </>
    );
};