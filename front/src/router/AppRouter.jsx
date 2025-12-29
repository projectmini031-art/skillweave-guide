import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import ResumeUpload from "../pages/ResumeUpload";
import SkillDashboard from "../pages/SkillDashboard";
import SkillGap from "../pages/SkillGap";
import LearningPath from "../pages/LearningPath";
import Jobs from "../pages/Jobs";
import AIAdvisor from "../pages/AIAdvisor";

/* ---------- AUTH GUARD ---------- */
const PrivateRoute = ({ children }) => {
  const { user } = useApp();
  return user ? children : <Navigate to="/login" />;
};

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ---------- PUBLIC ROUTES ---------- */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* ---------- PROTECTED APP ---------- */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <div className="min-h-screen bg-gray-50">
                  <Routes>
                    <Route path="upload" element={<ResumeUpload />} />
                    <Route path="skills" element={<SkillDashboard />} />
                    <Route path="gap" element={<SkillGap />} />
                    <Route path="learning" element={<LearningPath />} />
                    <Route path="jobs" element={<Jobs />} />
                    <Route path="advisor" element={<AIAdvisor />} />
                  </Routes>
                </div>
                <Footer />
              </>
            </PrivateRoute>
          }
        />

        {/* ---------- FALLBACK ---------- */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}
