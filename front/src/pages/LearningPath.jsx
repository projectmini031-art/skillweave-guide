import { useContext } from "react";
import api from "../services/api";
import { AppContext } from "../context/AppContext";

export default function LearningPath() {
  const { gapResult, setLearningPath } = useContext(AppContext);

  const generatePath = async () => {
    const res = await api.post("/learning/path", {
      missing_skills: gapResult.missing_skills,
    });

    setLearningPath(res.data);
  };

  return (
    <button
      onClick={generatePath}
      className="bg-primary text-white px-6 py-2 rounded"
    >
      Generate Learning Path
    </button>
  );
}
