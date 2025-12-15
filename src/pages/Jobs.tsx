import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import JobCard from "@/components/shared/JobCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Briefcase } from "lucide-react";

const jobsData = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$150k - $180k",
    matchPercentage: 92,
    requiredSkills: ["JavaScript", "React", "TypeScript", "CSS", "Testing", "Git"],
    matchedSkills: ["JavaScript", "React", "CSS", "Git"],
    missingSkills: ["TypeScript", "Testing"],
  },
  {
    title: "React Developer",
    company: "StartupXYZ",
    location: "Remote",
    salary: "$120k - $150k",
    matchPercentage: 95,
    requiredSkills: ["JavaScript", "React", "Redux", "HTML/CSS", "Git"],
    matchedSkills: ["JavaScript", "React", "HTML/CSS", "Git"],
    missingSkills: ["Redux"],
  },
  {
    title: "Full Stack Engineer",
    company: "BigTech Solutions",
    location: "New York, NY",
    salary: "$130k - $160k",
    matchPercentage: 78,
    requiredSkills: ["JavaScript", "React", "Node.js", "PostgreSQL", "Docker", "AWS"],
    matchedSkills: ["JavaScript", "React", "Node.js", "PostgreSQL"],
    missingSkills: ["Docker", "AWS"],
  },
  {
    title: "Software Engineer II",
    company: "Innovation Labs",
    location: "Austin, TX",
    salary: "$125k - $155k",
    matchPercentage: 85,
    requiredSkills: ["JavaScript", "React", "TypeScript", "Testing", "Agile"],
    matchedSkills: ["JavaScript", "React", "Agile"],
    missingSkills: ["TypeScript", "Testing"],
  },
  {
    title: "Frontend Architect",
    company: "Enterprise Co.",
    location: "Seattle, WA",
    salary: "$170k - $200k",
    matchPercentage: 65,
    requiredSkills: ["JavaScript", "React", "System Design", "Performance", "Leadership"],
    matchedSkills: ["JavaScript", "React"],
    missingSkills: ["System Design", "Performance", "Leadership"],
  },
  {
    title: "UI Engineer",
    company: "Design Studio",
    location: "Los Angeles, CA",
    salary: "$110k - $140k",
    matchPercentage: 88,
    requiredSkills: ["JavaScript", "React", "CSS", "Figma", "Animation"],
    matchedSkills: ["JavaScript", "React", "CSS"],
    missingSkills: ["Figma", "Animation"],
  },
];

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("match");

  const filteredJobs = jobsData
    .filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "match") return b.matchPercentage - a.matchPercentage;
      if (sortBy === "salary") return 0; // Simplified
      return 0;
    });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Job Recommendations</h1>
          <p className="text-muted-foreground mt-1">
            Jobs matched to your skills and experience
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search jobs or companies..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="match">Best Match</SelectItem>
              <SelectItem value="salary">Highest Salary</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Briefcase className="h-5 w-5" />
          <span>
            {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""} found
          </span>
        </div>

        {/* Job Cards */}
        <div className="grid gap-4">
          {filteredJobs.map((job, index) => (
            <JobCard
              key={`${job.title}-${job.company}`}
              {...job}
            />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Jobs;
