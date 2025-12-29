import { useContext, useState } from "react";
import api from "../services/api";
import { AppContext } from "../context/AppContext";

export default function SkillGap() {
  const { resumeSkills, setGapResult } = useContext(AppContext);
  const [role, setRole] = useState("Data Scientist");

  const analyzeGap = async () => {
    const res = await api.post("/analysis/gap", {
      skills: resumeSkills,
      target_role: role,
    });

    setGapResult(res.data);
  };

  return (
    <div className="p-10">
      <button
        onClick={analyzeGap}
        className="bg-primary text-white px-6 py-2 rounded"
      >
        Analyze Skill Gap
      </button>
    </div>
  );
}
