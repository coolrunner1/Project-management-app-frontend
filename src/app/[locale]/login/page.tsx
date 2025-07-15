import {AuthContainer} from "@/components/Auth/AuthContainer";

export default function LoginPage() {
    return (
        <AuthContainer>
            <h1 className="font-bold text-center text-2xl mb-5">title</h1>
            <div className="w-full">
                <h3 className='font-bold text-center'>
                    no-account
                    <span

                        className='text-blue-200 hover:text-blue-400 transition duration-200'
                    >
                            register-now
                        </span>
                </h3>
                <div className="px-5 py-7">
                </div>
            </div>
        </AuthContainer>
    );
}