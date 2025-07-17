import {ButtonProps} from "@/components/Global/RegularButtons/BlueButton";

export const SmallRedButton = (
    props: ButtonProps
) => {
    return (
        <>
            <button
                type="button"
                onClick={props.onClick}
                className="m-auto w-28 text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
                {props.label}
            </button>
        </>
    )
}