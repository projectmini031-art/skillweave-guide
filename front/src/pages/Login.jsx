import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email);
    navigate("/upload");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>

        <input
          type="email"
          placeholder="Enter your email"
          required
          className="w-full border p-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="w-full bg-emerald-500 text-white py-2 rounded">
          Continue
        </button>
      </form>
    </div>
  );
}
