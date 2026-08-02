"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RxTag } from "@/components/ui/rx-tag";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Calendar as CalendarIcon,
  List,
  MessageSquare,
  Check,
  X,
  User,
  Filter,
  Clock,
  Send,
} from "lucide-react";

export default function BookingPage() {
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [appointments, setAppointments] = useState([
    {
      id: "APT-201",
      patientId: "PT-901",
      patientName: "محمد محمود السيد",
      phone: "01012345678",
      scheduledAt: "2026-08-01 16:30",
      visitType: "إعادة / متابعة",
      noshowRisk: "HIGH",
      status: "مؤكد",
      rxNumber: "RX-10492",
      reminderSent: true,
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
      reminderSent: false,
    },
    {
      id: "APT-203",
      patientId: "PT-903",
      patientName: "محمود حسن مصطفى",
      phone: "01234567890",
      scheduledAt: "2026-08-01 17:30",
      visitType: "كشف جديد",
      noshowRisk: "LOW",
      status: "في الانتظار",
      rxNumber: "RX-10494",
      reminderSent: false,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [sendingReminderId, setSendingReminderId] = useState<string | null>(null);

  // Form states
  const [patientId, setPatientId] = useState("PT-901");
  const [patientName, setPatientName] = useState("محمد محمود السيد");
  const [phone, setPhone] = useState("01012345678");
  const [time, setTime] = useState("05:30 PM");
  const [visitType, setVisitType] = useState("إعادة / متابعة");
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  const handleSendReminder = (aptId: string, patientPhone: string) => {
    setSendingReminderId(aptId);
    setTimeout(() => {
      setAppointments((prev) =>
        prev.map((a) => (a.id === aptId ? { ...a, reminderSent: true } : a))
      );
      setSendingReminderId(null);
    }, 1000);
  };

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const newRxNumber = `RX-${Math.floor(10000 + Math.random() * 90000)}`;
    const risk = isFirstVisit ? "MEDIUM" : visitType === "إعادة / متابعة" ? "LOW" : "HIGH";

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
      reminderSent: false,
    };

    setAppointments([newApt, ...appointments]);
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-primary font-sans">جدول حجز المواعيد والإعادات</h1>
          <p className="text-sm text-muted-foreground mt-1">
            إدارة مواعيد الكشف والإعادات الذكية مع التذكر التلقائي عبر الواتساب وتقييم No-show Risk
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center bg-card border border-border rounded-md p-1">
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List className="w-3.5 h-3.5" />
              عرض القائمة
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                viewMode === "calendar" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              عرض التقويم
            </button>
          </div>

          {/* Accent Action Button */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-accent text-accent-foreground font-semibold px-4 py-2 rounded-md hover:bg-accent/90 transition-colors text-sm shadow-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            حجز موعد جديد
          </button>
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === "list" ? (
        <div className="rounded-lg border border-border bg-card p-4 space-y-4 shadow-sm">
          <div className="flex justify-between items-center border-b border-border pb-3">
            <h3 className="font-bold text-foreground font-sans">جدول الحجوزات اليومي التفصيلي</h3>
            <span className="font-mono text-xs text-muted-foreground">التاريخ: 2026-08-01</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="bg-primary/5 text-primary font-semibold text-xs border-b border-border">
                <tr>
                  <th className="p-3">رقم الروشتة</th>
                  <th className="p-3">اسم المريض (رقم الملف)</th>
                  <th className="p-3">نوع الزيارة</th>
                  <th className="p-3">رقم الهاتف</th>
                  <th className="p-3">تاريخ ووقت الموعد</th>
                  <th className="p-3">تقييم الغياب</th>
                  <th className="p-3">تذكير الواتساب</th>
                  <th className="p-3 text-center">الملف الطبي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {appointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-primary/5 transition-colors">
                    <td className="p-3">
                      <RxTag number={apt.rxNumber} />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/patients/${apt.patientId}`} className="font-semibold hover:text-primary transition-colors">
                          {apt.patientName}
                        </Link>
                        <RxTag number={apt.patientId} className="text-[10px] px-1.5 py-0.2" />
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="text-xs font-semibold text-foreground/80 bg-background px-2 py-0.5 rounded border border-border">
                        {apt.visitType}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-xs">{apt.phone}</td>
                    <td className="p-3 font-mono text-xs">{apt.scheduledAt}</td>
                    <td className="p-3">
                      <Badge variant={apt.noshowRisk === "HIGH" ? "warning" : "default"}>
                        {apt.noshowRisk}
                      </Badge>
                    </td>
                    <td className="p-3">
                      {apt.reminderSent ? (
                        <span className="inline-flex items-center gap-1 text-xs text-primary font-semibold">
                          <Check className="w-3.5 h-3.5 text-accent" />
                          تم الإرسال
                        </span>
                      ) : (
                        <button
                          onClick={() => handleSendReminder(apt.id, apt.phone)}
                          disabled={sendingReminderId === apt.id}
                          className="inline-flex items-center gap-1 border border-primary/30 text-primary hover:bg-primary/10 px-2 py-1 rounded text-xs transition-colors"
                        >
                          <Send className="w-3 h-3" />
                          {sendingReminderId === apt.id ? "جاري الإرسال..." : "إرسال تذكير"}
                        </button>
                      )}
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
      ) : (
        /* Calendar Grid View Simulation */
        <div className="rounded-lg border border-border bg-card p-6 space-y-4 shadow-sm">
          <div className="flex justify-between items-center border-b border-border pb-3">
            <h3 className="font-bold text-foreground font-sans">عرض التقويم الأسبوعي للعيادة</h3>
            <span className="text-xs font-mono text-muted-foreground">أغسطس 2026</span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold border-b border-border pb-2">
            <div>السبت</div>
            <div>الأحد</div>
            <div>الإثنين</div>
            <div>الثلاثاء</div>
            <div>الأربعاء</div>
            <div>الخميس</div>
            <div>الجمعة</div>
          </div>

          <div className="grid grid-cols-7 gap-2 h-64">
            <div className="p-2 border border-border/60 rounded bg-primary/5 space-y-2">
              <span className="font-bold font-mono text-xs text-primary block">1 أغسطس</span>
              {appointments.map((apt) => (
                <div key={apt.id} className="p-1.5 rounded bg-card border border-border text-[11px] text-right space-y-0.5 shadow-xs">
                  <span className="font-bold text-foreground block truncate">{apt.patientName}</span>
                  <span className="font-mono text-muted-foreground block text-[10px]">{apt.scheduledAt.split(" ")[1]}</span>
                  <Badge variant={apt.visitType.includes("إعادة") ? "accent" : "default"}>
                    {apt.visitType}
                  </Badge>
                </div>
              ))}
            </div>

            {[2, 3, 4, 5, 6, 7].map((day) => (
              <div key={day} className="p-2 border border-border/40 rounded bg-background/50 text-xs font-mono text-muted-foreground">
                {day} أغسطس
              </div>
            ))}
          </div>
        </div>
      )}

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
                  <option value="إعادة / متابعة">إعادة / متابعة كشف (Follow-up)</option>
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
                <label className="block text-xs font-semibold text-muted-foreground mb-1">رقم الهاتف للواتساب</label>
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
