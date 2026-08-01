import React from "react";
import { BarChart3, Users, Clock } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">التقارير والإحصائيات</h1>
          <p className="text-sm text-muted-foreground mt-1">
            تحليل أداء العيادة، معدلات الغياب، وإجمالي الإيرادات
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border border-border bg-card space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <BarChart3 className="w-4 h-4" />
            <span>إجمالي الإيرادات الشهري</span>
          </div>
          <p className="text-2xl font-bold font-mono text-foreground">42,500 EGP</p>
        </div>

        <div className="p-4 rounded-lg border border-border bg-card space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <Users className="w-4 h-4" />
            <span>إجمالي الزيارات</span>
          </div>
          <p className="text-2xl font-bold font-mono text-foreground">142</p>
        </div>

        <div className="p-4 rounded-lg border border-border bg-card space-y-2">
          <div className="flex items-center gap-2 text-warning font-bold text-sm">
            <Clock className="w-4 h-4" />
            <span>معدل غياب المرضى (No-Show)</span>
          </div>
          <p className="text-2xl font-bold font-mono text-foreground">6.2%</p>
        </div>
      </div>
    </div>
  );
}
