import {ButtonProps} from "@/components/Global/RegularButtons/BlueButton";

export const RedButton = (props: ButtonProps) => {
    return (
        <button
            type="button"
            onClick={props.onClick}
            className={(props?.customStyles || "") + " transition duration-200 bg-red-500 hover:bg-red-600 focus:bg-red-700 focus:shadow-sm focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"}
        >
            <span>{props.label}</span>
        </button>
    );
};