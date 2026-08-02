"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { RxTag } from "@/components/ui/rx-tag";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Phone,
  Calendar,
  Clock,
  FileText,
  PlusCircle,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  Stethoscope,
  Activity,
  HeartPulse,
  History,
} from "lucide-react";

interface Visit {
  id: string;
  date: string;
  time: string;
  type: string;
  doctorName: string;
  status: string;
  rxNumber: string;
  chiefComplaint: string;
  diagnosis: string;
  prescription: string;
  doctorApprovedAt: string | null;
  fee: string;
}

interface Patient {
  id: string; // رقم الملف الطبي الثابت والخاص بالمريض فقط
  name: string;
  phone: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  bloodGroup: string;
  clinicName: string;
  medicalHistorySummary: string;
  totalVisits: number;
  lastVisitDate: string;
  visits: Visit[];
}

// السجل المركزي للمرضى بأرقام ملفات موحدة وثابتة لا تتغير إطلاقاً
const INITIAL_PATIENTS_DATABASE: Record<string, Patient> = {
  "PT-901": {
    id: "PT-901",
    name: "محمد محمود السيد",
    phone: "01012345678",
    dateOfBirth: "1988-04-12",
    age: 38,
    gender: "ذكر",
    bloodGroup: "O+",
    clinicName: "عيادة روشتة التخصصية",
    medicalHistorySummary:
      "حساسية سابقة ضد البنسلين. يعاني من ارتفاع ضغط الدم الخفيف ومتابع بانتظام.",
    totalVisits: 3,
    lastVisitDate: "2026-08-01",
    visits: [
      {
        id: "APT-201",
        date: "2026-08-01",
        time: "04:30 PM",
        type: "إعادة / متابعة",
        doctorName: "د. أحمد الشريف",
        status: "مكتمل",
        rxNumber: "RX-10492",
        chiefComplaint: "ألم في الشق الأيمن العلوي من البطن مستمر منذ يومين.",
        diagnosis: "التهاب مرارة حاد خفيف",
        prescription: "1. Paracetamol 1000mg - 1x3\n2. Buscopan 10mg - 1x3",
        doctorApprovedAt: "2026-08-01 16:45",
        fee: "150 EGP",
      },
      {
        id: "APT-185",
        date: "2026-06-15",
        time: "06:00 PM",
        type: "إعادة / متابعة",
        doctorName: "د. أحمد الشريف",
        status: "مكتمل",
        rxNumber: "RX-09821",
        chiefComplaint: "متابعة نتائج التحاليل والأشعة الصوتية",
        diagnosis: "تحسن ملحوظ واستقرار الحالة العامة",
        prescription: "الاستمرار على العلاج الوقائي والرجوع عند اللزوم",
        doctorApprovedAt: "2026-06-15 18:30",
        fee: "150 EGP",
      },
      {
        id: "APT-110",
        date: "2026-01-15",
        time: "05:00 PM",
        type: "كشف أول",
        doctorName: "د. أحمد الشريف",
        status: "مكتمل",
        rxNumber: "RX-08104",
        chiefComplaint: "ارتفاع خفيف في قراءات ضغط الدم",
        diagnosis: "ارتفاع ضغط دم أولي درجة 1",
        prescription: "Concor 5mg - قرص يومياً صباحاً",
        doctorApprovedAt: "2026-01-15 17:30",
        fee: "400 EGP",
      },
    ],
  },
  "PT-902": {
    id: "PT-902",
    name: "سارة أحمد علي",
    phone: "01198765432",
    dateOfBirth: "1994-09-20",
    age: 32,
    gender: "أنثى",
    bloodGroup: "A+",
    clinicName: "عيادة روشتة التخصصية",
    medicalHistorySummary: "لا توجد حساسية معروفة لأدوية. تاريخ عائلي لمرض السكري.",
    totalVisits: 2,
    lastVisitDate: "2026-07-28",
    visits: [
      {
        id: "APT-199",
        date: "2026-07-28",
        time: "05:00 PM",
        type: "إعادة / متابعة",
        doctorName: "د. أحمد الشريف",
        status: "مكتمل",
        rxNumber: "RX-10311",
        chiefComplaint: "متابعة بعد الكشف الأولي",
        diagnosis: "تحسن في الأعراض التنفسية",
        prescription: "مكملات غذائية وفيتامين C",
        doctorApprovedAt: "2026-07-28 17:20",
        fee: "150 EGP",
      },
    ],
  },
  "PT-903": {
    id: "PT-903",
    name: "محمود حسن مصطفى",
    phone: "01234567890",
    dateOfBirth: "1975-11-05",
    age: 51,
    gender: "ذكر",
    bloodGroup: "B+",
    clinicName: "عيادة روشتة التخصصية",
    medicalHistorySummary: "سجل طبي عام، فحص روتيني الدوري.",
    totalVisits: 1,
    lastVisitDate: "2026-07-12",
    visits: [
      {
        id: "APT-160",
        date: "2026-07-12",
        time: "07:00 PM",
        type: "كشف أول",
        doctorName: "د. أحمد الشريف",
        status: "مكتمل",
        rxNumber: "RX-09410",
        chiefComplaint: "فحص شامل روتيني",
        diagnosis: "حالة جيدة العامة",
        prescription: "فيتامينات متعددة",
        doctorApprovedAt: "2026-07-12 19:30",
        fee: "400 EGP",
      },
    ],
  },
};

