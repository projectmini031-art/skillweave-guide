import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const getSkillGap = async (skills, role) => {
  return api.post("/analysis/skill-gap", { skills, role });
};

export const getJobs = async () => {
  return api.get("/jobs/recommend");
};

export const getLearningPath = async () => {
  return api.get("/learning/path");
};

export const chatWithAI = async (message) => {
  return api.post("/rag/chat", { message });
};

export default api;
