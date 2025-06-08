"use client";

import withAuth from "@/helper/withAuth";
import Footer from "@/components/layout/footer";
import AdminHeader from "@/components/layout/header/admin-header";

 function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col w-full justify-center">
            <AdminHeader />
            <main className="flex-1 w-11/12 mx-auto mt-5">
                {children}
            </main>
            <Footer />
        </div>
    )
}


// import type React from "react";
// import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
// import { AdminSidebar } from "@/components/admin/admin-sidebar";

// function AdminLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <SidebarProvider defaultOpen={true}>
//       <AdminSidebar />
//       <SidebarInset className="bg-background">
//         <div className="flex-1 p-6">{children}</div>
//       </SidebarInset>
//     </SidebarProvider>
//   );
// }
export default withAuth(AdminLayout, ["admin"]);
