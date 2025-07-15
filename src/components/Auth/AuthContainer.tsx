import {ReactNode} from "react";

export type AuthContainerProps = {
    children: ReactNode;
}

export const AuthContainer = (props: AuthContainerProps) => {
    return (
        <div className="text-white min-h-screen flex flex-col justify-center sm:py-12 bg-center bg-cover" style={{backgroundImage: `url('/login-bg.jpeg')`}}>
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md rounded-lg shadow backdrop-blur-xl bg-[#0000001f]">
                {props.children}
            </div>
        </div>
    );
}