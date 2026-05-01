import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function ThankYouPage() {
  return (
    <Layout user={null}>
      <section className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-[#5c3a3a]">Thank you</h1>
        <p className="mt-4 text-[#8b6870]">You have been logged out.</p>
        <Link className="mt-6 inline-flex rounded-full bg-[#f4c2c2] px-6 py-3 font-semibold text-[#5c3a3a]" to="/login">
          LOGIN
        </Link>
      </section>
    </Layout>
  );
}
