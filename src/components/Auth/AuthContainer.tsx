import {ReactNode} from "react";

export type AuthContainerProps = {
    children: ReactNode;
}

export const AuthContainer = (props: AuthContainerProps) => {
    return (
        <div className="text-white min-h-screen flex flex-col sm:justify-center sm:py-12 bg-center bg-cover" style={{backgroundImage: `url('/login-bg.jpeg')`}}>
            <div className="w-full h-screen sm:w-auto sm:h-auto p-10 xs:p-0 sm:mx-auto md:w-full md:max-w-md sm:rounded-lg sm:shadow backdrop-blur-xl bg-[#0000001f]">
                {props.children}
            </div>
        </div>
    );
}