import { NextResponse } from "next/server";

// Sample mock data store for comprehensive patient medical records
const patientRecordsStore: Record<string, any> = {
  "PT-901": {
    id: "PT-901",
    name: "محمد محمود السيد",
    phone: "01012345678",
    dateOfBirth: "1988-04-12",
    age: 38,
    gender: "ذكر",
    bloodGroup: "O+",
    clinicName: "عيادة روشتة التخصصية",
    medicalHistorySummary: "حساسية سابقة ضد البنسلين. يعاني من ارتفاع ضغط الدم الخفيف ومتابع بانتظام.",
    totalVisits: 3,
    lastVisitDate: "2026-08-01",
    visits: [
      {
        id: "APT-201",
        date: "2026-08-01",
        time: "04:30 PM",
        type: "كشف جديد",
        doctorName: "د. أحمد الشريف",
        status: "مكتمل",
        rxNumber: "RX-10492",
        chiefComplaint: "ألم في الشق الأيمن العلوي من البطن مستمر منذ يومين.",
        diagnosis: "التهاب مرارة حاد خفيف",
        prescription: "1. Paracetamol 1000mg - 1x3\n2. Buscopan 10mg - 1x3",
        doctorApprovedAt: "2026-08-01 16:45",
        fee: "450 EGP",
      },
      {
        id: "APT-185",
        date: "2026-06-15",
        time: "06:00 PM",
        type: "إعادة / استشارة",
        doctorName: "د. أحمد الشريف",
        status: "مكتمل",
        rxNumber: "RX-09821",
        chiefComplaint: "متابعة نتائج التحاليل والأشعة الصوتية",
        diagnosis: "تحسن ملحوظ واستقرار الحالة",
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
        type: "إعادة / استشارة",
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
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const patientId = params.id;
  const patient = patientRecordsStore[patientId] || {
    id: patientId,
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
        status: "في الانتظار",
        rxNumber: `RX-${Math.floor(10000 + Math.random() * 90000)}`,
        chiefComplaint: "فحص روتيني وسجل أولي",
        diagnosis: "قيد التقييم",
        prescription: "لم تصدر روشتة بعد",
        doctorApprovedAt: null,
        fee: "400 EGP",
      },
    ],
  };

  return NextResponse.json({
    status: "success",
    data: patient,
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const patientId = params.id;
  const body = await request.json();

  if (patientRecordsStore[patientId]) {
    patientRecordsStore[patientId] = {
      ...patientRecordsStore[patientId],
      ...body,
    };
  }

  return NextResponse.json({
    status: "success",
    message: "تم تحديث بيانات ملف المريض بنجاح",
    data: patientRecordsStore[patientId] || body,
  });
}
