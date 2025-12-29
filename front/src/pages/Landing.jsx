import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

<button onClick={() => navigate("/login")}>
  Analyze My Resume
</button>

export default function Landing() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center text-center px-6">
      <div>
        <span className="inline-flex items-center gap-2 px-4 py-1 mb-6 bg-primary/20 rounded-full">
          ✨ AI-Powered Career Intelligence
        </span>

        <h1 className="text-5xl font-bold leading-tight">
          Bridge Your <span className="text-primary">Skill Gap</span><br />
          Accelerate Your Career
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-slate-300">
          Upload your resume, discover missing skills, get personalized job
          recommendations, and chart your path to success.
        </p>

        <div className="mt-8 flex gap-4 justify-center">
          <a
            href="/upload"
            className="bg-primary px-6 py-3 rounded-lg font-medium"
          >
            Analyze My Resume →
          </a>
          <button className="bg-white text-slate-900 px-6 py-3 rounded-lg">
            View Demo
          </button>
        </div>

        <div className="mt-14 grid grid-cols-3 gap-10 text-center">
          <div>
            <h2 className="text-3xl font-bold">50K+</h2>
            <p className="text-slate-400">Resumes Analyzed</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold">95%</h2>
            <p className="text-slate-400">Accuracy Rate</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold">1000+</h2>
            <p className="text-slate-400">Career Paths</p>
          </div>
        </div>
      </div>
    </section>
  );
}
