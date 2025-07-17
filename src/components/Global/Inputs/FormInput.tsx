import {ChangeEvent} from "react";

export type FormInputProps = {
    name: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    placeholder?: string,
}

export const FormInput = (props: FormInputProps) => {
    return (
        <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
                <label
                    className="block uppercase text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                    {props.name}
                </label>
                <input
                    type="text"
                    className="bg-container border-0 px-3 py-3 rounded text-sm shadow-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={props.value}
                    onChange={props.onChange}
                    placeholder={props.placeholder}
                />
            </div>
        </div>
    )
}