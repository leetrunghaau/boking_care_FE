import Footer from "@/components/layout/footer";
import MainHeader from "@/components/layout/header/main-header";

export default function DoctorsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col w-full justify-center">
            <MainHeader />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}