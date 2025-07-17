import {ReactNode} from "react";
import {BlurryButton} from "@/components/Global/BlurryButton";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";

export type AuthContainerProps = {
    children: ReactNode;
}

export const AuthContainer = (props: AuthContainerProps) => {
    const t = useTranslations()

    return (
        <div className="text-white min-h-screen flex flex-col sm:justify-center sm:py-12 bg-center bg-cover" style={{backgroundImage: `url('/login-bg.jpeg')`}}>
            <div className='absolute z-40 top-0 left-0 m-2 sm:m-5'>
                <Link href="/">
                    <BlurryButton
                        title={t('home')}
                    />
                </Link>
            </div>
            <div className='absolute z-99 top-0 right-0 m-2 sm:m-5'>
                {/*<Link href="#" locale={"ru"}>
                    <BlurryButton
                        title={t('change-language')}
                    />
                </Link>*/}
            </div>
            <div className="w-full h-screen pt-14 sm:pt-auto sm:w-auto sm:h-auto p-10 xs:p-0 sm:mx-auto md:w-full md:max-w-md sm:rounded-lg sm:shadow backdrop-blur-xl bg-[#0000001f]">
                {props.children}
            </div>
        </div>
    );
}