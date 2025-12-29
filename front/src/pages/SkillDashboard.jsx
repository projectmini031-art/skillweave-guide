import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function SkillDashboard() {
  const { resumeSkills } = useContext(AppContext);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Your Skills</h1>

      <div className="grid grid-cols-2 gap-4">
        {resumeSkills.map((skill, i) => (
          <div
            key={i}
            className="p-4 bg-white rounded shadow border"
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
}
