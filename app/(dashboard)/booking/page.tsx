"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RxTag } from "@/components/ui/rx-tag";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Filter, User } from "lucide-react";

export default function BookingPage() {
  const [appointments, setAppointments] = useState([
    {
      id: "APT-201",
      patientId: "PT-901",
      patientName: "محمد محمود السيد",
      phone: "01012345678",
      scheduledAt: "2026-08-01 16:30",
      visitType: "إعادة / استشارة",
      noshowRisk: "HIGH",
      status: "مؤكد",
      rxNumber: "RX-10492",
    },
    {
      id: "APT-202",
      patientId: "PT-902",
      patientName: "سارة أحمد علي",
      phone: "01198765432",
      scheduledAt: "2026-08-01 17:00",
      visitType: "كشف جديد",
      noshowRisk: "LOW",
      status: "مؤكد",
      rxNumber: "RX-10493",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [patientId, setPatientId] = useState("PT-901");
  const [patientName, setPatientName] = useState("محمد محمود السيد");
  const [phone, setPhone] = useState("01012345678");
  const [time, setTime] = useState("05:30 PM");
  const [visitType, setVisitType] = useState("إعادة / استشارة");
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const newRxNumber = `RX-${Math.floor(10000 + Math.random() * 90000)}`;
    const risk = isFirstVisit ? "MEDIUM" : visitType === "إعادة / استشارة" ? "LOW" : "HIGH";

    const newApt = {
      id: `APT-${Math.floor(200 + Math.random() * 800)}`,
      patientId: patientId || "PT-901",
      patientName,
      phone,
      scheduledAt: `2026-08-01 ${time}`,
      visitType,
      noshowRisk: risk,
      status: "مؤكد",
      rxNumber: newRxNumber,
    };

    setAppointments([newApt, ...appointments]);
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-primary font-sans">حجز المواعيد والإعادات</h1>
          <p className="text-sm text-muted-foreground mt-1">
            إدارة مواعيد الكشف والإعادات وتتبع احتمالات الغياب (No-show Risk)
          </p>
        </div>

        {/* Accent button: EXACTLY 1 per page */}
        <button
          onClick={() => setShowModal(true)}
          className="bg-accent text-accent-foreground font-semibold px-4 py-2 rounded-md hover:bg-accent/90 transition-colors text-sm shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          حجز موعد جديد
        </button>
      </div>

      {/* Appointments List Card */}
      <div className="rounded-lg border border-border bg-card p-4 space-y-4 shadow-sm">
        <div className="flex justify-between items-center border-b border-border pb-3">
          <h3 className="font-bold text-foreground font-sans">جدول الحجوزات اليومي</h3>
          <span className="font-mono text-xs text-muted-foreground">التاريخ: 2026-08-01</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="bg-primary/5 text-primary font-semibold text-xs border-b border-border">
              <tr>
                <th className="p-3">رقم الروشتة</th>
                <th className="p-3">اسم المريض</th>
                <th className="p-3">نوع الزيارة</th>
                <th className="p-3">رقم الهاتف</th>
                <th className="p-3">تاريخ ووقت الموعد</th>
                <th className="p-3">تقييم الغياب</th>
                <th className="p-3">الحالة</th>
                <th className="p-3 text-center">الملف الطبي</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {appointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-primary/5 transition-colors">
                  <td className="p-3">
                    <RxTag number={apt.rxNumber} />
                  </td>
                  <td className="p-3 font-semibold">
                    <Link href={`/patients/${apt.patientId}`} className="hover:text-primary transition-colors">
                      {apt.patientName}
                    </Link>
                  </td>
                  <td className="p-3">
                    <span className="text-xs font-semibold text-foreground/80 bg-background px-2 py-0.5 rounded border border-border">
                      {apt.visitType}
                    </span>
                  </td>
                  <td className="p-3 font-mono">{apt.phone}</td>
                  <td className="p-3 font-mono text-xs">{apt.scheduledAt}</td>
                  <td className="p-3">
                    <Badge variant={apt.noshowRisk === "HIGH" ? "warning" : "default"}>
                      {apt.noshowRisk}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <Badge variant="accent">{apt.status}</Badge>
                  </td>
                  <td className="p-3 text-center">
                    <Link
                      href={`/patients/${apt.patientId}`}
                      className="text-xs font-semibold text-primary hover:text-accent border border-primary/20 px-2 py-1 rounded"
                    >
                      فتح الملف
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-card rounded-lg border border-border p-6 space-y-4 shadow-lg text-right">
            <h3 className="font-bold text-lg text-primary border-b border-border pb-2">
              حجز موعد كشف أو إعادة جديد
            </h3>

            <form onSubmit={handleAddAppointment} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">نوع الموعد</label>
                <select
                  value={visitType}
                  onChange={(e) => setVisitType(e.target.value)}
                  className="w-full p-2.5 rounded border border-input bg-background font-sans text-sm"
                >
                  <option value="إعادة / استشارة">إعادة / متابعة (Follow-up)</option>
                  <option value="كشف جديد">كشف جديد (New Consult)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">اسم المريض</label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full p-2.5 rounded border border-input bg-background font-sans text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">رقم الهاتف</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 rounded border border-input bg-background font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">التوقيت</label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-2.5 rounded border border-input bg-background font-mono text-sm"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="firstVisit"
                  checked={isFirstVisit}
                  onChange={(e) => setIsFirstVisit(e.target.checked)}
                  className="rounded border-input text-primary focus:ring-ring"
                />
                <label htmlFor="firstVisit" className="text-xs font-semibold text-foreground">
                  أول زيارة للمريض بالعيادة
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded border border-border text-foreground hover:bg-muted text-xs font-semibold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-accent text-accent-foreground text-xs font-semibold hover:bg-accent/90"
                >
                  تأكيد الحجز
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
