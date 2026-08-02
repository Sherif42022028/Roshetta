"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RxTag } from "@/components/ui/rx-tag";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/brand/logo";
import {
  Receipt,
  DollarSign,
  CreditCard,
  Printer,
  X,
  Filter,
  CheckCircle2,
  Calendar,
} from "lucide-react";

interface InvoiceItem {
  id: string;
  patientId: string;
  patientName: string;
  rxNumber: string;
  amount: string;
  paymentMethod: "CASH" | "CARD" | "MIXED";
  paidAt: string;
  status: string;
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<InvoiceItem[]>([
    {
      id: "INV-101",
      patientId: "PT-901",
      patientName: "محمد محمود السيد",
      rxNumber: "RX-10492",
      amount: "150.00",
      paymentMethod: "CASH",
      paidAt: "2026-08-01 16:45",
      status: "مدفوع",
    },
    {
      id: "INV-102",
      patientId: "PT-902",
      patientName: "سارة أحمد علي",
      rxNumber: "RX-10311",
      amount: "150.00",
      paymentMethod: "CASH",
      paidAt: "2026-07-28 17:20",
      status: "مدفوع",
    },
  ]);

  const [filterMethod, setFilterMethod] = useState<string>("الكل");
  const [selectedInvoiceForPrint, setSelectedInvoiceForPrint] = useState<InvoiceItem | null>(null);

  const filteredInvoices = invoices.filter(
    (inv) => filterMethod === "الكل" || inv.paymentMethod === filterMethod
  );

  const totalRevenue = invoices.reduce((acc, inv) => acc + parseFloat(inv.amount), 0);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-primary font-sans">الفواتير والمدفوعات</h1>
          <p className="text-sm text-muted-foreground mt-1">
            سجل الفواتير وتحصيل رسوم الكشف والإعادات المربوطة برقم الملف الطبي الدائم
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="bg-card border border-border text-foreground hover:bg-muted font-semibold px-3.5 py-2 rounded-md transition-colors text-xs inline-flex items-center gap-1.5"
        >
          <Printer className="w-4 h-4 text-muted-foreground" />
          طباعة التقرير المالي اليومي
        </button>
      </div>

      {/* Financial Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border border-border bg-card shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground">إجمالي المتحصلات اليوم</span>
            <p className="text-2xl font-bold font-mono text-primary mt-1">{totalRevenue.toFixed(2)} EGP</p>
          </div>
          <div className="p-2.5 rounded bg-primary/10 text-primary">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-lg border border-border bg-card shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground">تحصيل نقدي (CASH)</span>
            <p className="text-2xl font-bold font-mono text-foreground mt-1">{totalRevenue.toFixed(2)} EGP</p>
          </div>
          <div className="p-2.5 rounded bg-accent/15 text-accent">
            <Receipt className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-lg border border-border bg-card shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground">تحصيل بطاقات (CARD)</span>
            <p className="text-2xl font-bold font-mono text-foreground mt-1">0.00 EGP</p>
          </div>
          <div className="p-2.5 rounded bg-primary/10 text-primary">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Invoices Directory Table */}
      <div className="rounded-lg border border-border bg-card p-4 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-border pb-3">
          <h3 className="font-bold text-foreground font-sans">سجل الفواتير والمعاملات</h3>

          {/* Filter Options */}
          <div className="flex items-center gap-2 text-xs">
            <Filter className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">طريقة الدفع:</span>
            {["الكل", "CASH", "CARD"].map((method) => (
              <button
                key={method}
                onClick={() => setFilterMethod(method)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  filterMethod === method
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "bg-background border border-border text-foreground hover:bg-muted"
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="bg-primary/5 text-primary font-semibold text-xs border-b border-border">
              <tr>
                <th className="p-3">رقم الملف الطبي الثابت</th>
                <th className="p-3">اسم المريض</th>
                <th className="p-3">رقم الروشتة</th>
                <th className="p-3">المبلغ (EGP)</th>
                <th className="p-3">طريقة الدفع</th>
                <th className="p-3">تاريخ الدفع</th>
                <th className="p-3 text-center">إيصال التحصيل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-primary/5 transition-colors">
                  <td className="p-3">
                    <RxTag number={inv.patientId} />
                  </td>
                  <td className="p-3 font-semibold">
                    <Link href={`/patients/${inv.patientId}`} className="hover:text-primary transition-colors">
                      {inv.patientName}
                    </Link>
                  </td>
                  <td className="p-3 font-mono text-xs text-muted-foreground">{inv.rxNumber}</td>
                  <td className="p-3 font-mono font-bold text-primary">{inv.amount}</td>
                  <td className="p-3">
                    <Badge variant="default">{inv.paymentMethod}</Badge>
                  </td>
                  <td className="p-3 font-mono text-xs">{inv.paidAt}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => setSelectedInvoiceForPrint(inv)}
                      className="text-xs font-semibold text-primary hover:text-accent border border-primary/20 hover:border-accent px-2.5 py-1 rounded inline-flex items-center gap-1"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      طباعة الإيصال
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Receipt Modal */}
      {selectedInvoiceForPrint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md bg-card rounded-lg border border-border p-6 space-y-5 shadow-2xl text-right relative">
            <button
              onClick={() => setSelectedInvoiceForPrint(null)}
              className="absolute left-4 top-4 p-1.5 text-muted-foreground hover:text-foreground rounded"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex justify-between items-center border-b border-border pb-3">
              <Logo />
              <div className="text-left">
                <span className="text-xs font-bold text-primary block">إيصال تحصيل نقدية</span>
                <span className="text-[10px] font-mono text-muted-foreground">{selectedInvoiceForPrint.id}</span>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between p-2.5 bg-primary/5 rounded text-xs">
                <span className="text-muted-foreground font-semibold">اسم المريض:</span>
                <span className="font-bold text-foreground">{selectedInvoiceForPrint.patientName}</span>
              </div>

              <div className="flex justify-between p-2.5 bg-primary/5 rounded text-xs">
                <span className="text-muted-foreground font-semibold">رقم الملف الطبي الثابت:</span>
                <RxTag number={selectedInvoiceForPrint.patientId} />
              </div>

              <div className="flex justify-between p-2.5 bg-primary/5 rounded text-xs">
                <span className="text-muted-foreground font-semibold">طريقة الدفع والتاريخ:</span>
                <span className="font-mono text-foreground">{selectedInvoiceForPrint.paymentMethod} • {selectedInvoiceForPrint.paidAt}</span>
              </div>

              <div className="p-4 rounded border border-dashed border-primary/40 bg-background text-center space-y-1">
                <span className="text-xs text-muted-foreground block">إجمالي المبلغ الخالص</span>
                <span className="text-3xl font-bold font-mono text-primary">{selectedInvoiceForPrint.amount} EGP</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex justify-between items-center text-xs">
              <div className="flex items-center gap-1.5 text-accent font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>خالص وسديد</span>
              </div>
              <button
                onClick={() => window.print()}
                className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded text-xs inline-flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                طباعة الإيصال
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
