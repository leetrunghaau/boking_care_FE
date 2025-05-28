'use client'

import Footer from "@/components/layout/footer";
import DoctorHeader from "@/components/layout/header/doctor-header";
import useAuthStore from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
    const { isLoggedIn, role , hasHydrated} = useAuthStore()
    const router = useRouter()
    useEffect(() => {
        if (!hasHydrated) return;
        console.log("checkkkkkkkkkkkk => ", isLoggedIn);

        if (isLoggedIn === false) {
            router.push("/");
        }
    }, [hasHydrated, isLoggedIn]);
    return (
        <div className="flex min-h-screen flex-col w-full justify-center">
            <DoctorHeader />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}