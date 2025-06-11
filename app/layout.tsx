import type { Metadata } from "next";
import "./globals.css";
import "react-day-picker/style.css";
import { Toaster } from "@/components/ui/toaster";
import { ChatProvider } from "@/components/ho-tro/floating-chat/chat-provider";
export const metadata: Metadata = {
  title: "Med Plus",
  description: "Đặt lịch khám dễ dàng, không cần chờ đợi",
  generator: "Next.js",
  applicationName: "Med Plus",
  keywords: ["Med Plus", "Đặt lịch khám"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex justify-center">
        <ChatProvider
          position="bottom-right"
          primaryColor="bg-teal-600"
          title="AI Helper"
          placeholder="Hãy hỏi tôi bất cứ điều gì..."
          welcomeMessage="Xin chào! Tôi ở đây để hỗ trợ bạn. Bạn cần tôi giúp gì?">
          {children}
        </ChatProvider>
        <Toaster />
      </body>
    </html>
  );
}