export default function PatientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const patientId = params.id;

  // جلب بيانات المريض باستخدام رقم الملف الثابت الحصري
  const [patient, setPatient] = useState<Patient>(() => {
    if (INITIAL_PATIENTS_DATABASE[patientId]) {
      return INITIAL_PATIENTS_DATABASE[patientId];
    }
    // للمرضى الجدد: تثبيت رقم الملف الممرر من المسار بشكل دائم
    return {
      id: patientId, // رقم الملف دائم وثابت لا يتغير
      name: `مريض (${patientId})`,
      phone: "01000000000",
      dateOfBirth: "1990-01-01",
      age: 36,
      gender: "غير محدد",
      bloodGroup: "O+",
      clinicName: "عيادة روشتة التخصصية",
      medicalHistorySummary: "سجل طبي جديد للمريض.",
      totalVisits: 1,
      lastVisitDate: "2026-08-01",
      visits: [
        {
          id: `APT-${patientId}`,
          date: "2026-08-01",
          time: "05:00 PM",
          type: "كشف أول",
          doctorName: "د. أحمد الشريف",
          status: "مجدول",
          rxNumber: `RX-10${patientId.replace("PT-", "")}`,
          chiefComplaint: "فحص روتيني وسجل أولي",
          diagnosis: "قيد التقييم",
          prescription: "لم تصدر روشتة بعد",
          doctorApprovedAt: null,
          fee: "400 EGP",
        },
      ],
    };
  });

  const [showAddVisitModal, setShowAddVisitModal] = useState(false);
  const [visitType, setVisitType] = useState<"إعادة / متابعة" | "كشف جديد">("إعادة / متابعة");
  const [visitDate, setVisitDate] = useState("2026-08-05");
  const [visitTime, setVisitTime] = useState("05:30 PM");
  const [editingHistory, setEditingHistory] = useState(false);
  const [historyText, setHistoryText] = useState(patient.medicalHistorySummary);

  const handleSaveHistory = () => {
    setPatient((prev) => ({
      ...prev,
      medicalHistorySummary: historyText,
    }));
    setEditingHistory(false);
  };

  const handleAddVisit = (e: React.FormEvent) => {
    e.preventDefault();
    // توليد رقم روشتة منفصل للزيارة مع الاحتفاظ التام برقم الملف الطبي الثابت للمريض
    const visitSeq = patient.visits.length + 1;
    const newRxNumber = `RX-${10490 + visitSeq}`;
    
    const newVisit: Visit = {
      id: `APT-${100 + visitSeq}`,
      date: visitDate,
      time: visitTime,
      type: visitType,
      doctorName: "د. أحمد الشريف",
      status: "مجدول",
      rxNumber: newRxNumber, // رقم الروشتة الخاص بهذه الزيرة
      chiefComplaint: visitType === "إعادة / متابعة" ? "متابعة كشف سابقة واستشارة أدوية" : "كشف وتشخيص جديد",
      diagnosis: "في انتظار الكشف",
      prescription: "لم تحدد بعد",
      doctorApprovedAt: null,
      fee: visitType === "إعادة / متابعة" ? "150 EGP" : "450 EGP",
    };

    setPatient((prev) => ({
      ...prev,
      totalVisits: prev.totalVisits + 1,
      lastVisitDate: visitDate,
      visits: [newVisit, ...prev.visits],
    }));

    setShowAddVisitModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Breadcrumb & Navigation Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/patients"
            className="p-2 rounded-md border border-border hover:bg-primary/5 text-primary transition-colors"
            title="الرجوع لقائمة المرضى"
          >
            <ArrowRight className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-primary font-sans">{patient.name}</h1>
              {/* رقم الملف الطبي دائم وثابت ومميز ببطاقة RxTag */}
              <div className="flex items-center gap-1.5 bg-card px-2.5 py-1 rounded border border-primary/30">
                <span className="text-xs text-muted-foreground font-semibold">رقم الملف الثابت:</span>
                <RxTag number={patient.id} className="text-sm px-2.5 py-0.5" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              السجل الطبي الدائم والخط الزمني للإعادات والزيارات الطبية
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setShowAddVisitModal(true)}
          className="bg-accent text-accent-foreground font-semibold px-4 py-2 rounded-md hover:bg-accent/90 transition-colors text-sm shadow-sm flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          حجز موعد إعادة جديدة
        </button>
      </div>

      {/* Patient Profile Quick Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 rounded-lg border border-border bg-card shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <User className="w-4 h-4 text-primary" />
            <span>البيانات الشخصية</span>
          </div>
          <p className="text-sm font-bold text-foreground">
            {patient.gender} • <span className="font-mono">{patient.age} سنة</span>
          </p>
          <p className="text-xs text-muted-foreground font-mono">تاريخ الميلاد: {patient.dateOfBirth}</p>
        </div>

        <div className="space-y-1 border-r border-border/50 pr-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone className="w-4 h-4 text-primary" />
            <span>رقم التواصل</span>
          </div>
          <p className="text-sm font-bold font-mono text-foreground">{patient.phone}</p>
          <span className="inline-block text-[11px] bg-primary/10 text-primary px-2 py-0.5 rounded-sm font-mono">
            واتساب متصل
          </span>
        </div>

        <div className="space-y-1 border-r border-border/50 pr-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <HeartPulse className="w-4 h-4 text-primary" />
            <span>فصيلة الدم & العيادة</span>
          </div>
          <p className="text-sm font-bold text-foreground">
            فصيلة الدم: <span className="font-mono text-accent font-bold">{patient.bloodGroup}</span>
          </p>
          <p className="text-xs text-muted-foreground">{patient.clinicName}</p>
        </div>

        <div className="space-y-1 border-r border-border/50 pr-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <History className="w-4 h-4 text-primary" />
            <span>إجمالي الإعادات والزيارات</span>
          </div>
          <p className="text-xl font-bold font-mono text-foreground">{patient.totalVisits} زيارة</p>
          <p className="text-xs text-muted-foreground font-mono">آخر زيارة: {patient.lastVisitDate}</p>
        </div>
      </div>

      {/* Medical History Summary Card */}
      <div className="rounded-lg border border-border bg-card p-5 space-y-3">
        <div className="flex justify-between items-center border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-warning" />
            <h3 className="font-bold text-foreground text-base">التاريخ المرضي الدائم والحساسيات</h3>
          </div>

          {!editingHistory ? (
            <button
              onClick={() => setEditingHistory(true)}
              className="text-xs font-semibold text-primary border border-primary/30 px-3 py-1 rounded hover:bg-primary/5 transition-colors"
            >
              تعديل السجل
            </button>
          ) : (
            <button
              onClick={handleSaveHistory}
              className="text-xs font-semibold bg-primary text-primary-foreground px-3 py-1 rounded hover:bg-primary/90 transition-colors"
            >
              حفظ السجل
            </button>
          )}
        </div>

        {!editingHistory ? (
          <p className="text-sm text-foreground/90 leading-relaxed bg-background p-3 rounded border border-border/60">
            {patient.medicalHistorySummary}
          </p>
        ) : (
          <textarea
            value={historyText}
            onChange={(e) => setHistoryText(e.target.value)}
            rows={3}
            className="w-full p-3 text-sm rounded border border-input bg-background font-sans focus:outline-none focus:ring-1 focus:ring-ring"
          />
        )}
      </div>

      {/* Medical History Timeline */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <Activity className="w-5 h-5" />
            السجل الطبي وسجل الإعادات والروشتات السابقة للمريض
          </h2>
          <span className="text-xs font-mono text-muted-foreground">
            عدد السجلات: {patient.visits.length}
          </span>
        </div>

        {patient.visits.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-border rounded-lg bg-card">
            <p className="text-sm text-muted-foreground">لا توجد زيارات سابقة مسجلة للمريض حتى الآن.</p>
          </div>
        ) : (
          <div className="space-y-4 relative before:absolute before:right-6 before:top-3 before:bottom-3 before:w-0.5 before:bg-border/70">
            {patient.visits.map((visit) => (
              <div
                key={visit.id}
                className="relative mr-12 rounded-lg border border-border bg-card p-5 space-y-4 shadow-sm hover:border-primary/40 transition-colors"
              >
                {/* Timeline Icon Node */}
                <div className="absolute -right-[34px] top-5 w-7 h-7 rounded-full bg-card border-2 border-primary flex items-center justify-center text-primary shadow-xs">
                  <Stethoscope className="w-3.5 h-3.5" />
                </div>

                {/* Visit Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-border/60 pb-3">
                  <div className="flex items-center gap-3">
                    <Badge variant={visit.type.includes("إعادة") ? "accent" : "default"}>
                      {visit.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-mono">
                      {visit.date} • {visit.time}
                    </span>
                    <span className="text-xs font-semibold text-foreground/80">
                      {visit.doctorName}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-muted-foreground">الرسوم: {visit.fee}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] text-muted-foreground">رقم الروشتة:</span>
                      <RxTag number={visit.rxNumber} />
                    </div>
                  </div>
                </div>

                {/* Visit Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-3 rounded border border-border/50 bg-background/50 space-y-1">
                    <span className="text-xs font-bold text-muted-foreground block">الشكوى / سبب الزيارة</span>
                    <p className="text-foreground text-xs leading-relaxed">{visit.chiefComplaint}</p>
                  </div>

                  <div className="p-3 rounded border border-border/50 bg-background/50 space-y-1">
                    <span className="text-xs font-bold text-muted-foreground block">التشخيص الطبي</span>
                    <p className="text-foreground text-xs font-semibold">{visit.diagnosis}</p>
                  </div>

                  <div className="p-3 rounded border border-border/50 bg-background/50 space-y-1">
                    <span className="text-xs font-bold text-muted-foreground block">الروشتة والعلاج المقترح</span>
                    <p className="text-foreground text-xs font-mono whitespace-pre-line">{visit.prescription}</p>
                  </div>
                </div>

                {/* Approval & Footer Status */}
                <div className="flex justify-between items-center pt-2 text-xs border-t border-border/40">
                  <div className="flex items-center gap-2">
                    {visit.doctorApprovedAt ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-accent" />
                        <span className="text-accent font-semibold">
                          روشتة معتمدة رسمياً بتاريخ <span className="font-mono">{visit.doctorApprovedAt}</span>
                        </span>
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="w-4 h-4 text-warning" />
                        <span className="text-warning font-semibold">
                          مسودة ذكاء اصطناعي (في انتظار اعتماد الطبيب)
                        </span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2 font-mono text-muted-foreground">
                    <span>رقم الملف الدائم: <span className="font-bold text-primary">{patient.id}</span></span>
                    <span>• المعاملة: {visit.id}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal: Add New Re-visit / Follow-up Appointment */}
      {showAddVisitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-card rounded-lg border border-border p-6 space-y-5 shadow-lg text-right">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h3 className="font-bold text-lg text-primary">حجز موعد إعادة جديدة للمريض</h3>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">رقم الملف الثابت:</span>
                <RxTag number={patient.id} />
              </div>
            </div>

            <form onSubmit={handleAddVisit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">نوع الموعد</label>
                <select
                  value={visitType}
                  onChange={(e) => setVisitType(e.target.value as any)}
                  className="w-full p-2.5 rounded border border-input bg-background font-sans text-sm"
                >
                  <option value="إعادة / متابعة">إعادة / متابعة كشف (Follow-up)</option>
                  <option value="كشف جديد">كشف جديد (New Consult)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">تاريخ الموعد</label>
                <input
                  type="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full p-2.5 rounded border border-input bg-background font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">توقيت الموعد</label>
                <input
                  type="text"
                  value={visitTime}
                  onChange={(e) => setVisitTime(e.target.value)}
                  placeholder="05:30 PM"
                  className="w-full p-2.5 rounded border border-input bg-background font-mono text-sm"
                />
              </div>

              <div className="p-3 bg-primary/5 rounded border border-primary/20 text-xs text-primary">
                تنبيه أمان: ميعاد الإعادة سيتسجل دائماً تحت رقم الملف الثابت الفريد <span className="font-bold font-mono text-accent">{patient.id}</span> لضمان تسلسل السجل الطبي لـ <span className="font-bold">{patient.name}</span>.
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddVisitModal(false)}
                  className="px-4 py-2 rounded border border-border text-foreground hover:bg-muted text-xs font-semibold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-accent text-accent-foreground text-xs font-semibold hover:bg-accent/90"
                >
                  تأكيد حجز الإعادة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
