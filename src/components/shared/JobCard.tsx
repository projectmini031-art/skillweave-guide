import { Briefcase, ChevronDown, ChevronUp, MapPin, DollarSign } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import SkillCard from "./SkillCard";
import { Button } from "@/components/ui/button";

interface JobCardProps {
  title: string;
  company: string;
  location?: string;
  salary?: string;
  matchPercentage: number;
  requiredSkills: string[];
  matchedSkills: string[];
  missingSkills: string[];
}

const JobCard = ({
  title,
  company,
  location,
  salary,
  matchPercentage,
  requiredSkills,
  matchedSkills,
  missingSkills,
}: JobCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-accent";
    if (percentage >= 40) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-all duration-300 animate-scale-in">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <Briefcase className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-muted-foreground">{company}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              {location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {location}
                </span>
              )}
              {salary && (
                <span className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  {salary}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Match Percentage */}
        <div className="text-right">
          <div
            className={cn(
              "text-3xl font-bold",
              getMatchColor(matchPercentage)
            )}
          >
            {matchPercentage}%
          </div>
          <p className="text-xs text-muted-foreground">Match</p>
        </div>
      </div>

      {/* Expandable Skills Section */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 mt-4 text-sm text-primary hover:text-primary/80 transition-colors"
      >
        {expanded ? (
          <>
            <ChevronUp className="h-4 w-4" />
            Hide Skills
          </>
        ) : (
          <>
            <ChevronDown className="h-4 w-4" />
            View Required Skills
          </>
        )}
      </button>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-border space-y-4 animate-fade-in">
          {matchedSkills.length > 0 && (
            <div>
              <p className="text-sm font-medium text-success mb-2">✓ Skills You Have</p>
              <div className="flex flex-wrap gap-2">
                {matchedSkills.map((skill) => (
                  <SkillCard key={skill} skill={skill} level="advanced" />
                ))}
              </div>
            </div>
          )}
          {missingSkills.length > 0 && (
            <div>
              <p className="text-sm font-medium text-destructive mb-2">✗ Skills to Learn</p>
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill) => (
                  <SkillCard key={skill} skill={skill} />
                ))}
              </div>
            </div>
          )}

          <Button variant="gradient" className="w-full mt-4">
            View Learning Path
          </Button>
        </div>
      )}
    </div>
  );
};

export default JobCard;
