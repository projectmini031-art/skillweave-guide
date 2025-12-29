import { NavLink } from "react-router-dom";

const tabs = [
  { name: "Dashboard", path: "/skills" },
  { name: "Skills", path: "/skills" },
  { name: "Gap Analysis", path: "/gap" },
  { name: "Jobs", path: "/jobs" },
  { name: "Learning", path: "/learning" },
  { name: "AI Advisor", path: "/advisor" },
];

export default function Navbar() {
  return (
    <nav className="bg-white border-b px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-10">
        <h1 className="text-xl font-bold text-primary">SkillPath</h1>

        <div className="flex gap-2">
          {tabs.map(t => (
            <NavLink
              key={t.name}
              to={t.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              {t.name}
            </NavLink>
          ))}
        </div>
      </div>

      <NavLink
        to="/upload"
        className="bg-primary text-white px-4 py-2 rounded-lg"
      >
        Upload Resume
      </NavLink>
    </nav>
  );
}
