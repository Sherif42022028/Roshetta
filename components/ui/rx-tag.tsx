import React from "react";

export const RxTag: React.FC<{ number: string; className?: string }> = ({ number, className = "" }) => (
  <span
    className={`inline-flex items-center gap-1 rounded-sm border border-dashed border-primary/40 bg-primary/5 px-2.5 py-1 font-mono text-xs font-bold tracking-wide text-primary ${className}`}
  >
    {number}
  </span>
);
