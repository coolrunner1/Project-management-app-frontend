import {Link} from "@/i18n/navigation";
import {ReactNode} from "react";

export type EntryContainerProps = {
    href: string;
    children: ReactNode;
}

export const EntryContainer = (props: EntryContainerProps) => {
    return (
        <Link
            href={props.href}
            className="flex flex-col p-5 w-full rounded-2xl bg-container shadow-lg text-wrap truncate"
        >
            {props.children}
        </Link>
    );
};