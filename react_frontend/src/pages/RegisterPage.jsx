import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { apiFetch } from "../api";

export default function RegisterPage({ onAuth }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password1: "", password2: "" });
  const [error, setError] = useState("");

  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const user = await apiFetch("/api/auth/register/", {
        method: "POST",
        body: JSON.stringify(form),
      });
      onAuth(user);
      navigate("/chart/warp", { state: { source: "register" } });
    } catch (err) {
      setError(err.message || "Registration failed.");
    }
  };

  return (
    <Layout user={null} headerVariant="cosmic" hideAuthActions>
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-md rounded-[2rem] border border-white/12 bg-[#1a1530]/58 p-8 text-white shadow-[0_18px_70px_rgba(0,0,0,0.32)] backdrop-blur-2xl"
      >
        <h1 className="mb-3 text-3xl font-bold tracking-[0.08em] text-[#f4eeff]">NEW ACCOUNT</h1>
        <p className="mb-6 text-sm leading-7 text-slate-300">
          Create an account to save your chart history and diary flow.
        </p>
        {error ? <p className="mb-4 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">{error}</p> : null}
        {["username", "email", "password1", "password2"].map((field) => (
          <div key={field}>
            <label className="mb-2 block text-sm font-medium capitalize text-slate-200">{field.replace("1", "").replace("2", " confirmation")}</label>
            <input
              className="mb-4 w-full rounded-full border border-white/12 bg-[#2a2146]/75 px-4 py-3 text-white placeholder:text-slate-300 outline-none transition focus:border-white/20 focus:bg-[#332953]/82"
              type={field.startsWith("password") ? "password" : "text"}
              value={form[field]}
              onChange={update(field)}
            />
          </div>
        ))}
        <p className="mb-4 text-xs leading-6 text-slate-400">
          Password must be at least 8 characters and cannot be too common or entirely numeric.
        </p>
        <button
          className="w-full cursor-pointer rounded-full bg-[#f4c2c2] px-6 py-3.5 text-base font-semibold text-[#5c3a3a] transition hover:scale-[1.01]"
          type="submit"
        >
          CREATE
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
          Google signup will be added here.
        </p>
      </form>
    </Layout>
  );
}
