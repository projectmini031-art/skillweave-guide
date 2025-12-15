import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SkillRadarChart from "@/components/charts/SkillRadarChart";
import SkillGapBarChart from "@/components/charts/SkillGapBarChart";
import SkillCard from "@/components/shared/SkillCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Target, AlertTriangle, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const jobRoles = [
  "Senior Frontend Developer",
  "Full Stack Engineer",
  "React Developer",
  "Software Architect",
  "DevOps Engineer",
  "Data Engineer",
];

const SkillGap = () => {
  const [selectedRole, setSelectedRole] = useState("Senior Frontend Developer");

  const radarData = [
    { skill: "JavaScript", current: 85, required: 90 },
    { skill: "React", current: 80, required: 95 },
    { skill: "TypeScript", current: 65, required: 85 },
    { skill: "Node.js", current: 60, required: 70 },
    { skill: "Testing", current: 45, required: 80 },
    { skill: "System Design", current: 40, required: 75 },
  ];

  const barData = [
    { skill: "JavaScript", current: 85, gap: 5 },
    { skill: "React", current: 80, gap: 15 },
    { skill: "TypeScript", current: 65, gap: 20 },
    { skill: "Testing", current: 45, gap: 35 },
    { skill: "System Design", current: 40, gap: 35 },
    { skill: "CI/CD", current: 30, gap: 40 },
  ];

  const matchedSkills = ["JavaScript", "React", "HTML/CSS", "Git", "REST APIs"];
  const missingSkills = [
    { skill: "Testing (Jest/RTL)", severity: "high" as const },
    { skill: "System Design", severity: "high" as const },
    { skill: "TypeScript (Advanced)", severity: "medium" as const },
    { skill: "CI/CD Pipelines", severity: "medium" as const },
    { skill: "Performance Optimization", severity: "low" as const },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-destructive bg-destructive/10 border-destructive/20";
      case "medium":
        return "text-warning bg-warning/10 border-warning/20";
      case "low":
        return "text-accent bg-accent/10 border-accent/20";
      default:
        return "text-muted-foreground bg-muted border-border";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Skill Gap Analysis</h1>
            <p className="text-muted-foreground mt-1">
              Compare your skills against job requirements
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Target Role:</span>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-[260px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {jobRoles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl border border-border p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-success/10">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-success">{matchedSkills.length}</p>
              <p className="text-sm text-muted-foreground">Skills Matched</p>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-destructive/10">
              <XCircle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-destructive">{missingSkills.length}</p>
              <p className="text-sm text-muted-foreground">Skills to Learn</p>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg gradient-primary">
              <Target className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold">72%</p>
              <p className="text-sm text-muted-foreground">Job Readiness</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-xl font-semibold mb-6">Skills Comparison</h2>
            <SkillRadarChart data={radarData} />
          </div>
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-xl font-semibold mb-6">Gap Severity</h2>
            <SkillGapBarChart data={barData} />
          </div>
        </div>

        {/* Skills Breakdown */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Matched Skills */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-success/10">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <h2 className="text-xl font-semibold">Skills You Have</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {matchedSkills.map((skill) => (
                <SkillCard key={skill} skill={skill} level="advanced" />
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <h2 className="text-xl font-semibold">Skills to Develop</h2>
            </div>
            <div className="space-y-3">
              {missingSkills.map(({ skill, severity }) => (
                <div
                  key={skill}
                  className={`flex items-center justify-between p-3 rounded-lg border ${getSeverityColor(
                    severity
                  )}`}
                >
                  <span className="font-medium">{skill}</span>
                  <span className="text-xs font-medium uppercase">{severity} Priority</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-2xl gradient-primary p-6 md:p-8 text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.1),transparent)]" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Ready to bridge your skill gaps?
              </h3>
              <p className="text-primary-foreground/80">
                Follow a personalized learning path to become job-ready
              </p>
            </div>
            <Button
              size="lg"
              className="bg-card text-foreground hover:bg-card/90 shrink-0"
              asChild
            >
              <Link to="/dashboard/learning">
                View Learning Path
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SkillGap;
