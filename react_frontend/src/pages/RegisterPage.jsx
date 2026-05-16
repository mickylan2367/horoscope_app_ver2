import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthFormCard from "../components/AuthFormCard";
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
  const skipAuth = () => navigate("/chart/warp", { state: { source: "skip-auth" } });

  const labelFor = (field) => {
    if (field === "email") return "email (optional)";
    return field.replace("1", "").replace("2", " confirmation");
  };

  return (
    <Layout user={null} headerVariant="cosmic" hideAuthActions>
      <AuthFormCard
        onSubmit={handleSubmit}
        title="NEW ACCOUNT"
        description="Create a LovelyWitch Life account to save your chart history and diary flow."
        error={error}
        submitLabel="CREATE"
        onSkip={skipAuth}
      >
        {["username", "email", "password1", "password2"].map((field) => (
          <div key={field}>
            <label className="mb-2 block text-sm font-medium capitalize text-slate-200">{labelFor(field)}</label>
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
      </AuthFormCard>
    </Layout>
  );
}
