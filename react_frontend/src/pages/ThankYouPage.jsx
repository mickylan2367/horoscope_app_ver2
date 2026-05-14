import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function ThankYouPage() {
  return (
    <Layout user={null} backgroundVariant="cosmic" headerVariant="cosmic" hideAuthActions>
      <section className="mx-auto flex min-h-[68vh] max-w-3xl items-center justify-center">
        <div className="home-content-scale relative w-full overflow-hidden rounded-[2rem] border border-white/12 bg-white/8 px-8 py-12 text-center shadow-2xl backdrop-blur-xl md:px-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(244,194,194,0.2),transparent_42%),radial-gradient(circle_at_18%_72%,rgba(216,196,255,0.14),transparent_32%)]" />
          <div className="relative">
            <p className="text-sm uppercase tracking-[0.32em] text-[#f4c2c2]">The spell is closed</p>
            <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">Thank you</h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-slate-200">
              Your session has been gently sealed. <br /> When you return, the door will open again from a fresh login.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
