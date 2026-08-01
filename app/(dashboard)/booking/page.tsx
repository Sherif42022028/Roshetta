import React from "react";
import { RxTag } from "@/components/ui/rx-tag";
import { Badge } from "@/components/ui/badge";

export default function BookingPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">جدول حجز المواعيد والتقويم</h1>
          <p className="text-sm text-muted-foreground mt-1">
            إدارة المواعيد والتذكيرات وتقييم احتمال الغياب (No-show Risk)
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-foreground">قائمة الحجوزات</h3>
          <span className="font-mono text-xs text-muted-foreground">التاريخ: 2026-08-01</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="bg-primary/5 text-primary font-semibold text-xs border-b border-border">
              <tr>
                <th className="p-3">رقم الروشتة</th>
                <th className="p-3">اسم المريض</th>
                <th className="p-3">رقم الهاتف</th>
                <th className="p-3">تاريخ ووقت الموعد</th>
                <th className="p-3">تقييم الغياب</th>
                <th className="p-3">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr>
                <td className="p-3"><RxTag number="RX-10492" /></td>
                <td className="p-3 font-semibold">محمد محمود السيد</td>
                <td className="p-3 font-mono">01012345678</td>
                <td className="p-3 font-mono">2026-08-01 16:30</td>
                <td className="p-3"><Badge variant="warning">HIGH</Badge></td>
                <td className="p-3"><Badge variant="accent">مؤكد</Badge></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
