"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RxTag } from "@/components/ui/rx-tag";
import {
  Search,
  Plus,
  UserCheck,
  Calendar,
  ArrowLeft,
  ShieldCheck,
  Download,
  Users,
  UserPlus,
  Activity,
} from "lucide-react";

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "visits" | "name">("recent");
  
  const [patients, setPatients] = useState([
    {
      id: "PT-901",
      name: "محمد محمود السيد",
      phone: "01012345678",
      dateOfBirth: "1988-04-12",
      registeredAt: "2026-01-15",
      visitsCount: 3,
      lastVisitDate: "2026-08-01",
    },
    {
      id: "PT-902",
      name: "سارة أحمد علي",
      phone: "01198765432",
      dateOfBirth: "1994-09-20",
      registeredAt: "2026-02-10",
      visitsCount: 2,
      lastVisitDate: "2026-07-28",
    },
    {
      id: "PT-903",
      name: "محمود حسن مصطفى",
      phone: "01234567890",
      dateOfBirth: "1975-11-05",
      registeredAt: "2026-04-18",
      visitsCount: 1,
      lastVisitDate: "2026-07-12",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newDob, setNewDob] = useState("");

  const handleExportCSV = () => {
    const headers = "Patient ID,Name,Phone,DOB,Total Visits,Last Visit Date\n";
    const rows = patients
      .map(
        (p) => `${p.id},"${p.name}",${p.phone},${p.dateOfBirth},${p.visitsCount},${p.lastVisitDate}`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Roshetta_Patients_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredPatients = patients
    .filter(
      (p) =>
        p.name.includes(searchQuery) ||
        p.phone.includes(searchQuery) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "visits") return b.visitsCount - a.visitsCount;
      if (sortBy === "name") return a.name.localeCompare(b.name, "ar");
      return new Date(b.lastVisitDate).getTime() - new Date(a.lastVisitDate).getTime();
    });

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    const nextSeq = 900 + patients.length + 1;
    const newId = `PT-${nextSeq}`;

    const newPatient = {
      id: newId,
      name: newName,
      phone: newPhone,
      dateOfBirth: newDob || "1990-01-01",
      registeredAt: new Date().toISOString().split("T")[0],
      visitsCount: 1,
      lastVisitDate: new Date().toISOString().split("T")[0],
    };

    setPatients([newPatient, ...patients]);
    setShowAddModal(false);
    setNewName("");
    setNewPhone("");
    setNewDob("");
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-primary font-sans">دليل السجلات والملفات الطبية الدائمة</h1>
          <p className="text-sm text-muted-foreground mt-1">
            إدارة أرقام الملفات الطبية الموحدة (Patient File IDs) المخصصة لكل مريض بصورة دائمة
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="bg-card border border-border text-foreground hover:bg-muted font-semibold px-3 py-2 rounded-md transition-colors text-xs inline-flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-muted-foreground" />
            تصدير الملفات (CSV)
          </button>

          {/* Accent Action Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-accent text-accent-foreground font-semibold px-4 py-2 rounded-md hover:bg-accent/90 transition-colors text-sm shadow-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            تسجيل مريض جديد
          </button>
        </div>
      </div>

      {/* Quick Patients Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border border-border bg-card shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground">إجمالي المرضى المسجلين</span>
            <p className="text-2xl font-bold font-mono text-foreground mt-1">{patients.length}</p>
          </div>
          <div className="p-2.5 rounded bg-primary/10 text-primary">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-lg border border-border bg-card shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground">المرضى النشطون هذا الشهر</span>
            <p className="text-2xl font-bold font-mono text-foreground mt-1">2</p>
          </div>
          <div className="p-2.5 rounded bg-accent/15 text-accent">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-lg border border-border bg-card shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground">نسبة المرضى الجدد</span>
            <p className="text-2xl font-bold font-mono text-foreground mt-1">33%</p>
          </div>
          <div className="p-2.5 rounded bg-primary/10 text-primary">
            <UserPlus className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Security & Data Integrity Banner */}
      <div className="p-3 bg-primary/5 rounded-md border border-primary/20 flex items-center gap-2 text-xs text-primary">
        <ShieldCheck className="w-4 h-4 shrink-0" />
        <span>
          نظام حماية البيانات: رقم الملف الطبي (Patient File ID) يصدر بشكل دائم ولا يتغير في أي كشف أو إعادة أو فاتورة لاحقة.
        </span>
      </div>

      {/* Search & Sort Controls Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث برقم الملف الطبي الثابت (e.g. PT-901)، اسم المريض، أو رقم الهاتف..."
            className="w-full pr-10 pl-4 py-2.5 rounded-md border border-input bg-card text-sm font-sans focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground font-semibold">ترتيب حسب:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="p-2 rounded border border-input bg-card text-sm font-sans"
          >
            <option value="recent">أحدث زيارة</option>
            <option value="visits">عدد الزيارات الإجمالي</option>
            <option value="name">أبجدي بالاسم</option>
          </select>
        </div>
      </div>

      {/* Patients Directory Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="bg-primary/5 text-primary font-semibold text-xs border-b border-border">
              <tr>
                <th className="p-3">رقم الملف الطبي الثابت</th>
                <th className="p-3">اسم المريض</th>
                <th className="p-3">رقم الهاتف</th>
                <th className="p-3">تاريخ الميلاد</th>
                <th className="p-3">عدد الزيارات الإجمالي</th>
                <th className="p-3">آخر زيارة</th>
                <th className="p-3 text-center">الملف الطبي</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-primary/5 transition-colors">
                  <td className="p-3">
                    <RxTag number={patient.id} />
                  </td>
                  <td className="p-3 font-semibold">
                    <Link
                      href={`/patients/${patient.id}`}
                      className="text-foreground hover:text-primary hover:underline transition-colors"
                    >
                      {patient.name}
                    </Link>
                  </td>
                  <td className="p-3 font-mono">{patient.phone}</td>
                  <td className="p-3 font-mono">{patient.dateOfBirth}</td>
                  <td className="p-3 font-mono">
                    <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-0.5 rounded-sm font-bold text-xs">
                      {patient.visitsCount} زيارة
                    </span>
                  </td>
                  <td className="p-3 font-mono text-muted-foreground">{patient.lastVisitDate}</td>
                  <td className="p-3 text-center">
                    <Link
                      href={`/patients/${patient.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-accent transition-colors border border-primary/20 hover:border-accent px-2.5 py-1 rounded"
                    >
                      <span>عرض السجل</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-card rounded-lg border border-border p-6 space-y-4 shadow-lg text-right">
            <div className="flex justify-between items-center border-b border-border pb-2">
              <h3 className="font-bold text-lg text-primary">تسجيل ملف مريض جديد</h3>
              <RxTag number={`PT-${900 + patients.length + 1}`} />
            </div>

            <form onSubmit={handleAddPatient} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">اسم المريض ثلاثي/رباعي</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="محمد أحمد المحمود"
                  className="w-full p-2.5 rounded border border-input bg-background font-sans text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">رقم الهاتف للواتساب</label>
                <input
                  type="text"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="010XXXXXXXX"
                  className="w-full p-2.5 rounded border border-input bg-background font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">تاريخ الميلاد</label>
                <input
                  type="date"
                  value={newDob}
                  onChange={(e) => setNewDob(e.target.value)}
                  className="w-full p-2.5 rounded border border-input bg-background font-mono text-sm"
                />
              </div>

              <div className="p-2.5 bg-primary/5 rounded border border-primary/20 text-xs text-primary">
                سيتم إصدار رقم الملف الطبي الثابت <span className="font-bold font-mono text-accent">PT-{900 + patients.length + 1}</span> وربطه بكافة الزيارات القادمة.
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded border border-border text-foreground hover:bg-muted text-xs font-semibold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-accent text-accent-foreground text-xs font-semibold hover:bg-accent/90"
                >
                  تأكيد وحفظ الملف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
