import {
  pgTable,
  uuid,
  text,
  timestamp,
  date,
  boolean,
  numeric,
  jsonb,
} from "drizzle-orm/pg-core";

// 1. العيادات والفروع
export const clinics = pgTable("clinics", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  phone: text("phone"),
  address: text("address"),
  createdAt: timestamp("created_at").defaultNow(),
});

// 2. المستخدمون (أطباء، استقبال، إدارة)
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clinicId: uuid("clinic_id").references(() => clinics.id),
  name: text("name").notNull(),
  role: text("role").notNull(), // doctor | receptionist | admin
  phone: text("phone").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// 3. المرضى
export const patients = pgTable("patients", {
  id: uuid("id").primaryKey().defaultRandom(),
  clinicId: uuid("clinic_id").references(() => clinics.id),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  dateOfBirth: date("date_of_birth"),
  medicalHistorySummary: text("medical_history_summary"),
  createdAt: timestamp("created_at").defaultNow(),
});

// 4. المواعيد
export const appointments = pgTable("appointments", {
  id: uuid("id").primaryKey().defaultRandom(),
  clinicId: uuid("clinic_id").references(() => clinics.id),
  patientId: uuid("patient_id").references(() => patients.id),
  doctorId: uuid("doctor_id").references(() => users.id),
  scheduledAt: timestamp("scheduled_at").notNull(),
  status: text("status").default("SCHEDULED"), // SCHEDULED | CONFIRMED | COMPLETED | NO_SHOW | CANCELLED
  noshowRisk: text("noshow_risk"), // LOW | MEDIUM | HIGH
  noshowRiskIsHeuristic: boolean("noshow_risk_is_heuristic").default(true),
  isFirstVisit: boolean("is_first_visit").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// 5. الملاحظات الطبية / الروشتات
// تنبيه إلزامي: doctor_approved_at يتخزن افتراضيًا بـ NULL لمنع عرض المسودات غير المعتمدة
export const clinicalNotes = pgTable("clinical_notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  appointmentId: uuid("appointment_id").references(() => appointments.id),
  rxNumber: text("rx_number").notNull().unique(),
  chiefComplaint: text("chief_complaint"),
  diagnosis: text("diagnosis"),
  prescription: text("prescription"),
  treatmentPlan: text("treatment_plan"),
  isAiDrafted: boolean("is_ai_drafted").default(false),
  doctorApprovedAt: timestamp("doctor_approved_at").default(null), // NULL يعني لسه مسودة غير معتمدة
  createdAt: timestamp("created_at").defaultNow(),
});

// 6. موافقات التسجيل الصوتي
export const recordingConsents = pgTable("recording_consents", {
  id: uuid("id").primaryKey().defaultRandom(),
  appointmentId: uuid("appointment_id").references(() => appointments.id),
  consentedAt: timestamp("consented_at").notNull(),
  consentedBy: text("consented_by").notNull(),
});

// 7. الفواتير
export const invoices = pgTable("invoices", {
  id: uuid("id").primaryKey().defaultRandom(),
  appointmentId: uuid("appointment_id").references(() => appointments.id),
  amount: numeric("amount").notNull(),
  paymentMethod: text("payment_method"), // CASH | CARD | MIXED
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// 8. جلسة واتساب (نفس جدول مشروع الصيانة)
export const whatsappAuthState = pgTable("whatsapp_auth_state", {
  id: text("id").primaryKey().default("singleton"),
  authData: jsonb("auth_data").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
