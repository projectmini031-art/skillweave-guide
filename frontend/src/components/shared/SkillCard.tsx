import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface SkillCardProps {
  skill: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

const levelColors = {
  beginner: "bg-info/10 text-info border-info/20",
  intermediate: "bg-warning/10 text-warning border-warning/20",
  advanced: "bg-accent/10 text-accent border-accent/20",
  expert: "bg-primary/10 text-primary border-primary/20",
};

const SkillCard = ({ skill, level, removable, onRemove, className }: SkillCardProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 hover:scale-105",
        level ? levelColors[level] : "bg-muted text-foreground border-border",
        className
      )}
    >
      <span>{skill}</span>
      {level && (
        <span className="text-xs opacity-75 capitalize">({level})</span>
      )}
      {removable && onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 p-0.5 rounded-full hover:bg-background/50 transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
};

export default SkillCard;
