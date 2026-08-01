import React from "react";
import { RxTag } from "@/components/ui/rx-tag";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, FileText, Activity } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">لوحة التحكم الرئيسية</h1>
          <p className="text-sm text-muted-foreground mt-1">
            مرحبًا بك، د. أحمد — عيادة روشتة التخصصية
          </p>
        </div>

        {/* Accent button: EXACTLY 1 per page allowed according to design rule */}
        <button className="bg-accent text-accent-foreground font-semibold px-4 py-2 rounded-md hover:bg-accent/90 transition-colors text-sm shadow-sm">
          + حجز موعد جديد
        </button>
      </div>

      {/* Horizontal status metrics bar (Horizontal strip, avoiding AI-generated 4-box cards style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg border border-border bg-card">
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
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h2 className="text-base font-bold text-foreground">جدول مواعيد اليوم القادمة</h2>
          <span className="text-xs font-mono text-muted-foreground">2026-08-01</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="bg-primary/5 text-primary font-semibold text-xs border-b border-border">
              <tr>
                <th className="p-3">رقم الملف / الروشتة</th>
                <th className="p-3">اسم المريض</th>
                <th className="p-3">الوقت المحدد</th>
                <th className="p-3">مستوى خطورة الغياب</th>
                <th className="p-3">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr>
                <td className="p-3">
                  <RxTag number="RX-10492" />
                </td>
                <td className="p-3 font-semibold">محمد محمود السيد</td>
                <td className="p-3 font-mono">04:30 PM</td>
                <td className="p-3">
                  <Badge variant="warning">HIGH (كهرماني)</Badge>
                </td>
                <td className="p-3">
                  <Badge variant="accent">مؤكد</Badge>
                </td>
              </tr>
              <tr>
                <td className="p-3">
                  <RxTag number="RX-10493" />
                </td>
                <td className="p-3 font-semibold">سارة أحمد علي</td>
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
