import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  GraduationCap,
  BookOpen,
  Video,
  Clock,
  CheckCircle,
  Circle,
  Lock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Star,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const learningPath = [
  {
    id: 1,
    title: "TypeScript Fundamentals",
    description: "Master TypeScript basics and type systems",
    duration: "8 hours",
    completed: true,
    modules: [
      { name: "Introduction to TypeScript", completed: true },
      { name: "Basic Types", completed: true },
      { name: "Interfaces & Types", completed: true },
      { name: "Functions & Generics", completed: true },
    ],
    resources: [
      { type: "video", title: "TypeScript Crash Course", url: "#" },
      { type: "article", title: "TypeScript Documentation", url: "#" },
    ],
  },
  {
    id: 2,
    title: "Advanced TypeScript",
    description: "Learn advanced patterns and best practices",
    duration: "10 hours",
    completed: false,
    progress: 60,
    modules: [
      { name: "Advanced Types", completed: true },
      { name: "Decorators", completed: true },
      { name: "Module Systems", completed: false },
      { name: "Type Guards & Narrowing", completed: false },
    ],
    resources: [
      { type: "video", title: "Advanced TypeScript Patterns", url: "#" },
      { type: "article", title: "TypeScript Best Practices", url: "#" },
    ],
  },
  {
    id: 3,
    title: "Testing with Jest & RTL",
    description: "Write comprehensive tests for React applications",
    duration: "12 hours",
    completed: false,
    locked: false,
    modules: [
      { name: "Jest Fundamentals", completed: false },
      { name: "React Testing Library", completed: false },
      { name: "Mocking & Spies", completed: false },
      { name: "Integration Testing", completed: false },
    ],
    resources: [
      { type: "video", title: "Testing React Apps", url: "#" },
      { type: "article", title: "Kent C. Dodds Testing Guide", url: "#" },
    ],
  },
  {
    id: 4,
    title: "System Design Basics",
    description: "Learn fundamental system design concepts",
    duration: "15 hours",
    completed: false,
    locked: true,
    modules: [
      { name: "Scalability Concepts", completed: false },
      { name: "Database Design", completed: false },
      { name: "Caching Strategies", completed: false },
      { name: "Load Balancing", completed: false },
    ],
    resources: [
      { type: "video", title: "System Design Primer", url: "#" },
      { type: "article", title: "System Design Interviews", url: "#" },
    ],
  },
];

const Learning = () => {
  const [expandedModule, setExpandedModule] = useState<number | null>(2);

  const totalModules = learningPath.reduce((acc, path) => acc + path.modules.length, 0);
  const completedModules = learningPath.reduce(
    (acc, path) => acc + path.modules.filter((m) => m.completed).length,
    0
  );
  const overallProgress = Math.round((completedModules / totalModules) * 100);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Learning Path</h1>
            <p className="text-muted-foreground mt-1">
              Your personalized roadmap to becoming job-ready
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-2xl font-bold">{overallProgress}%</p>
              <p className="text-sm text-muted-foreground">Overall Progress</p>
            </div>
            <div className="w-24">
              <Progress value={overallProgress} className="h-3" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <CheckCircle className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-xl font-bold">{completedModules}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xl font-bold">{totalModules - completedModules}</p>
              <p className="text-xs text-muted-foreground">Remaining</p>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <Clock className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-xl font-bold">45h</p>
              <p className="text-xs text-muted-foreground">Total Time</p>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg gradient-primary">
              <Star className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-xl font-bold">3</p>
              <p className="text-xs text-muted-foreground">Skills Unlocked</p>
            </div>
          </div>
        </div>

        {/* Learning Modules */}
        <div className="space-y-4">
          {learningPath.map((path, index) => (
            <div
              key={path.id}
              className={cn(
                "bg-card rounded-xl border border-border overflow-hidden transition-all duration-300",
                path.locked && "opacity-60"
              )}
            >
              {/* Module Header */}
              <button
                onClick={() => !path.locked && setExpandedModule(expandedModule === path.id ? null : path.id)}
                disabled={path.locked}
                className="w-full p-6 flex items-center gap-4 hover:bg-muted/50 transition-colors disabled:cursor-not-allowed"
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                    path.completed
                      ? "bg-success text-success-foreground"
                      : path.locked
                      ? "bg-muted text-muted-foreground"
                      : "gradient-primary text-primary-foreground"
                  )}
                >
                  {path.completed ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : path.locked ? (
                    <Lock className="h-6 w-6" />
                  ) : (
                    <span className="text-lg font-bold">{index + 1}</span>
                  )}
                </div>

                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{path.title}</h3>
                    {path.completed && (
                      <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">
                        Completed
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{path.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {path.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {path.modules.length} modules
                    </span>
                  </div>
                  {path.progress !== undefined && !path.completed && (
                    <div className="mt-3 flex items-center gap-3">
                      <Progress value={path.progress} className="h-2 flex-1" />
                      <span className="text-sm font-medium">{path.progress}%</span>
                    </div>
                  )}
                </div>

                {!path.locked && (
                  <div className="shrink-0">
                    {expandedModule === path.id ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                )}
              </button>

              {/* Expanded Content */}
              {expandedModule === path.id && !path.locked && (
                <div className="px-6 pb-6 border-t border-border animate-fade-in">
                  <div className="grid md:grid-cols-2 gap-6 pt-6">
                    {/* Modules */}
                    <div>
                      <h4 className="font-semibold mb-4">Modules</h4>
                      <div className="space-y-2">
                        {path.modules.map((module, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                          >
                            {module.completed ? (
                              <CheckCircle className="h-5 w-5 text-success shrink-0" />
                            ) : (
                              <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                            )}
                            <span
                              className={cn(
                                "text-sm",
                                module.completed && "text-muted-foreground line-through"
                              )}
                            >
                              {module.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Resources */}
                    <div>
                      <h4 className="font-semibold mb-4">Resources</h4>
                      <div className="space-y-2">
                        {path.resources.map((resource, idx) => (
                          <a
                            key={idx}
                            href={resource.url}
                            className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                          >
                            {resource.type === "video" ? (
                              <Video className="h-5 w-5 text-primary shrink-0" />
                            ) : (
                              <BookOpen className="h-5 w-5 text-primary shrink-0" />
                            )}
                            <span className="text-sm flex-1">{resource.title}</span>
                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                          </a>
                        ))}
                      </div>
                      <Button variant="gradient" className="w-full mt-4">
                        <Zap className="h-4 w-4 mr-2" />
                        {path.completed ? "Review" : "Continue Learning"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Learning;
