import {ButtonProps} from "@/components/Global/RegularButtons/BlueButton";

export const SmallGreenButton = (
    props: ButtonProps
) => {
    return (
        <>
            <button
                type="button"
                onClick={props.onClick}
                className="m-auto w-28 text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
                {props.label}
            </button>
        </>
    )
}