import React from "react";
import { Logo } from "@/components/brand/logo";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-border bg-card p-8 shadow-sm text-right">
        <div className="flex justify-center">
          <Logo />
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold text-primary">تسجيل الدخول للنظام</h2>
          <p className="text-xs text-muted-foreground mt-1">أدخل رقم الهاتف وكلمة المرور للوصول للوحة التحكم</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">رقم الهاتف</label>
            <input
              type="text"
              placeholder="010XXXXXXXX"
              className="w-full p-2.5 rounded border border-input bg-background font-mono text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">كلمة المرور</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-2.5 rounded border border-input bg-background text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-accent-foreground font-semibold py-2.5 rounded-md hover:bg-accent/90 transition-colors text-sm shadow-sm"
          >
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
}
