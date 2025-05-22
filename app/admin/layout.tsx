import Footer from "@/components/layout/footer";
import AdminHeader from "@/components/layout/header/admin-header";

export default function HospitalLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col w-full justify-center">
            <AdminHeader />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}

// "use client"

// import type React from "react"

// import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
// import { AdminSidebar } from "@/components/admin/admin-sidebar"

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <SidebarProvider defaultOpen={true}>
//       <AdminSidebar />
//       <SidebarInset className="bg-background">
//         <div className="flex-1 p-6">{children}</div>
//       </SidebarInset>
//     </SidebarProvider>
//   )
// }
