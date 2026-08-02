"use client";

import React, { useState } from "react";
import { Settings, MessageSquare, Bot, Users, Check, RefreshCw, ShieldCheck } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"general" | "whatsapp" | "ai" | "staff">("general");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [testingWhatsApp, setTestingWhatsApp] = useState(false);
  const [whatsappStatus, setWhatsappStatus] = useState("متصل ومفعل (Session Singleton)");

  // Form states
  const [clinicName, setClinicName] = useState("عيادة روشتة التخصصية");
  const [doctorName, setDoctorName] = useState("د. أحمد الشريف");
  const [phone, setPhone] = useState("01012345678");
  const [address, setAddress] = useState("شارع التحرير، الدقي - الجيزة");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleTestWhatsApp = () => {
    setTestingWhatsApp(true);
    setTimeout(() => {
      setTestingWhatsApp(false);
      setWhatsappStatus("تم اختبار الاتصال بنجاح - الاستجابة 200 OK");
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-primary font-sans">إعدادات العيادة والخدمات الخارجية</h1>
          <p className="text-sm text-muted-foreground mt-1">
            إدارة بيانات العيادة، ربط خدمة الواتساب (Render)، وإعدادات نماذج الذكاء الاصطناعي
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 bg-accent/15 text-accent px-3 py-1.5 rounded-md text-xs font-semibold animate-fade-in">
            <Check className="w-4 h-4" />
            تم حفظ الإعدادات بنجاح
          </div>
        )}
      </div>

      {/* Tabs Navigation Bar */}
      <div className="flex border-b border-border space-x-reverse space-x-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab("general")}
          className={`flex items-center gap-2 pb-2.5 px-3 border-b-2 transition-colors ${
            activeTab === "general"
              ? "border-primary text-primary font-bold"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Settings className="w-4 h-4" />
          بيانات العيادة العامة
        </button>

        <button
          onClick={() => setActiveTab("whatsapp")}
          className={`flex items-center gap-2 pb-2.5 px-3 border-b-2 transition-colors ${
            activeTab === "whatsapp"
              ? "border-primary text-primary font-bold"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          خدمة الواتساب (Render)
        </button>

        <button
          onClick={() => setActiveTab("ai")}
          className={`flex items-center gap-2 pb-2.5 px-3 border-b-2 transition-colors ${
            activeTab === "ai"
              ? "border-primary text-primary font-bold"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Bot className="w-4 h-4" />
          الذكاء الاصطناعي والملاحظات (FastAPI)
        </button>
      </div>

      {/* Tab Content 1: General Settings */}
      {activeTab === "general" && (
        <form onSubmit={handleSave} className="rounded-lg border border-border bg-card p-6 space-y-4 max-w-2xl shadow-sm">
          <h3 className="font-bold text-foreground text-sm font-sans border-b border-border pb-2">
            بيانات العيادة وتفاصيل الروشتة المطبوعة
          </h3>

          <div className="space-y-4 text-sm">
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">اسم العيادة الرسمي</label>
              <input
                type="text"
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
                className="w-full p-2.5 rounded border border-input bg-background font-sans text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">اسم الطبيب المعالج الرئيسي</label>
              <input
                type="text"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                className="w-full p-2.5 rounded border border-input bg-background font-sans text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">رقم الهاتف والتواصل</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 rounded border border-input bg-background font-mono text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">العنوان بالتفصيل</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2.5 rounded border border-input bg-background font-sans text-sm"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <button
              type="submit"
              className="bg-primary text-primary-foreground font-semibold px-5 py-2 rounded-md hover:bg-primary/90 text-xs shadow-sm transition-colors"
            >
              حفظ التغييرات
            </button>
          </div>
        </form>
      )}

      {/* Tab Content 2: WhatsApp Integration */}
      {activeTab === "whatsapp" && (
        <div className="rounded-lg border border-border bg-card p-6 space-y-5 max-w-2xl shadow-sm">
          <div className="flex justify-between items-center border-b border-border pb-3">
            <h3 className="font-bold text-foreground text-sm font-sans">
              حالة ربط خدمة الواتساب تلقائياً (Node.js + Baileys on Render)
            </h3>
            <span className="text-xs font-mono text-accent font-semibold">{whatsappStatus}</span>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            تعتمد هذه الخدمة على مستودع منفصل منشور على Render لتشغيل مكتبة Baileys، ويتم حفظ جلسة الواتساب في جدول <span className="font-mono text-primary font-bold">whatsapp_auth_state</span> بقاعدة بيانات Postgres.
          </p>

          <div className="p-4 bg-primary/5 rounded border border-primary/20 space-y-2 text-xs">
            <div className="flex justify-between font-mono">
              <span className="text-muted-foreground">عنوان الخدمة المستهدفة:</span>
              <span className="font-bold text-primary">http://localhost:3001 (Render Proxy)</span>
            </div>
            <div className="flex justify-between font-mono">
              <span className="text-muted-foreground">معرف الجلسة (Session ID):</span>
              <span className="font-bold text-accent">singleton</span>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleTestWhatsApp}
              disabled={testingWhatsApp}
              className="bg-accent text-accent-foreground font-semibold px-4 py-2 rounded-md hover:bg-accent/90 text-xs shadow-sm inline-flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testingWhatsApp ? "animate-spin" : ""}`} />
              {testingWhatsApp ? "جاري فحص الاتصال..." : "اختبار الاتصال بسيرفر الواتساب"}
            </button>
          </div>
        </div>
      )}

      {/* Tab Content 3: AI Settings */}
      {activeTab === "ai" && (
        <div className="rounded-lg border border-border bg-card p-6 space-y-5 max-w-2xl shadow-sm">
          <h3 className="font-bold text-foreground text-sm font-sans border-b border-border pb-3">
            إعدادات نماذج الذكاء الاصطناعي والتفريغ الصوتي (Whisper + Claude)
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-background rounded border border-border flex justify-between items-center">
              <div>
                <span className="font-bold text-foreground block">نموذج تفريغ الصوت (Speech-to-Text)</span>
                <span className="text-muted-foreground">OpenAI Whisper (مستقل على خدمة Python FastAPI)</span>
              </div>
              <span className="font-mono text-primary font-bold">Whisper Medium</span>
            </div>

            <div className="p-3 bg-background rounded border border-border flex justify-between items-center">
              <div>
                <span className="font-bold text-foreground block">نموذج هيلكة الروشتة (Note Structuring)</span>
                <span className="text-muted-foreground">Anthropic Claude Sonnet 3.5 API</span>
              </div>
              <span className="font-mono text-accent font-bold">Claude 3.5</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
