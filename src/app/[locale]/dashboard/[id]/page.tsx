"use client"
import {signOut} from "@/utils/tempAuth";

export default function ProjectPage() {
    return (
        <div
            className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <div>Project placeholder</div>
            <button onClick={signOut}>Sign out</button>
        </div>
    );
}
