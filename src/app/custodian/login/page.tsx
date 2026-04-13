"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getHostels, Hostel } from "../../../data/hostels";

const LOGO_URL = "https://assets.kiloapps.io/user_e36bb1a3-2840-4d55-a410-fda7687ef308/ddc1b378-fff3-4a8c-89b8-1c8be6fbe2d2/e23a92f2-c404-4f22-8678-b168d3c6ff5f.jpg";

export default function CustodianLogin() {
  const router = useRouter();
  const [hostels, setHostels] = useState<Hostel[]>(getHostels());
  const [selectedHostel, setSelectedHostel] = useState<number | null>(null);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [custodianName, setCustodianName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedHostelData = hostels.find((h) => h.id === selectedHostel);

  const handleRefresh = () => {
    setHostels(getHostels());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedHostelData) {
      setError("Please select a hostel");
      return;
    }

    if (mode === "signin") {
      setLoading(true);
      setError("");

      if (
        selectedHostelData.custodianEmail.toLowerCase() === email.toLowerCase() &&
        selectedHostelData.custodianPassword === password
      ) {
        router.push(`/custodian/${selectedHostelData.id}`);
      } else {
        setError("Invalid email or password");
        setLoading(false);
      }
    } else {
      setLoading(true);
      setError("");
      setSuccess("");

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      if (!custodianName || !email || !password) {
        setError("Please fill all fields");
        setLoading(false);
        return;
      }

      if (selectedHostelData.custodianEmail) {
        setError("This hostel already has an account. Please sign in.");
        setLoading(false);
        return;
      }

      const hostelIndex = hostels.findIndex((h) => h.id === selectedHostel);
      if (hostelIndex !== -1) {
        const updatedHostels = [...hostels];
        updatedHostels[hostelIndex] = {
          ...updatedHostels[hostelIndex],
          custodianName,
          custodianEmail: email.toLowerCase(),
          custodianPassword: "1234",
        };
        setHostels(updatedHostels);
      }

      setSuccess("Account created! Password is 1234");
      setLoading(false);
      setMode("signin");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setCustodianName("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center p-2 shadow-lg">
              <img src={LOGO_URL} alt="StayEasy Logo" className="w-full h-full object-contain" />
            </div>
          </Link>
          <h1 className="text-white font-bold text-2xl">Custodian Dashboard</h1>
          <p className="text-blue-200 text-sm mt-1">Manage your hostel</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <div className="flex border-b border-slate-200 mb-4">
            <button
              onClick={() => { setMode("signin"); setError(""); setSuccess(""); }}
              className={`flex-1 py-2 text-sm font-medium transition ${
                mode === "signin" ? "text-orange-500 border-b-2 border-orange-500" : "text-slate-500"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode("signup"); setError(""); setSuccess(""); }}
              className={`flex-1 py-2 text-sm font-medium transition ${
                mode === "signup" ? "text-orange-500 border-b-2 border-orange-500" : "text-slate-500"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Select Hostel
                </label>
                <select
                  value={selectedHostel || ""}
                  onChange={(e) => {
                    setSelectedHostel(e.target.value ? parseInt(e.target.value) : null);
                    setError("");
                    handleRefresh();
                  }}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400"
                >
                  <option value="">Choose a hostel</option>
                  {hostels.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={handleRefresh}
                className="self-end px-3 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm hover:bg-blue-200"
                title="Refresh list"
              >
                ↻
              </button>
            </div>

            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={custodianName}
                  onChange={(e) => setCustodianName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400"
                  placeholder="e.g. John Odea"
                />
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
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400"
                placeholder="your email"
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
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400"
                placeholder="Enter your password"
              />
            </div>

            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400"
                  placeholder="Confirm your password"
                />
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-600 text-sm p-3 rounded-lg">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-medium transition ${
                loading
                  ? "bg-slate-200 text-slate-400"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
            >
              {loading
                ? mode === "signin"
                  ? "Signing in..."
                  : "Creating account..."
                : mode === "signin"
                ? "Sign In"
                : "Sign Up"}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <Link
              href="/"
              className="block text-center text-sm text-slate-500 hover:text-blue-600"
            >
              ← Back to Dashboard Selection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}