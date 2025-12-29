import { Link } from "react-router-dom";
import { isAuthenticated, logout } from "../services/auth";

export default function Navbar() {
  const auth = isAuthenticated();

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-slate-900 text-white">
      <Link to="/" className="text-xl font-bold text-emerald-400">
        SkillPath
      </Link>

      <div className="flex gap-6">
        <Link to="/skills">Skills</Link>
        <Link to="/gap">Gap Analysis</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/learning">Learning</Link>
        <Link to="/advisor">AI Advisor</Link>
      </div>

      {auth ? (
        <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          className="bg-emerald-500 px-4 py-2 rounded"
        >
          Get Started
        </Link>
      )}
    </nav>
  );
}
