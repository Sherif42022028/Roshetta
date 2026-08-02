import React from "react";
import Link from "next/link";
import { RxTag } from "@/components/ui/rx-tag";
import { Badge } from "@/components/ui/badge";

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-primary font-sans">الفواتير والمدفوعات</h1>
          <p className="text-sm text-muted-foreground mt-1">
            سجل الفواتير وتحصيل رسوم الكشف والإعادات المربوطة برقم الملف الطبي الدائم
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
        <table className="w-full text-sm text-right">
          <thead className="bg-primary/5 text-primary font-semibold text-xs border-b border-border">
            <tr>
              <th className="p-3">رقم الملف الطبي الثابت</th>
              <th className="p-3">اسم المريض</th>
              <th className="p-3">رقم الروشتة</th>
              <th className="p-3">المبلغ (EGP)</th>
              <th className="p-3">طريقة الدفع</th>
              <th className="p-3">تاريخ الدفع</th>
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
              <td className="p-3 font-mono font-bold">150.00</td>
              <td className="p-3"><Badge variant="default">CASH</Badge></td>
              <td className="p-3 font-mono text-xs">2026-08-01 16:45</td>
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
              <td className="p-3 font-mono text-xs text-muted-foreground">RX-10311</td>
              <td className="p-3 font-mono font-bold">150.00</td>
              <td className="p-3"><Badge variant="default">CASH</Badge></td>
              <td className="p-3 font-mono text-xs">2026-07-28 17:20</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
