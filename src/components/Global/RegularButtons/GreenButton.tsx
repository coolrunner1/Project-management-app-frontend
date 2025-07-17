import {ButtonProps} from "@/components/Global/RegularButtons/BlueButton";

export const GreenButton = (props: ButtonProps) => {
    return (
        <button
            type="button"
            onClick={props.onClick}
            className={(props?.customStyles || "") + " transition duration-200 bg-green-500 hover:bg-green-600 focus:bg-green-700 focus:shadow-sm focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"}
        >
            <span>{props.label}</span>
        </button>
    );
};