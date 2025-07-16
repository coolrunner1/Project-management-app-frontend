import {MouseEventHandler} from "react";

export type ButtonComponentProps = {
    title: string,
    value?: string,
    onClick?: MouseEventHandler<HTMLButtonElement>,
}

export const BlurryButton = (props: ButtonComponentProps) => {
    return (
        <button
            className="p-2 rounded-lg shadow backdrop-blur-xl bg-[#0000001f] hover:bg-[#0000003f] transition duration-200"
            onClick={props.onClick}
        >
            {props.title}
        </button>
    );
};