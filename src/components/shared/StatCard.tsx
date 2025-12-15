import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "accent" | "success";
}

const variantStyles = {
  default: {
    card: "bg-card",
    icon: "bg-muted text-muted-foreground",
  },
  primary: {
    card: "bg-primary/5 border-primary/20",
    icon: "gradient-primary text-primary-foreground",
  },
  accent: {
    card: "bg-accent/5 border-accent/20",
    icon: "gradient-accent text-accent-foreground",
  },
  success: {
    card: "bg-success/5 border-success/20",
    icon: "bg-success text-success-foreground",
  },
};

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
}: StatCardProps) => {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        "rounded-xl border p-6 transition-all duration-300 hover:shadow-md animate-scale-in",
        styles.card
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold">{value}</span>
            {trend && (
              <span
                className={cn(
                  "text-sm font-medium",
                  trend.isPositive ? "text-success" : "text-destructive"
                )}
              >
                {trend.isPositive ? "+" : ""}{trend.value}%
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className={cn("p-3 rounded-xl", styles.icon)}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
