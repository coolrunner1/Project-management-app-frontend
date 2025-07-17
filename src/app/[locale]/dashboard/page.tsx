"use client"
import {signOut} from "@/utils/tempAuth";

export default function DashboardPage() {
    return (
        <div
            className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <div>Temp dashboard</div>
            <button onClick={signOut}>Sign out</button>
        </div>
    );
}
