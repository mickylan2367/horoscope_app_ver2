import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  return (
    <Layout user={null} headerVariant="cosmic" hideAuthActions>
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-md rounded-[2rem] border border-white/12 bg-[#1a1530]/58 p-8 text-white shadow-[0_18px_70px_rgba(0,0,0,0.32)] backdrop-blur-2xl"
      >
        <h1 className="mb-3 text-3xl font-bold tracking-[0.08em] text-[#f4eeff]">LOGIN</h1>
        <p className="mb-6 text-sm leading-7 text-slate-300">
          Sign in to open your chart and keep your records in one place.
        </p>
        {error ? <p className="mb-4 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">{error}</p> : null}
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
        <button
          className="w-full cursor-pointer rounded-full bg-[#f4c2c2]/82 px-6 py-3.5 text-base font-semibold text-[#5c3a3a] shadow-[0_10px_24px_rgba(244,194,194,0.14)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#ffe5ea]/95 hover:text-[#7b4c5a] hover:shadow-[0_14px_30px_rgba(244,194,194,0.24),0_0_0_1px_rgba(255,255,255,0.38)_inset] active:translate-y-0"
          type="submit"
        >
          LOGIN
        </button>

        <div className="my-7 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs tracking-[0.28em] text-slate-400">OR</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <button
          type="button"
          disabled
          className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full border border-white/12 bg-white/8 px-6 py-3.5 text-base font-medium text-slate-200 opacity-85"
        >
          Continue with Google
        </button>
        <p className="mt-3 text-center text-xs text-slate-400">
          Google login will be added here.
        </p>

        <p className="mt-5 text-center text-sm text-slate-300">
          New here?{" "}
          <Link className="font-semibold text-[#f4c2c2] transition hover:text-white" to="/register">
            Create an account
          </Link>
        </p>
      </form>
    </Layout>
  );
}
