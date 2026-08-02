import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "روشتة - نظام إدارة العيادات والملاحظات الطبية",
  description: "منصة إدارة العيادات الذكية، متابعة المرضى والمواعيد، والروشتات الطبية المدعومة بالذكاء الاصطناعي",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-accent selection:text-white">
        {children}
      </body>
    </html>
  );
}
