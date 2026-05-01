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
      navigate("/diary");
    } catch (err) {
      setError(err.message || "Login failed.");
    }
  };

  return (
    <Layout user={null}>
      <form onSubmit={handleSubmit} className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-3xl font-bold text-[#5c3a3a]">LOGIN</h1>
        {error ? <p className="mb-4 text-sm text-[#a8465d]">{error}</p> : null}
        <label className="mb-2 block text-sm font-semibold">Username</label>
        <input className="mb-4 w-full rounded-full border border-[#f1cbd3] bg-[#fffafc] px-4 py-3" value={username} onChange={(event) => setUsername(event.target.value)} />
        <label className="mb-2 block text-sm font-semibold">Password</label>
        <input className="mb-6 w-full rounded-full border border-[#f1cbd3] bg-[#fffafc] px-4 py-3" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <button className="w-full rounded-full bg-[#f4c2c2] px-6 py-3 font-semibold text-[#5c3a3a]" type="submit">LOGIN</button>
        <p className="mt-5 text-center text-sm text-[#8b6870]">
          New here? <Link className="font-semibold text-[#5c3a3a]" to="/register">Create an account</Link>
        </p>
      </form>
    </Layout>
  );
}
