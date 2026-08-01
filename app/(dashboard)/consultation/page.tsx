import React from "react";
import { RxTag } from "@/components/ui/rx-tag";
import { Badge } from "@/components/ui/badge";
import { Mic, CheckCircle2, ShieldAlert } from "lucide-react";

export default function ConsultationPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">شاشة الكشف والملاحظات الطبية</h1>
          <p className="text-sm text-muted-foreground mt-1">
            التسجيل الصوتي المحمي ومراجعة مسودة الروشتة المولدة بالذكاء الاصطناعي
          </p>
        </div>
        <RxTag number="RX-10492" className="text-sm px-3 py-1.5" />
      </div>

      {/* Mandatory Audio Consent Indicator */}
      <div className="rounded-md border border-primary/20 bg-primary/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-primary" />
          <div>
            <h4 className="text-sm font-bold text-primary">موافقة التسجيل الصوتي مأخوذة</h4>
            <p className="text-xs text-muted-foreground">تمت الموافقة بواسطة المريض في <span className="font-mono">2026-08-01 16:32</span></p>
          </div>
        </div>
        <button className="flex items-center gap-2 border border-primary/30 text-primary px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-primary/10">
          <Mic className="w-4 h-4" />
          ابدأ التسجيل الصوتي
        </button>
      </div>

      {/* Clinical Note Draft & Approval Warning */}
      <div className="rounded-lg border border-border bg-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="font-bold text-foreground">مسودة الملاحظات الطبية (AI Draft)</h3>
          <Badge variant="warning">غير معتمدة - doctor_approved_at: NULL</Badge>
        </div>

        <div className="space-y-3 text-sm">
          <div>
            <label className="font-semibold text-xs text-muted-foreground">الشكوى الرئيسية (Chief Complaint)</label>
            <div className="p-2.5 rounded border border-border bg-background mt-1">ألم في الشق الأيمن العلوي من البطن مستمر منذ يومين.</div>
          </div>
          <div>
            <label className="font-semibold text-xs text-muted-foreground">التشخيص (Diagnosis)</label>
            <div className="p-2.5 rounded border border-border bg-background mt-1">اشتباه التهاب مرارة حاد (Suspected Acute Cholecystitis).</div>
          </div>
          <div>
            <label className="font-semibold text-xs text-muted-foreground">العلاج والروشتة (Prescription)</label>
            <div className="p-2.5 rounded border border-border bg-background mt-1 font-mono">1. Paracetamol 1000mg - 1x3\n2. Buscopan 10mg - 1x3</div>
          </div>
        </div>

        <div className="pt-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-warning">
            <ShieldAlert className="w-4 h-4" />
            <span>لن يتم إصدار الروشتة للمريض حتى يقوم الطبيب بالضغط على اعتماد</span>
          </div>

          <button className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-md hover:bg-primary/90 text-sm">
            اعتماد الروشتة رسمياً
          </button>
        </div>
      </div>
    </div>
  );
}
