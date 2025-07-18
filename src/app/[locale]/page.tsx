import Link from "next/link";
import {useTranslations} from "next-intl";

export default function Home() {
    const t = useTranslations("Landing")

    return (
        <main className="bg-white text-gray-900">
            <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-blue-100 via-white to-pink-100">
                <h1 className="text-3xl font-bold leading-tight sm:text-6xl mb-4">
                    {t('manage-projects')} <span className="text-blue-600 hover:animate-pulse">{t("beautifully")}</span>
                </h1>
                <p className="text-xl max-w-xl mb-8 text-gray-600">
                    {t('description')}
                </p>
                <Link
                    className="p-4 min-w-28 rounded-lg hover:animate-bounce bg-gradient-to-br from-blue-100 via-white to-pink-100"
                    href="/login"
                >
                    {t('get-started')}
                </Link>
            </section>
        </main>
    );
}
