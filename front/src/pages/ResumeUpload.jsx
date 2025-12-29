import { useState } from "react";
import api from "../services/api";
import { useApp } from "../context/AppContext";
import Loader from "../components/Loader";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setResumeData } = useApp();

  const uploadResume = async () => {
    if (!file) return alert("Select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await api.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResumeData(res.data);
      alert("Resume uploaded successfully");
    } catch {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Upload Resume</h1>

      <input
        type="file"
        accept=".pdf,.docx"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={uploadResume}
        className="ml-4 bg-emerald-500 text-white px-4 py-2 rounded"
      >
        Upload
      </button>

      {loading && <Loader />}
    </div>
  );
}
