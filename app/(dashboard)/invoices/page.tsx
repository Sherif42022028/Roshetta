import React from "react";
import { RxTag } from "@/components/ui/rx-tag";
import { Badge } from "@/components/ui/badge";

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">الفواتير والمدفوعات</h1>
          <p className="text-sm text-muted-foreground mt-1">
            سجل الفواتير وتحصيل رسوم الكشف والخدمات
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <table className="w-full text-sm text-right">
          <thead className="bg-primary/5 text-primary font-semibold text-xs border-b border-border">
            <tr>
              <th className="p-3">رقم الروشتة المرتبطة</th>
              <th className="p-3">اسم المريض</th>
              <th className="p-3">المبلغ (EGP)</th>
              <th className="p-3">طريقة الدفع</th>
              <th className="p-3">تاريخ الدفع</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            <tr>
              <td className="p-3"><RxTag number="RX-10492" /></td>
              <td className="p-3 font-semibold">محمد محمود السيد</td>
              <td className="p-3 font-mono font-bold">450.00</td>
              <td className="p-3"><Badge variant="default">CASH</Badge></td>
              <td className="p-3 font-mono text-xs">2026-08-01 16:45</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
