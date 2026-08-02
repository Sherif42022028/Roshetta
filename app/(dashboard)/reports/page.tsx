"use client";

import React, { useState } from "react";
import { BarChart3, Users, Clock, Calendar, Download, TrendingUp, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("هذا الشهر");

  const handleExportReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-primary font-sans">التقارير والتحليلات الطبية والمالية</h1>
          <p className="text-sm text-muted-foreground mt-1">
            تحليل أداء العيادة، معدلات الحضور والغياب (No-Show)، وإجمالي التحصيلات المالية
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Time Range Selector */}
          <div className="flex items-center gap-1.5 bg-card border border-border rounded-md p-1 text-xs">
            {["اليوم", "هذا الأسبوع", "هذا الشهر"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded font-semibold transition-colors ${
                  timeRange === range
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportReport}
            className="bg-accent text-accent-foreground font-semibold px-4 py-2 rounded-md hover:bg-accent/90 transition-colors text-xs shadow-sm inline-flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            تصدير التقرير الفني
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-lg border border-border bg-card shadow-xs space-y-3">
          <div className="flex justify-between items-center text-primary font-bold text-sm">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span>إجمالي الإيرادات</span>
            </div>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-mono">+12.5%</span>
          </div>
          <p className="text-3xl font-bold font-mono text-foreground">42,500 EGP</p>
          <p className="text-xs text-muted-foreground">تحصيل الكشوفات والإعادات لـ {timeRange}</p>
        </div>

        <div className="p-5 rounded-lg border border-border bg-card shadow-xs space-y-3">
          <div className="flex justify-between items-center text-primary font-bold text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>إجمالي الزيارات والكشوفات</span>
            </div>
            <span className="text-xs bg-accent/15 text-accent px-2 py-0.5 rounded font-mono">142 حالة</span>
          </div>
          <p className="text-3xl font-bold font-mono text-foreground">142</p>
          <p className="text-xs text-muted-foreground">يشمل 94 كشف جديد و 48 كشف إعادة</p>
        </div>

        <div className="p-5 rounded-lg border border-border bg-card shadow-xs space-y-3">
          <div className="flex justify-between items-center text-warning font-bold text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>معدل غياب المرضى (No-Show)</span>
            </div>
            <span className="text-xs bg-warning/15 text-warning px-2 py-0.5 rounded font-mono">منخفض</span>
          </div>
          <p className="text-3xl font-bold font-mono text-foreground">6.2%</p>
          <p className="text-xs text-muted-foreground">تحسن بنسبة 4% بفضل تذكيرات الواتساب التلقائية</p>
        </div>
      </div>

      {/* Analytics Breakdown Visual Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Attendance Breakdown */}
        <div className="rounded-lg border border-border bg-card p-5 space-y-4 shadow-sm">
          <h3 className="font-bold text-foreground text-sm font-sans flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent" />
            تحليل معدلات الحضور والالتزام بالمواعيد
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>حضور في الموعد المحدد</span>
                <span className="font-mono text-primary">82% (116 مريض)</span>
              </div>
              <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "82%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>إعادة جدولة أو تأخير</span>
                <span className="font-mono text-accent">11.8% (17 مريض)</span>
              </div>
              <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                <div className="bg-accent h-full rounded-full" style={{ width: "11.8%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>غياب بدون إخطار (No-Show)</span>
                <span className="font-mono text-warning">6.2% (9 مرضى)</span>
              </div>
              <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                <div className="bg-warning h-full rounded-full" style={{ width: "6.2%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Visit Types Breakdown */}
        <div className="rounded-lg border border-border bg-card p-5 space-y-4 shadow-sm">
          <h3 className="font-bold text-foreground text-sm font-sans flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            توزيع أنواع الكشوفات والإعادات
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>كشف أول جديد (Initial Consults)</span>
                <span className="font-mono text-foreground">66% (94 حالة)</span>
              </div>
              <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "66%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>إعادات ومتابعة دورية (Re-visits / Follow-ups)</span>
                <span className="font-mono text-accent">34% (48 حالة)</span>
              </div>
              <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                <div className="bg-accent h-full rounded-full" style={{ width: "34%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
