import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "accent" | "warning" | "destructive" | "outline";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "default",
  ...props
}) => {
  const variantStyles = {
    default: "bg-primary/10 text-primary border-primary/20",
    accent: "bg-accent/15 text-accent border-accent/30 font-semibold",
    warning: "bg-warning/15 text-warning border-warning/30 font-semibold",
    destructive: "bg-destructive/15 text-destructive border-destructive/30",
    outline: "border-border text-foreground bg-transparent",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
};
