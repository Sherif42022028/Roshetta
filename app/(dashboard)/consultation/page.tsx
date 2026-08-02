"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RxTag } from "@/components/ui/rx-tag";
import { Badge } from "@/components/ui/badge";
import {
  Mic,
  Square,
  CheckCircle2,
  ShieldAlert,
  History,
  FileText,
  User,
  ExternalLink,
} from "lucide-react";

export default function ConsultationPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [approvedTimestamp, setApprovedTimestamp] = useState<string | null>(null);

  // Form states for prescription draft
  const [chiefComplaint, setChiefComplaint] = useState(
    "ألم في الشق الأيمن العلوي من البطن مستمر منذ يومين."
  );
  const [diagnosis, setDiagnosis] = useState("اشتباه التهاب مرارة حاد (Acute Cholecystitis)");
  const [prescription, setPrescription] = useState(
    "1. Paracetamol 1000mg - 1x3\n2. Buscopan 10mg - 1x3"
  );

  const handleApprove = () => {
    const now = new Date();
    const formattedDate = `${now.toISOString().split("T")[0]} ${now.toTimeString().split(" ")[0].slice(0, 5)}`;
    setIsApproved(true);
    setApprovedTimestamp(formattedDate);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-primary font-sans">شاشة الكشف والملاحظات الطبية</h1>
            <RxTag number="RX-10492" className="text-sm px-3 py-1" />
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            التسجيل الصوتي المحمي ومراجعة مسودة الروشتة المولدة بالذكاء الاصطناعي
          </p>
        </div>

        <Link
          href="/patients/PT-901"
          className="text-xs font-semibold text-primary hover:text-accent border border-primary/30 px-3 py-1.5 rounded-md flex items-center gap-2 hover:bg-primary/5 transition-colors"
        >
          <User className="w-4 h-4" />
          فتح الملف الطبي والسجل المريض الكامل
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Mandatory Audio Consent & Recording Controls */}
      <div className="rounded-md border border-primary/20 bg-primary/5 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-primary">موافقة التسجيل الصوتي مأخوذة للمريض: محمد محمود السيد (PT-901)</h4>
            <p className="text-xs text-muted-foreground">تمت الموافقة وتوثيق الإذن في <span className="font-mono">2026-08-01 16:32</span></p>
          </div>
        </div>

        <button
          onClick={() => setIsRecording(!isRecording)}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold shadow-xs transition-colors ${
            isRecording
              ? "bg-destructive text-destructive-foreground animate-pulse"
              : "border border-primary text-primary hover:bg-primary/10"
          }`}
        >
          {isRecording ? (
            <>
              <Square className="w-4 h-4" />
              جاري التسجيل الصوتي (إيقاف)
            </>
          ) : (
            <>
              <Mic className="w-4 h-4" />
              ابدأ التسجيل الصوتي للكشف
            </>
          )}
        </button>
      </div>

      {/* Clinical Note Draft & Approval Warning */}
      <div className="rounded-lg border border-border bg-card p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="font-bold text-foreground font-sans">مسودة الملاحظات الطبية والروشتة (AI Clinical Draft)</h3>

          {!isApproved ? (
            <Badge variant="warning">غير معتمدة - doctor_approved_at: NULL</Badge>
          ) : (
            <Badge variant="accent">
              معتمدة رسمياً بتاريخ <span className="font-mono">{approvedTimestamp}</span>
            </Badge>
          )}
        </div>

        <div className="space-y-4 text-sm">
          <div>
            <label className="font-bold text-xs text-muted-foreground block mb-1">الشكوى الرئيسية (Chief Complaint)</label>
            <textarea
              value={chiefComplaint}
              onChange={(e) => setChiefComplaint(e.target.value)}
              rows={2}
              className="w-full p-3 rounded border border-border bg-background text-sm font-sans focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <div>
            <label className="font-bold text-xs text-muted-foreground block mb-1">التشخيص الطبي (Diagnosis)</label>
            <input
              type="text"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="w-full p-3 rounded border border-border bg-background text-sm font-sans focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <div>
            <label className="font-bold text-xs text-muted-foreground block mb-1">الروشتة والعلاج المقترح (Prescription)</label>
            <textarea
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              rows={3}
              className="w-full p-3 rounded border border-border bg-background font-mono text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-warning">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>
              {!isApproved
                ? "قاعدة أمان: لن يتم إصدار الروشتة أو طباعتها حتى يضغط الطبيب على اعتماد."
                : "تم اعتماد الروشتة رسمياً وإضافة التوقيع الرقمي للطبيب."}
            </span>
          </div>

          {!isApproved ? (
            <button
              onClick={handleApprove}
              className="bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-md hover:bg-primary/90 text-sm shadow-sm transition-colors"
            >
              اعتماد الروشتة رسمياً
            </button>
          ) : (
            <div className="flex items-center gap-2 text-accent font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>تم الحفظ والاعتماد</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
