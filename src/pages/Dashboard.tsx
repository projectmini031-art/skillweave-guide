import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/shared/StatCard";
import SkillCard from "@/components/shared/SkillCard";
import { Button } from "@/components/ui/button";
import {
  Target,
  Briefcase,
  GraduationCap,
  TrendingUp,
  FileText,
  ArrowRight,
  Zap,
} from "lucide-react";

const Dashboard = () => {
  const userSkills = [
    { skill: "JavaScript", level: "advanced" as const },
    { skill: "React", level: "advanced" as const },
    { skill: "TypeScript", level: "intermediate" as const },
    { skill: "Node.js", level: "intermediate" as const },
    { skill: "Python", level: "beginner" as const },
    { skill: "SQL", level: "intermediate" as const },
  ];

  const recommendedJobs = [
    { title: "Senior Frontend Developer", match: 92 },
    { title: "Full Stack Engineer", match: 78 },
    { title: "React Developer", match: 95 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Alex! 👋</h1>
            <p className="text-muted-foreground mt-1">
              Here's an overview of your career progress
            </p>
          </div>
          <Button variant="gradient" asChild>
            <Link to="/dashboard/resume">
              <FileText className="h-4 w-4 mr-2" />
              Upload New Resume
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Skills Identified"
            value={24}
            subtitle="From your resume"
            icon={Zap}
            variant="primary"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Job Readiness"
            value="78%"
            subtitle="Overall score"
            icon={Target}
            variant="accent"
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Jobs Matched"
            value={15}
            subtitle="Based on your skills"
            icon={Briefcase}
            variant="success"
          />
          <StatCard
            title="Learning Progress"
            value="45%"
            subtitle="Current path"
            icon={GraduationCap}
            trend={{ value: 8, isPositive: true }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Skills Overview */}
          <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Your Skills</h2>
              <Link
                to="/dashboard/resume"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-3">
              {userSkills.map(({ skill, level }) => (
                <SkillCard key={skill} skill={skill} level={level} />
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">
                Quick Actions
              </h3>
              <div className="grid sm:grid-cols-3 gap-3">
                <Button variant="outline" className="justify-start" asChild>
                  <Link to="/dashboard/skill-gap">
                    <Target className="h-4 w-4 mr-2" />
                    Analyze Gaps
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link to="/dashboard/jobs">
                    <Briefcase className="h-4 w-4 mr-2" />
                    View Jobs
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link to="/dashboard/learning">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Learning Path
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Top Job Matches */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Top Matches</h2>
              <Link
                to="/dashboard/jobs"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {recommendedJobs.map((job, index) => (
                <div
                  key={job.title}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                    <span className="font-medium">{job.title}</span>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-lg font-bold ${
                        job.match >= 90
                          ? "text-success"
                          : job.match >= 70
                          ? "text-accent"
                          : "text-warning"
                      }`}
                    >
                      {job.match}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="gradient" className="w-full mt-6" asChild>
              <Link to="/dashboard/jobs">
                Explore All Jobs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Progress Banner */}
        <div className="rounded-2xl gradient-primary p-6 md:p-8 text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.1),transparent)]" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Ready to level up your skills?
              </h3>
              <p className="text-primary-foreground/80">
                Start your personalized learning path and bridge your skill gaps
                today.
              </p>
            </div>
            <Button
              size="lg"
              className="bg-card text-foreground hover:bg-card/90 shrink-0"
              asChild
            >
              <Link to="/dashboard/learning">
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
