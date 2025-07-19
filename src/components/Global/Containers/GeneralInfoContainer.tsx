import {ReactNode} from "react";

export const GeneralInfoContainer = (props: {children: ReactNode}) => {
    return (
        <div className='flex flex-col justify-center items-center bg-container max-w-7xl mx-auto rounded-2xl shadow-lg p-4'>
            {props.children}
        </div>
    );
};