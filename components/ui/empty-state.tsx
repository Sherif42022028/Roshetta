import React from "react";
import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ElementType;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
  icon: Icon = FolderOpen,
}) => {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/50 p-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-primary/5 text-primary mb-3">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-base font-bold text-foreground font-sans">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground font-sans max-w-sm">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};
