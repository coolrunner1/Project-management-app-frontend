import {ReactNode} from "react";

export const NavBarButton = (props: {children: ReactNode}) => {
    return (
        <div className="p-3 sm:text-lg border-b-2 border-[#00000000] hover:border-[#202c36] dark:hover:border-white transition-all duration-300 ease-in-out">
            {props.children}
        </div>
    );
};