"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Admin {
  email: string;
  password: string;
  name: string;
}

let adminAccount: Admin | null = {
  email: "admin@stayeasy.com",
  password: "admin123",
  name: "System Admin",
};

export default function AdminLogin() {
  const router = useRouter();
  const [view, setView] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (adminAccount && email === adminAccount.email && password === adminAccount.password) {
      router.push("/admin");
    } else {
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      setLoading(false);
      return;
    }

    adminAccount = { email, password, name };
    alert("Account created successfully! Please sign in.");
    setView("login");
    setEmail("");
    setPassword("");
    setName("");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <span className="text-orange-600 font-black text-2xl">S</span>
            </div>
          </Link>
          <h1 className="text-white font-bold text-2xl">
            {view === "login" ? "Admin Login" : "Admin Sign Up"}
          </h1>
          <p className="text-orange-200 text-sm mt-1">
            {view === "login" ? "Sign in to manage hostels" : "Create your admin account"}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl">
          {view === "signup" ? (
            <form onSubmit={handleSignup} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400"
                  placeholder="admin@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400"
                  placeholder="At least 4 characters"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-medium transition ${
                  loading
                    ? "bg-slate-200 text-slate-400"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400"
                  placeholder="admin@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-medium transition ${
                  loading
                    ? "bg-slate-200 text-slate-400"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          )}

          <div className="mt-4 pt-4 border-t border-slate-100">
            {view === "login" ? (
              <button
                onClick={() => { setView("signup"); setError(""); }}
                className="block text-center w-full text-sm text-slate-500 hover:text-orange-600"
              >
                Don&apos;t have an account? Sign Up
              </button>
            ) : (
              <button
                onClick={() => { setView("login"); setError(""); }}
                className="block text-center w-full text-sm text-slate-500 hover:text-orange-600"
              >
                Already have an account? Sign In
              </button>
            )}
            <Link
              href="/"
              className="block text-center text-sm text-slate-400 hover:text-orange-600 mt-3"
            >
              ← Back to Dashboard Selection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}