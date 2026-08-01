import React from "react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">إعدادات العيادة والخدمات</h1>
          <p className="text-sm text-muted-foreground mt-1">
            ربط خدمة الواتساب وإعدادات الملاحظات الصوتية والبيانات العامة
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6 space-y-4 max-w-2xl">
        <h3 className="font-bold text-foreground">بيانات العيادة</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">اسم العيادة</label>
            <input type="text" defaultValue="عيادة روشتة التخصصية" className="w-full p-2.5 rounded border border-input bg-background text-sm" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">رقم الهاتف للواتساب</label>
            <input type="text" defaultValue="01012345678" className="w-full p-2.5 rounded border border-input bg-background font-mono text-sm" />
          </div>
        </div>

        <div className="pt-4 border-t border-border flex justify-end">
          <button className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-md hover:bg-primary/90 text-sm">
            حفظ التغييرات
          </button>
        </div>
      </div>
    </div>
  );
}
