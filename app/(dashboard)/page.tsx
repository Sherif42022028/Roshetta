"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RxTag } from "@/components/ui/rx-tag";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  FileText,
  Activity,
  Plus,
  UserPlus,
  Printer,
  Clock,
  CheckCircle2,
  Stethoscope,
  ChevronRight,
  Filter,
} from "lucide-react";

export default function DashboardPage() {
  const [appointments, setAppointments] = useState([
    {
      id: "APT-201",
      patientId: "PT-901",
      patientName: "محمد محمود السيد",
      rxNumber: "RX-10492",
      time: "04:30 PM",
      noshowRisk: "HIGH",
      status: "في الكشف",
      visitType: "إعادة / متابعة",
    },
    {
      id: "APT-202",
      patientId: "PT-902",
      patientName: "سارة أحمد علي",
      rxNumber: "RX-10493",
      time: "05:00 PM",
      noshowRisk: "LOW",
      status: "في الانتظار",
      visitType: "كشف جديد",
    },
    {
      id: "APT-203",
      patientId: "PT-903",
      patientName: "محمود حسن مصطفى",
      rxNumber: "RX-10494",
      time: "05:30 PM",
      noshowRisk: "LOW",
      status: "مؤكد",
      visitType: "كشف جديد",
    },
  ]);

  const [statusFilter, setStatusFilter] = useState("الكل");

  const handleStatusChange = (id: string, newStatus: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
    );
  };

  const filteredAppointments = appointments.filter(
    (apt) => statusFilter === "الكل" || apt.status === statusFilter
  );

  return (
    <div className="space-y-6">
      {/* Top Header & Quick Action Ribbon */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-primary font-sans">لوحة التحكم الرئيسية</h1>
          <p className="text-sm text-muted-foreground mt-1">
            مرحبًا بك، د. أحمد — عيادة روشتة التخصصية (نظام إدارة العيادة المباشر)
          </p>
        </div>

        {/* Quick Actions Ribbon */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/booking"
            className="bg-accent text-accent-foreground font-semibold px-3.5 py-2 rounded-md hover:bg-accent/90 transition-colors text-xs shadow-sm inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            حجز موعد جديد
          </Link>
          <Link
            href="/patients"
            className="bg-primary/10 text-primary border border-primary/20 font-semibold px-3.5 py-2 rounded-md hover:bg-primary/15 transition-colors text-xs inline-flex items-center gap-1.5"
          >
            <UserPlus className="w-4 h-4" />
            تسجيل مريض جديد
          </Link>
          <button
            onClick={() => window.print()}
            className="bg-card border border-border text-foreground hover:bg-muted font-semibold px-3 py-2 rounded-md transition-colors text-xs inline-flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4 text-muted-foreground" />
            طباعة تقرير اليوم
          </button>
        </div>
      </div>

      {/* Live Queue Monitor Bar (مباشر من العيادة) */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
            </span>
            <h3 className="font-bold text-primary text-sm font-sans">مراقب غرفة الكشف المباشر (Live Queue Monitor)</h3>
          </div>
          <span className="text-xs font-mono text-muted-foreground">متوسط زمن الكشف: 15 دقيقة</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-card rounded border border-border flex items-center justify-between">
            <div>
              <span className="text-muted-foreground block text-[11px] font-semibold">في غرفة الكشف حالياً:</span>
              <span className="font-bold text-foreground text-sm">محمد محمود السيد</span>
            </div>
            <RxTag number="PT-901" />
          </div>

          <div className="p-3 bg-card rounded border border-border flex items-center justify-between">
            <div>
              <span className="text-muted-foreground block text-[11px] font-semibold">المريض التالي في الانتظار:</span>
              <span className="font-bold text-foreground text-sm">سارة أحمد علي</span>
            </div>
            <RxTag number="PT-902" />
          </div>

          <div className="p-3 bg-card rounded border border-border flex items-center justify-between">
            <div>
              <span className="text-muted-foreground block text-[11px] font-semibold">إجمالي الحالات اليوم:</span>
              <span className="font-bold font-mono text-primary text-sm">18 حالة (12 مكتمل)</span>
            </div>
            <Badge variant="accent">94% حضور</Badge>
          </div>
        </div>
      </div>

      {/* Overview Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border border-border bg-card shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">مواعيد اليوم</p>
            <p className="text-2xl font-bold font-mono text-foreground mt-1">18</p>
          </div>
          <div className="p-2.5 rounded bg-primary/10 text-primary">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-lg border border-border bg-card shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">المرضى الجدد</p>
            <p className="text-2xl font-bold font-mono text-foreground mt-1">05</p>
          </div>
          <div className="p-2.5 rounded bg-primary/10 text-primary">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-lg border border-border bg-card shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">الروشتات المعتمدة</p>
            <p className="text-2xl font-bold font-mono text-foreground mt-1">12</p>
          </div>
          <div className="p-2.5 rounded bg-primary/10 text-primary">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-lg border border-border bg-card shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">معدل الحضور التقديري</p>
            <p className="text-2xl font-bold font-mono text-foreground mt-1">94%</p>
          </div>
          <div className="p-2.5 rounded bg-accent/15 text-accent">
            <Activity className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Appointments Interactive Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm space-y-3 p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-primary" />
            <h2 className="text-base font-bold text-foreground font-sans">جدول مواعيد وقائمة انتظار اليوم</h2>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">تصفية:</span>
            {["الكل", "في الكشف", "في الانتظار", "مؤكد", "مكتمل"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`text-xs px-2.5 py-1 rounded transition-colors ${
                  statusFilter === status
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "bg-background border border-border text-foreground hover:bg-muted"
                }`}
              >
                {status}
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
                <th className="p-3">نوع الزيارة</th>
                <th className="p-3">رقم الروشتة/الكشف</th>
                <th className="p-3">التوقيت</th>
                <th className="p-3">تقييم الغياب</th>
                <th className="p-3">حالة المريض الحالية</th>
                <th className="p-3 text-center">إجراء سريع</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredAppointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-primary/5 transition-colors">
                  <td className="p-3">
                    <RxTag number={apt.patientId} />
                  </td>
                  <td className="p-3 font-semibold">
                    <Link href={`/patients/${apt.patientId}`} className="hover:text-primary transition-colors">
                      {apt.patientName}
                    </Link>
                  </td>
                  <td className="p-3">
                    <span className="text-xs bg-background px-2 py-0.5 rounded border border-border text-foreground/80">
                      {apt.visitType}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-xs text-muted-foreground">{apt.rxNumber}</td>
                  <td className="p-3 font-mono text-xs">{apt.time}</td>
                  <td className="p-3">
                    <Badge variant={apt.noshowRisk === "HIGH" ? "warning" : "default"}>
                      {apt.noshowRisk}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <select
                      value={apt.status}
                      onChange={(e) => handleStatusChange(apt.id, e.target.value)}
                      className={`text-xs font-semibold px-2 py-1 rounded border transition-colors ${
                        apt.status === "في الكشف"
                          ? "bg-accent/15 text-accent border-accent/30"
                          : apt.status === "في الانتظار"
                          ? "bg-warning/15 text-warning border-warning/30"
                          : apt.status === "مكتمل"
                          ? "bg-primary/10 text-primary border-primary/20"
                          : "bg-background text-foreground border-border"
                      }`}
                    >
                      <option value="مؤكد">مؤكد</option>
                      <option value="في الانتظار">في الانتظار</option>
                      <option value="في الكشف">في الكشف</option>
                      <option value="مكتمل">مكتمل</option>
                    </select>
                  </td>
                  <td className="p-3 text-center">
                    <Link
                      href="/consultation"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-accent border border-primary/20 hover:border-accent px-2 py-1 rounded"
                    >
                      <span>شاشة الكشف</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
