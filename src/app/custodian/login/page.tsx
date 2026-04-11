"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LOGO_URL = "https://assets.kiloapps.io/user_e36bb1a3-2840-4d55-a410-fda7687ef308/ddc1b378-fff3-4a8c-89b8-1c8be6fbe2d2/e23a92f2-c404-4f22-8678-b168d3c6ff5f.jpg";

interface HostelData {
  id: number;
  name: string;
  price: number;
  distance: string;
  available: boolean;
  rating: number;
  description: string;
  amenities: string[];
  images: string[];
  location: string;
  rooms: number;
  totalRooms: number;
  custodianName: string;
  custodianEmail: string;
  custodianPassword: string;
}

let HOSTELS: HostelData[] = [
  {
    id: 1,
    name: "Carleton Hostel",
    price: 1000000,
    distance: "0.3 km from UCU",
    available: true,
    rating: 4.5,
    description: "Standard and affordable hostel rooms in Mukono for UCU students.",
    amenities: ["Wi-Fi", "Security", "Water", "Electricity", "Parking"],
    images: ["https://images.unsplash.com/photo-1555854877-bab0e564d8e5?w=800"],
    location: "Mukono, near UCU Main Gate",
    rooms: 4,
    totalRooms: 20,
    custodianName: "Mr. John Odea",
    custodianEmail: "carleton@hostel.com",
    custodianPassword: "carleton123",
  },
  {
    id: 2,
    name: "Premium Hostel",
    price: 1500000,
    distance: "0.8 km from UCU",
    available: true,
    rating: 4.2,
    description: "Affordable standard hostel rooms in Mukono town.",
    amenities: ["Wi-Fi", "Security", "Water", "Study Room", "Kitchen"],
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6a6f3f?w=800"],
    location: "Mukono Town, 5 min walk to UCU",
    rooms: 2,
    totalRooms: 15,
    custodianName: "Mrs. Sarah Akello",
    custodianEmail: "premium@hostel.com",
    custodianPassword: "premium123",
  },
];

export default function CustodianLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const hostel = HOSTELS.find(
      (h) =>
        h.custodianEmail.toLowerCase() === email.toLowerCase() &&
        h.custodianPassword === password
    );

    if (hostel) {
      router.push(`/custodian/${hostel.id}`);
    } else {
      setError("Invalid email or password");
      setLoading(false);
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
          <h1 className="text-white font-bold text-2xl">Custodian Login</h1>
          <p className="text-blue-200 text-sm mt-1">Sign in to manage your hostel</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
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
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400"
                placeholder="carleton@hostel.com"
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

          <div className="mt-4 pt-4 border-t border-slate-100">
            <Link
              href="/"
              className="block text-center text-sm text-slate-500 hover:text-blue-600"
            >
              ← Back to Dashboard Selection
            </Link>
          </div>
        </div>

        <p className="text-center text-blue-400 text-xs mt-6">
          Contact admin to get login credentials
        </p>
      </div>
    </div>
  );
}