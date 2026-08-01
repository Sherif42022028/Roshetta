import React from "react";

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div
      className={`relative min-w-[180px] inline-flex flex-col items-center justify-center p-3 rounded-lg border-dashed border-[1.5px] border-primary bg-card/80 shadow-sm ${className}`}
    >
      {/* 3 دوائر صغيرة توحي بخط التقطيع في الروشتة الحقيقية */}
      <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 flex gap-1.5 bg-background px-1.5">
        <span className="w-[10px] h-[10px] rounded-full border border-dashed border-primary/60 bg-background" />
        <span className="w-[10px] h-[10px] rounded-full border border-dashed border-primary/60 bg-background" />
        <span className="w-[10px] h-[10px] rounded-full border border-dashed border-primary/60 bg-background" />
      </div>

      {/* اسم العيادة والروشتة بالعربية */}
      <span className="font-bold text-[30px] leading-tight text-primary font-sans tracking-tight">
        روشتة
      </span>

      {/* خط فاصل رفيع 1px بحدث شفافية 15% */}
      <div className="w-4/5 my-1 border-t border-primary/15" />

      {/* الاسم باللغة اللاتينية */}
      <span className="font-semibold text-[13px] text-accent font-sans tracking-widest uppercase">
        Roshetta
      </span>
    </div>
  );
};
