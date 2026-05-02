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
      navigate("/home");
    } catch (err) {
      setError(err.message || "Registration failed.");
    }
  };

  return (
    <Layout user={null}>
      <form onSubmit={handleSubmit} className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-3xl font-bold text-[#5c3a3a]">NEW ACCOUNT</h1>
        {error ? <p className="mb-4 text-sm text-[#a8465d]">{error}</p> : null}
        {["username", "email", "password1", "password2"].map((field) => (
          <div key={field}>
            <label className="mb-2 block text-sm font-semibold capitalize">{field.replace("1", "").replace("2", " confirmation")}</label>
            <input
              className="mb-4 w-full rounded-full border border-[#f1cbd3] bg-[#fffafc] px-4 py-3"
              type={field.startsWith("password") ? "password" : "text"}
              value={form[field]}
              onChange={update(field)}
            />
          </div>
        ))}
        <p className="mb-4 text-xs leading-6 text-[#8b6870]">
          Password must be at least 8 characters and cannot be too common or entirely numeric.
        </p>
        <button className="w-full rounded-full bg-[#f4c2c2] px-6 py-3 font-semibold text-[#5c3a3a]" type="submit">CREATE</button>
      </form>
    </Layout>
  );
}
