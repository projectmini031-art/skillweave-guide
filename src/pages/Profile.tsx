import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  User,
  Mail,
  Briefcase,
  MapPin,
  Calendar,
  FileText,
  Target,
  GraduationCap,
  Trophy,
  Edit2,
  Save,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    title: "Frontend Developer",
    location: "San Francisco, CA",
    joinedDate: "January 2024",
  });
  const { toast } = useToast();

  const handleSave = () => {
    setEditing(false);
    toast({
      title: "Profile updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const stats = [
    { label: "Skills Analyzed", value: 24, icon: Target },
    { label: "Jobs Matched", value: 15, icon: Briefcase },
    { label: "Courses Completed", value: 8, icon: GraduationCap },
    { label: "Achievements", value: 5, icon: Trophy },
  ];

  const recentActivity = [
    { action: "Completed TypeScript module", date: "2 days ago", type: "learning" },
    { action: "Uploaded new resume", date: "1 week ago", type: "resume" },
    { action: "Skill gap analysis completed", date: "1 week ago", type: "analysis" },
    { action: "Started Testing course", date: "2 weeks ago", type: "learning" },
  ];

  const achievements = [
    { title: "First Steps", description: "Complete your first skill analysis", earned: true },
    { title: "Quick Learner", description: "Complete 5 learning modules", earned: true },
    { title: "Skill Master", description: "Reach 80% skill match", earned: false, progress: 72 },
    { title: "Job Ready", description: "Match with 10+ jobs", earned: true },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {/* Cover */}
          <div className="h-32 gradient-hero" />

          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-12">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-2xl bg-card border-4 border-card flex items-center justify-center gradient-primary text-primary-foreground text-3xl font-bold">
                {profile.name.split(" ").map((n) => n[0]).join("")}
              </div>

              <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">{profile.name}</h1>
                  <p className="text-muted-foreground">{profile.title}</p>
                </div>
                <Button
                  variant={editing ? "outline" : "gradient"}
                  onClick={() => (editing ? handleSave() : setEditing(true))}
                >
                  {editing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Details */}
            <div className="grid sm:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{profile.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{profile.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Joined {profile.joinedDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        {editing && (
          <div className="bg-card rounded-xl border border-border p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Edit Profile</h2>
              <Button variant="ghost" size="icon" onClick={() => setEditing(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-xl border border-border p-6 flex items-center gap-4"
            >
              <div className="p-3 rounded-xl gradient-primary">
                <stat.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/50"
                >
                  <div
                    className={`p-2 rounded-lg ${
                      activity.type === "learning"
                        ? "bg-accent/10 text-accent"
                        : activity.type === "resume"
                        ? "bg-primary/10 text-primary"
                        : "bg-success/10 text-success"
                    }`}
                  >
                    {activity.type === "learning" ? (
                      <GraduationCap className="h-4 w-4" />
                    ) : activity.type === "resume" ? (
                      <FileText className="h-4 w-4" />
                    ) : (
                      <Target className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-xl font-semibold mb-6">Achievements</h2>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    achievement.earned
                      ? "bg-success/5 border-success/20"
                      : "bg-muted/50 border-border"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        achievement.earned
                          ? "bg-success text-success-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Trophy className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{achievement.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                      {achievement.progress && !achievement.earned && (
                        <div className="mt-2 flex items-center gap-2">
                          <Progress value={achievement.progress} className="h-2 flex-1" />
                          <span className="text-xs text-muted-foreground">
                            {achievement.progress}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
