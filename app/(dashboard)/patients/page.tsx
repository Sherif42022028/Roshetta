import React from "react";
import { RxTag } from "@/components/ui/rx-tag";

export default function PatientsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">ملفات المرضى</h1>
          <p className="text-sm text-muted-foreground mt-1">
            سجلات المرضى وتاريخ الزيارات الطبية
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <table className="w-full text-sm text-right">
          <thead className="bg-primary/5 text-primary font-semibold text-xs border-b border-border">
            <tr>
              <th className="p-3">رقم الملف</th>
              <th className="p-3">اسم المريض</th>
              <th className="p-3">رقم الهاتف</th>
              <th className="p-3">تاريخ الميلاد</th>
              <th className="p-3">تاريخ التسجيل</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            <tr>
              <td className="p-3"><RxTag number="PT-901" /></td>
              <td className="p-3 font-semibold">محمد محمود السيد</td>
              <td className="p-3 font-mono">01012345678</td>
              <td className="p-3 font-mono">1988-04-12</td>
              <td className="p-3 font-mono">2026-01-15</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
