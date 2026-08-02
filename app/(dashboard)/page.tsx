import React from "react";
import Link from "next/link";
import { RxTag } from "@/components/ui/rx-tag";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, FileText, Activity } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-primary font-sans">لوحة التحكم الرئيسية</h1>
          <p className="text-sm text-muted-foreground mt-1">
            مرحبًا بك، د. أحمد — عيادة روشتة التخصصية
          </p>
        </div>

        {/* Accent button: EXACTLY 1 per page allowed */}
        <Link
          href="/booking"
          className="bg-accent text-accent-foreground font-semibold px-4 py-2 rounded-md hover:bg-accent/90 transition-colors text-sm shadow-sm inline-flex items-center gap-2"
        >
          + حجز موعد جديد
        </Link>
      </div>

      {/* Horizontal status metrics bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg border border-border bg-card shadow-sm">
        <div className="flex items-center gap-3 p-2">
          <div className="p-2 rounded bg-primary/5 text-primary">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">مواعيد اليوم</p>
            <p className="text-xl font-bold font-mono text-foreground">18</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2 border-r border-border/50">
          <div className="p-2 rounded bg-primary/5 text-primary">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">المرضى الجدد</p>
            <p className="text-xl font-bold font-mono text-foreground">05</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2 border-r border-border/50">
          <div className="p-2 rounded bg-primary/5 text-primary">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">الروشتات المعتمدة</p>
            <p className="text-xl font-bold font-mono text-foreground">12</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2 border-r border-border/50">
          <div className="p-2 rounded bg-primary/5 text-primary">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">معدل الحضور التقديري</p>
            <p className="text-xl font-bold font-mono text-foreground">94%</p>
          </div>
        </div>
      </div>

      {/* Overview Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h2 className="text-base font-bold text-foreground font-sans">جدول مواعيد اليوم القادمة</h2>
          <span className="text-xs font-mono text-muted-foreground">2026-08-01</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="bg-primary/5 text-primary font-semibold text-xs border-b border-border">
              <tr>
                <th className="p-3">رقم الملف الطبي الثابت</th>
                <th className="p-3">اسم المريض</th>
                <th className="p-3">رقم الروشتة/الكشف</th>
                <th className="p-3">الوقت المحدد</th>
                <th className="p-3">تقييم الغياب</th>
                <th className="p-3">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr className="hover:bg-primary/5 transition-colors">
                <td className="p-3">
                  <RxTag number="PT-901" />
                </td>
                <td className="p-3 font-semibold">
                  <Link href="/patients/PT-901" className="hover:text-primary transition-colors">
                    محمد محمود السيد
                  </Link>
                </td>
                <td className="p-3 font-mono text-xs text-muted-foreground">RX-10492</td>
                <td className="p-3 font-mono">04:30 PM</td>
                <td className="p-3">
                  <Badge variant="warning">HIGH</Badge>
                </td>
                <td className="p-3">
                  <Badge variant="accent">مؤكد</Badge>
                </td>
              </tr>
              <tr className="hover:bg-primary/5 transition-colors">
                <td className="p-3">
                  <RxTag number="PT-902" />
                </td>
                <td className="p-3 font-semibold">
                  <Link href="/patients/PT-902" className="hover:text-primary transition-colors">
                    سارة أحمد علي
                  </Link>
                </td>
                <td className="p-3 font-mono text-xs text-muted-foreground">RX-10493</td>
                <td className="p-3 font-mono">05:00 PM</td>
                <td className="p-3">
                  <Badge variant="default">LOW</Badge>
                </td>
                <td className="p-3">
                  <Badge variant="outline">في الانتظار</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
