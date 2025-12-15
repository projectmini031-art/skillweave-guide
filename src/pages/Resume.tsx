import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import FileUpload from "@/components/shared/FileUpload";
import SkillCard from "@/components/shared/SkillCard";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles, RefreshCw, Plus, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Resume = () => {
  const [uploaded, setUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const { toast } = useToast();

  const extractedSkills = [
    { skill: "JavaScript", level: "advanced" as const },
    { skill: "React.js", level: "advanced" as const },
    { skill: "TypeScript", level: "intermediate" as const },
    { skill: "Node.js", level: "intermediate" as const },
    { skill: "HTML/CSS", level: "advanced" as const },
    { skill: "Git", level: "advanced" as const },
    { skill: "REST APIs", level: "intermediate" as const },
    { skill: "MongoDB", level: "beginner" as const },
    { skill: "PostgreSQL", level: "intermediate" as const },
    { skill: "Docker", level: "beginner" as const },
    { skill: "AWS", level: "beginner" as const },
    { skill: "Agile/Scrum", level: "intermediate" as const },
  ];

  const handleFileSelect = (file: File) => {
    setUploaded(true);

    // Simulate AI analysis
    setTimeout(() => {
      setAnalyzing(true);
    }, 500);

    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
      toast({
        title: "Analysis Complete!",
        description: `We found ${extractedSkills.length} skills in your resume.`,
      });
    }, 3000);
  };

  const handleReupload = () => {
    setUploaded(false);
    setAnalyzing(false);
    setAnalyzed(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Resume & Skills</h1>
          <p className="text-muted-foreground mt-1">
            Upload your resume to extract and analyze your skills
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg gradient-primary">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Upload Resume</h2>
              <p className="text-sm text-muted-foreground">
                PDF, DOC, or DOCX formats supported
              </p>
            </div>
          </div>

          {!uploaded ? (
            <FileUpload onFileSelect={handleFileSelect} />
          ) : (
            <div className="space-y-6">
              {/* Uploaded File Info */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="font-medium">Resume uploaded successfully</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleReupload}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Upload New
                </Button>
              </div>

              {/* Analysis Status */}
              {analyzing && (
                <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full gradient-primary animate-pulse" />
                    <Sparkles className="absolute inset-0 m-auto h-10 w-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Analyzing Your Resume</h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    Our AI is extracting and categorizing your skills. This only
                    takes a few seconds...
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Extracted Skills */}
        {analyzed && (
          <div className="bg-card rounded-xl border border-border p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg gradient-accent">
                  <Sparkles className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Extracted Skills</h2>
                  <p className="text-sm text-muted-foreground">
                    {extractedSkills.length} skills identified from your resume
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </div>

            {/* Skills by Level */}
            <div className="space-y-6">
              {(["advanced", "intermediate", "beginner"] as const).map((level) => {
                const levelSkills = extractedSkills.filter((s) => s.level === level);
                if (levelSkills.length === 0) return null;

                return (
                  <div key={level}>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3 capitalize">
                      {level} ({levelSkills.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {levelSkills.map(({ skill, level }) => (
                        <SkillCard
                          key={skill}
                          skill={skill}
                          level={level}
                          removable
                          onRemove={() => {}}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Banner */}
            <div className="mt-8 p-6 rounded-xl bg-muted/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-semibold">Ready to analyze your skill gaps?</h3>
                <p className="text-sm text-muted-foreground">
                  Compare your skills against job requirements
                </p>
              </div>
              <Button variant="gradient" asChild>
                <a href="/dashboard/skill-gap">Analyze Skill Gaps</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Resume;
