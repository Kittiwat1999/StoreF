import { useNavigate } from "react-router-dom";
import authApi from "../api/authApi";

import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axiosClient from "../api/axiosClient";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();

  const handleSignin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const navigate = useNavigate();
    try {
      await authApi.login({ email: email, password: password });
      const profile = await axiosClient.get("/auth/me"); 
      setUser(profile);
      navigate("/");
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <section className="flex min-h-[40vh] flex-1 flex-col justify-center bg-gradient-to-br from-orange-500 via-orange-600 to-slate-950 px-6 py-12 text-white lg:min-h-screen lg:px-12 lg:py-20">
          <div className="max-w-xl">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.3em] text-white/90 shadow-lg shadow-slate-950/20">
              <span className="text-orange-100">StoreF</span>
            </div>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
              StoreFront Management System
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-orange-100/90 sm:text-lg">
              Manage listings, orders, and customer interactions in one polished
              dashboard. Keep your marketplace organized with a system built for
              sellers and buyers.
            </p>
            <div className="mt-10 rounded-3xl border border-white/15 bg-white/5 p-6 shadow-[0_35px_120px_-30px_rgba(0,0,0,0.5)] backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-orange-200/80">
                Welcome back
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                Secure access for your storefront
              </h2>
              <p className="mt-4 text-sm leading-6 text-orange-100/80">
                Use your credentials to log in and continue managing products,
                carts, and orders with confidence.
              </p>
            </div>
          </div>
        </section>

        <section className="flex min-h-[40vh] w-full flex-col justify-center bg-slate-50 px-6 py-12 text-slate-950 lg:min-h-screen lg:w-[38%] lg:px-12 lg:py-20">
          <div className="mx-auto w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.35)]">
            <div className="mb-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-500">
                Login
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950">
                Sign in to StoreF
              </h2>
            </div>
            <form onSubmit={handleSignin} className="space-y-6">
              <label className="block text-sm font-medium text-slate-700">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-3xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500">
              <span>Dont have an account?</span>{" "}
              <Link
                to="/signup"
                className="font-semibold text-orange-500 hover:text-orange-600"
              >
                Sign up
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
