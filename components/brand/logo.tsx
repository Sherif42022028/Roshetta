import React from "react";

export const Logo: React.FC<{ className?: string; alt?: string }> = ({
  className = "",
  alt = "روشتة - Roshetta",
}) => {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <img
        src="/favicon.png"
        alt={alt}
        className="h-16 w-auto object-contain transition-transform hover:scale-105"
      />
    </div>
  );
};
