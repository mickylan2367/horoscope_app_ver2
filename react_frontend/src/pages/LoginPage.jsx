import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthFormCard from "../components/AuthFormCard";
import Layout from "../components/Layout";
import { apiFetch } from "../api";

export default function LoginPage({ onAuth }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const user = await apiFetch("/api/auth/login/", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      onAuth(user);
      navigate("/chart/warp", { state: { source: "login" } });
    } catch (err) {
      setError(err.message || "Login failed.");
    }
  };
  const skipAuth = () => navigate("/chart/warp", { state: { source: "skip-auth" } });

  return (
    <Layout user={null} headerVariant="cosmic" hideAuthActions>
      <AuthFormCard
        onSubmit={handleSubmit}
        title="LOGIN"
        description="Sign in with your LovelyWitch Life account to keep your charts and records in one place."
        error={error}
        submitLabel="LOGIN"
        onSkip={skipAuth}
        footer={(
          <p className="mt-5 text-center text-sm text-slate-300">
            New here?{" "}
            <Link className="font-semibold text-[#f4c2c2] transition hover:text-white" to="/register">
              Create an account
            </Link>
          </p>
        )}
      >
        <label className="mb-2 block text-sm font-medium text-slate-200">Username</label>
        <input
          className="mb-4 w-full rounded-full border border-white/12 bg-[#2a2146]/75 px-4 py-3 text-white placeholder:text-slate-300 outline-none transition focus:border-white/20 focus:bg-[#332953]/82"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label className="mb-2 block text-sm font-medium text-slate-200">Password</label>
        <input
          className="mb-6 w-full rounded-full border border-white/12 bg-[#2a2146]/75 px-4 py-3 text-white placeholder:text-slate-300 outline-none transition focus:border-white/20 focus:bg-[#332953]/82"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </AuthFormCard>
    </Layout>
  );
}
