import React from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import {
  Calendar,
  Users,
  Stethoscope,
  Receipt,
  BarChart3,
  Settings,
  LayoutDashboard,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: "الرئيسية", href: "/", icon: LayoutDashboard },
    { label: "حجز المواعيد", href: "/booking", icon: Calendar },
    { label: "ملفات المرضى", href: "/patients", icon: Users },
    { label: "شاشة الكشف", href: "/consultation", icon: Stethoscope },
    { label: "الفواتير", href: "/invoices", icon: Receipt },
    { label: "التقارير", href: "/reports", icon: BarChart3 },
    { label: "الإعدادات", href: "/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-l border-border bg-card p-4 flex flex-col justify-between shrink-0">
        <div>
          {/* Header Logo */}
          <div className="flex justify-center mb-6 pt-2">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer info */}
        <div className="pt-4 mt-6 border-t border-border/60 text-xs text-muted-foreground text-center">
          <p className="font-mono">Roshetta Clinical AI v0.1</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
