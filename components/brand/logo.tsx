import React from "react";

export const Logo: React.FC<{ className?: string; alt?: string }> = ({
  className = "",
  alt = "روشتة - Roshetta",
}) => {
  return (
    <div className={`inline-flex items-center justify-center w-full p-2 ${className}`}>
      <img
        src="/favicon.png"
        alt={alt}
        className="h-24 md:h-28 w-auto max-w-[220px] object-contain transition-transform hover:scale-105"
      />
    </div>
  );
};
