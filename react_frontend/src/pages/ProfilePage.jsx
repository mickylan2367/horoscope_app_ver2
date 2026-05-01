import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { apiFetch } from "../api";

export default function ProfilePage({ user, onAuth }) {
  const [username, setUsername] = useState(user?.username ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch("/api/profile/")
      .then((data) => {
        setUsername(data.username ?? "");
        setEmail(data.email ?? "");
        onAuth(data.authenticated ? data : null);
      })
      .catch((err) => setError(err.message || "Failed to load profile."));
  }, [onAuth]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    try {
      const nextUser = await apiFetch("/api/profile/", {
        method: "PUT",
        body: JSON.stringify({ username, email }),
      });
      onAuth(nextUser);
      setMessage("Profile updated.");
    } catch (err) {
      setError(err.message || "Failed to update profile.");
    }
  };

  return (
    <Layout user={user}>
      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-3xl font-bold text-[#5c3a3a]">PROFILE</h1>
        {message ? <p className="mb-4 text-sm text-[#5c7d3a]">{message}</p> : null}
        {error ? <p className="mb-4 text-sm text-[#a8465d]">{error}</p> : null}
        <label className="mb-2 block text-sm font-semibold">Username</label>
        <input className="mb-4 w-full rounded-full border border-[#f1cbd3] bg-[#fffafc] px-4 py-3" value={username} onChange={(event) => setUsername(event.target.value)} />
        <label className="mb-2 block text-sm font-semibold">Email</label>
        <input className="mb-6 w-full rounded-full border border-[#f1cbd3] bg-[#fffafc] px-4 py-3" value={email} onChange={(event) => setEmail(event.target.value)} />
        <button className="rounded-full bg-[#f4c2c2] px-6 py-3 font-semibold text-[#5c3a3a]" type="submit">SAVE</button>
      </form>
    </Layout>
  );
}
