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
  Plus,
  Trash2,
  Sparkles,
  Printer,
} from "lucide-react";

interface MedicationItem {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
}

export default function ConsultationPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [approvedTimestamp, setApprovedTimestamp] = useState<string | null>(null);
  const [isGeneratingNote, setIsGeneratingNote] = useState(false);

  // Form states
  const [chiefComplaint, setChiefComplaint] = useState(
    "ألم في الشق الأيمن العلوي من البطن مستمر منذ يومين."
  );
  const [diagnosis, setDiagnosis] = useState("اشتباه التهاب مرارة حاد (Acute Cholecystitis)");

  // Interactive Prescription Builder items
  const [medications, setMedications] = useState<MedicationItem[]>([
    { id: "1", name: "Paracetamol", dosage: "1000mg", frequency: "1x3 يومياً بعد الأكل" },
    { id: "2", name: "Buscopan", dosage: "10mg", frequency: "1x3 عند اللزوم" },
  ]);

  const [newMedName, setNewMedName] = useState("");
  const [newMedDosage, setNewMedDosage] = useState("");
  const [newMedFreq, setNewMedFreq] = useState("");

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName) return;
    const newItem: MedicationItem = {
      id: String(Date.now()),
      name: newMedName,
      dosage: newMedDosage || "500mg",
      frequency: newMedFreq || "مرتين يومياً",
    };
    setMedications([...medications, newItem]);
    setNewMedName("");
    setNewMedDosage("");
    setNewMedFreq("");
  };

  const handleRemoveMedication = (id: string) => {
    setMedications(medications.filter((m) => m.id !== id));
  };

  const handleSimulateAiGeneration = () => {
    setIsGeneratingNote(true);
    setTimeout(() => {
      setChiefComplaint("المريض يشتكي من غثيان وألم متوسط بالبطن بعد تناول وجبات دسمة.");
      setDiagnosis("عسر هضم حاد ومتابعة إنزيمات الكبد");
      setMedications([
        { id: "1", name: "Pantoprazole", dosage: "40mg", frequency: "قرص صباحاً قبل الأكل" },
        { id: "2", name: "Digestin", dosage: "1 tab", frequency: "3 مرات أثناء الأكل" },
      ]);
      setIsGeneratingNote(false);
    }, 1200);
  };

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
            <h1 className="text-2xl font-bold text-primary font-sans">شاشة الكشف والملاحظات الطبية الذكية</h1>
            <RxTag number="RX-10492" className="text-sm px-3 py-1" />
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            التسجيل الصوتي المحمي وتنسيق الروشتة المولدة بالذكاء الاصطناعي
          </p>
        </div>

        <Link
          href="/patients/PT-901"
          className="text-xs font-semibold text-primary hover:text-accent border border-primary/30 px-3 py-1.5 rounded-md flex items-center gap-2 hover:bg-primary/5 transition-colors"
        >
          <User className="w-4 h-4" />
          فتح الملف الطبي والسجل المريض الكامل (PT-901)
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Mandatory Audio Consent & Interactive Recording Waves */}
      <div className="rounded-md border border-primary/20 bg-primary/5 p-4 space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-primary">موافقة التسجيل الصوتي مأخوذة للمريض: محمد محمود السيد (PT-901)</h4>
              <p className="text-xs text-muted-foreground">تمت الموافقة وتوثيق الإذن في <span className="font-mono">2026-08-01 16:32</span></p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSimulateAiGeneration}
              disabled={isGeneratingNote}
              className="bg-card border border-primary/30 text-primary font-semibold px-3 py-2 rounded-md hover:bg-primary/10 transition-colors text-xs inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              {isGeneratingNote ? "جاري التوليد بالذكاء الاصطناعي..." : "توليد تلقائي بالذكاء الاصطناعي"}
            </button>

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
                  إيقاف التسجيل الصوتي
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  ابدأ التسجيل الصوتي للكشف
                </>
              )}
            </button>
          </div>
        </div>

        {/* Animated Audio Waves bar when recording is active */}
        {isRecording && (
          <div className="flex items-center justify-center gap-1 py-3 bg-card rounded border border-primary/20">
            <span className="w-1 h-6 bg-accent animate-pulse"></span>
            <span className="w-1 h-10 bg-primary animate-bounce"></span>
            <span className="w-1 h-4 bg-accent animate-pulse"></span>
            <span className="w-1 h-8 bg-primary animate-bounce"></span>
            <span className="w-1 h-5 bg-accent animate-pulse"></span>
            <span className="text-xs font-mono text-primary mr-3 font-semibold">جاري تحويل الصوت إلى نص محمي...</span>
          </div>
        )}
      </div>

      {/* Clinical Note Draft & Interactive Prescription Builder */}
      <div className="rounded-lg border border-border bg-card p-6 space-y-6 shadow-sm">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <label className="font-bold text-xs text-muted-foreground block mb-1">الشكوى الرئيسية (Chief Complaint)</label>
            <textarea
              value={chiefComplaint}
              onChange={(e) => setChiefComplaint(e.target.value)}
              rows={3}
              className="w-full p-3 rounded border border-border bg-background text-sm font-sans focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <div>
            <label className="font-bold text-xs text-muted-foreground block mb-1">التشخيص الطبي (Diagnosis)</label>
            <textarea
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              rows={3}
              className="w-full p-3 rounded border border-border bg-background text-sm font-sans focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>

        {/* Interactive Prescription Builder Section */}
        <div className="space-y-3 pt-2 border-t border-border/60">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-sm text-primary">جدول الأدوية والروشتة المقترحة (Prescription Items)</h4>
            <span className="text-xs font-mono text-muted-foreground">عدد الأدوية: {medications.length}</span>
          </div>

          {/* Add Medication Form */}
          <form onSubmit={handleAddMedication} className="grid grid-cols-1 sm:grid-cols-4 gap-2 bg-primary/5 p-3 rounded border border-primary/20">
            <input
              type="text"
              placeholder="اسم الدواء (e.g. Concor)"
              value={newMedName}
              onChange={(e) => setNewMedName(e.target.value)}
              className="p-2 rounded border border-input text-xs font-sans bg-background"
            />
            <input
              type="text"
              placeholder="الجرعة (e.g. 5mg)"
              value={newMedDosage}
              onChange={(e) => setNewMedDosage(e.target.value)}
              className="p-2 rounded border border-input text-xs font-sans bg-background"
            />
            <input
              type="text"
              placeholder="المواعيد (e.g. قرص يومياً)"
              value={newMedFreq}
              onChange={(e) => setNewMedFreq(e.target.value)}
              className="p-2 rounded border border-input text-xs font-sans bg-background"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground font-semibold px-3 py-2 rounded text-xs hover:bg-primary/90 transition-colors flex items-center justify-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              إضافة دواء
            </button>
          </form>

          {/* Medications List Table */}
          <div className="rounded border border-border overflow-hidden">
            <table className="w-full text-xs text-right">
              <thead className="bg-muted text-muted-foreground font-semibold">
                <tr>
                  <th className="p-2.5">اسم الدواء</th>
                  <th className="p-2.5">الجرعة</th>
                  <th className="p-2.5">التعليمات والمواعيد</th>
                  <th className="p-2.5 text-center">حذف</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-mono">
                {medications.map((item) => (
                  <tr key={item.id} className="hover:bg-background">
                    <td className="p-2.5 font-bold text-foreground font-sans">{item.name}</td>
                    <td className="p-2.5">{item.dosage}</td>
                    <td className="p-2.5 text-foreground/80 font-sans">{item.frequency}</td>
                    <td className="p-2.5 text-center">
                      <button
                        onClick={() => handleRemoveMedication(item.id)}
                        className="text-destructive hover:text-destructive/80 p-1 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Approval & Sign Footer */}
        <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-warning">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>
              {!isApproved
                ? "قاعدة أمان: لن يتم إصدار الروشتة أو طباعتها حتى يضغط الطبيب على اعتماد."
                : "تم اعتماد الروشتة رسمياً وإضافة التوقيع الرقمي للطبيب."}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isApproved && (
              <button
                onClick={() => window.print()}
                className="bg-card border border-border text-foreground hover:bg-muted font-semibold px-4 py-2 rounded-md transition-colors text-xs inline-flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4 text-muted-foreground" />
                طباعة الروشتة المعتمدة
              </button>
            )}

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
                <span>تم الحفظ والاعتماد الرقمي</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
