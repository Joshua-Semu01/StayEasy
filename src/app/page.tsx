"use client";

import { useState, useRef, useCallback } from "react";
import html2canvas from "html2canvas";

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen = "welcome" | "home" | "listings" | "details" | "payment" | "confirmation";
type Filter = "price" | "distance" | "availability";

interface Hostel {
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
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const HOSTELS: Hostel[] = [
  {
    id: 1,
    name: "Normal Hostel Rooms - Mukono",
    price: 1000000,
    distance: "0.3 km from UCU",
    available: true,
    rating: 4.5,
    description:
      "Standard and affordable hostel rooms in Mukono for UCU students. Clean, secure, and convenient location near the university. Perfect for students looking for comfortable and budget-friendly accommodation.",
    amenities: ["Wi-Fi", "Security", "Water", "Electricity", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    ],
    location: "Mukono, near UCU Main Gate",
    rooms: 4,
    totalRooms: 20,
  },
  {
    id: 2,
    name: "Mukono Standard Hostel",
    price: 1500000,
    distance: "0.8 km from UCU",
    available: true,
    rating: 4.2,
    description:
      "Affordable standard hostel rooms in Mukono town. Great community atmosphere with shared kitchen and study area. Ideal for UCU students on a budget.",
    amenities: ["Wi-Fi", "Security", "Water", "Study Room", "Kitchen"],
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80",
    ],
    location: "Mukono Town, 5 min walk to UCU",
    rooms: 2,
    totalRooms: 15,
  },
  {
    id: 3,
    name: "Mukono Budget Hostel",
    price: 1500000,
    distance: "1.2 km from UCU",
    available: false,
    rating: 4.8,
    description:
      "Quality standard hostel accommodation near Lake Victoria in Mukono. Clean rooms with essential amenities. Popular with UCU students who want comfort at reasonable prices.",
    amenities: ["Wi-Fi", "Security", "En-Suite", "Gym", "Rooftop", "Water"],
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
      "https://images.unsplash.com/photo-1592229506151-845940174bb0?w=800&q=80",
    ],
    location: "Mukono, Lake Victoria Road",
    rooms: 0,
    totalRooms: 12,
  },
  {
    id: 4,
    name: "Highfield Hostel - Mukono",
    price: 1000000,
    distance: "0.6 km from UCU",
    available: true,
    rating: 4.0,
    description:
      "Comfortable standard hostel rooms in a quiet and safe area in Mukono. Easy access to UCU with convenient transportation options. Includes common areas and laundry facilities.",
    amenities: ["Wi-Fi", "Security", "Water", "Laundry", "TV Lounge"],
    images: [
      "https://assets.kiloapps.io/user_e36bb1a3-2840-4d55-a410-fda7687ef308/ddc1b378-fff3-4a8c-89b8-1c8be6fbe2d2/cef92f58-e533-4739-b6fe-10f77ae01004.jpg",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
    ],
    location: "Mukono, Canaan Road",
    rooms: 6,
    totalRooms: 18,
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconSearch = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);
const IconMapPin = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const IconStar = () => (
  <svg className="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const IconWifi = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
  </svg>
);
const IconShield = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
const IconDroplet = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C12 2 5 10 5 14a7 7 0 0014 0c0-4-7-12-7-12z" />
  </svg>
);
const IconPhone = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);
const IconMessage = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);
const IconCheck = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);
const IconArrowLeft = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);
const IconFilter = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
  </svg>
);
const IconBolt = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);
const IconDownload = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);
const IconBuilding = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);
const IconHome2 = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);
const IconMenu = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const IconX = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

function AmenityIcon({ name }: { name: string }) {
  if (name === "Wi-Fi") return <IconWifi />;
  if (name === "Security") return <IconShield />;
  if (name === "Water") return <IconDroplet />;
  if (name === "Electricity") return <IconBolt />;
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

// ─── Shared UI pieces ─────────────────────────────────────────────────────────

function BackButton({ onBack, label = "Back" }: { onBack: () => void; label?: string }) {
  return (
    <button
      onClick={onBack}
      className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
    >
      <IconArrowLeft />
      <span>{label}</span>
    </button>
  );
}

function AvailabilityBadge({ available }: { available: boolean }) {
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
        available ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
      }`}
    >
      {available ? "● Available" : "● Booked"}
    </span>
  );
}

// ─── Responsive Layout Shell ──────────────────────────────────────────────────

const LogoImg = ({ className = "" }: { className?: string }) => (
  <img 
    src="https://assets.kiloapps.io/user_e36bb1a3-2840-4d55-a410-fda7687ef308/ddc1b378-fff3-4a8c-89b8-1c8be6fbe2d2/70381120-090e-4487-9c8a-7b2014a89b58.png" 
    alt="StayEasy Logo" 
    className={className}
  />
);

const NAV_ITEMS: { screen: Screen; label: string; icon: () => React.ReactElement }[] = [
  { screen: "home", label: "Home", icon: IconHome2 },
  { screen: "listings", label: "Browse Hostels", icon: IconBuilding },
];

function Layout({
  children,
  currentScreen,
  onNavigate,
}: {
  children: React.ReactNode;
  currentScreen: Screen;
  onNavigate: (s: Screen) => void;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 min-h-screen shrink-0 sticky top-0">
        {/* Brand */}
        <div className="px-6 py-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex-shrink-0">
              <LogoImg className="w-full h-full" />
            </div>
            <div>
              <h1 className="text-white font-black text-lg tracking-tight">StayEasy</h1>
              <p className="text-slate-400 text-xs">Student Hostels · Mukono</p>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {NAV_ITEMS.map(({ screen, label, icon: Icon }) => (
            <button
              key={screen}
              onClick={() => onNavigate(screen)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                currentScreen === screen
                  ? "bg-orange-500 text-white shadow-lg shadow-indigo-900/40"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon />
              {label}
            </button>
          ))}
        </nav>

        {/* Footer info */}
        <div className="px-6 py-5 border-t border-slate-800">
          <p className="text-slate-500 text-xs">Trusted by 500+ UCU students</p>
          <p className="text-slate-600 text-xs mt-1">© 2026 StayEasy</p>
        </div>
      </aside>

      {/* ── Mobile Top Bar ── */}
      <header className="lg:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex-shrink-0">
            <LogoImg className="w-full h-full" />
          </div>
          <span className="font-black text-base">StayEasy</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1 text-slate-300 hover:text-white transition-colors"
        >
          {mobileMenuOpen ? <IconX /> : <IconMenu />}
        </button>
      </header>

      {/* ── Mobile Dropdown Menu ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-800 border-b border-slate-700 px-4 py-3 space-y-1 z-40">
          {NAV_ITEMS.map(({ screen, label, icon: Icon }) => (
            <button
              key={screen}
              onClick={() => { onNavigate(screen); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                currentScreen === screen
                  ? "bg-orange-500 text-white"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <Icon />
              {label}
            </button>
          ))}
        </div>
      )}

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}

// ─── Screen 0: Welcome ───────────────────────────────────────────────────────────

function WelcomeScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-md">
        <div className="w-28 h-28 mx-auto mb-6">
          <LogoImg className="w-full h-full" />
        </div>
        
        <h1 className="text-white font-black text-4xl mb-2">StayEasy</h1>
        <p className="text-blue-100 text-lg font-semibold mb-2">Student Hostels in Mukono</p>
        
        <p className="text-white/90 text-base mb-4 leading-relaxed">
          StayEasy helps UCU students find and book hostels easily, unlike the manual process of moving around looking for rooms.
        </p>
        
        <div className="bg-orange-500/20 border border-orange-400/50 rounded-xl px-4 py-3 mb-6">
          <p className="text-orange-300 font-bold text-lg">Find Your Perfect Stay, the Easy Way.</p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => onNavigate("home")}
            className="w-full py-4 bg-orange-500 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:bg-orange-600 active:scale-95 transition-all"
          >
            Get Started →
          </button>
          
          <button
            onClick={() => onNavigate("listings")}
            className="w-full py-4 bg-orange-500 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:bg-orange-600 active:scale-95 transition-all"
          >
            Browse Hostels
          </button>
        </div>
        
        <p className="text-orange-200 text-xs mt-8">
          Trusted by 500+ UCU students
        </p>
      </div>
    </div>
  );
}

// ─── Screen 1: Home ───────────────────────────────────────────────────────────

function HomeScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  const [searchValue, setSearchValue] = useState("Search hostels in Mukono");
  const [activeFilter, setActiveFilter] = useState<Filter | null>(null);

  const filters: { key: Filter; label: string }[] = [
    { key: "price", label: "By Price" },
    { key: "distance", label: "Distance" },
    { key: "availability", label: "Available" },
  ];

  return (
    <div className="flex flex-col flex-1">
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 px-6 lg:px-12 pt-10 pb-16 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-white/10 rounded-full pointer-events-none" />
        <div className="absolute -bottom-16 -left-8 w-48 h-48 bg-white/10 rounded-full pointer-events-none" />
        <div className="relative max-w-4xl">
          <h2 className="text-white font-black text-3xl lg:text-5xl leading-tight mb-2">
            Find Your Perfect<br />Student Home
          </h2>
          <p className="text-indigo-200 text-sm lg:text-base mt-2 mb-6">
            Affordable, trusted hostels near Uganda Christian University, Mukono
          </p>
          {/* Search */}
          <div className="relative max-w-xl">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <IconSearch />
            </div>
            <input
              className="w-full bg-white rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-700 placeholder:text-slate-400 outline-none shadow-lg"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-12 -mt-6 relative z-10">
        {/* Filter card */}
        <div className="bg-white rounded-2xl shadow-md p-4 max-w-xl">
          <div className="flex items-center gap-2 mb-3">
            <IconFilter />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Quick Filter</span>
          </div>
          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(activeFilter === f.key ? null : f.key)}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeFilter === f.key
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 lg:px-12 mt-6 grid grid-cols-3 lg:grid-cols-3 gap-3 max-w-sm lg:max-w-md">
        {[
          { label: "Hostels", value: "12+", color: "text-indigo-600" },
          { label: "Available", value: "8", color: "text-emerald-600" },
          { label: "Avg Price", value: "50K", color: "text-amber-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Featured Hostels */}
      <div className="px-6 lg:px-12 mt-8">
        <h3 className="text-base font-bold text-slate-700 mb-4">Featured Hostels</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {HOSTELS.filter((h) => h.available).map((h) => (
            <div
              key={h.id}
              onClick={() => onNavigate("listings")}
              className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div
                className="h-32 bg-cover bg-center"
                style={{ backgroundImage: `url(${h.images[0]})` }}
              />
              <div className="p-3">
                <p className="text-sm font-bold text-slate-800 truncate">{h.name}</p>
                <p className="text-sm text-indigo-600 font-semibold mt-0.5">
                  UGX {h.price.toLocaleString()}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{h.distance}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 lg:px-12 mt-8 pb-12">
        <button
          onClick={() => onNavigate("listings")}
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 px-10 rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all text-base"
        >
          Find Your Room →
        </button>
        <p className="text-xs text-slate-400 mt-3">
          Don&apos;t miss out - book your hostel today!
        </p>
      </div>

      {/* Footer */}
      <div className="relative mt-8">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80")' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90" />
        <div className="relative px-6 lg:px-12 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-white font-black text-2xl mb-2">StayEasy</h3>
              <p className="text-slate-300 text-sm">Your trusted partner for hostel booking in Mukono</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <p className="text-white font-semibold text-sm">Phone</p>
                <p className="text-slate-300 text-sm">0789781923</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-white font-semibold text-sm">Email</p>
                <p className="text-slate-300 text-sm">stayeasy@gmail.com</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-white font-semibold text-sm">Location</p>
                <p className="text-slate-300 text-sm">Mukono, Uganda</p>
              </div>
            </div>
            
            <div className="border-t border-slate-700 pt-6">
              <p className="text-center text-slate-400 text-sm mb-4">Follow us on social media</p>
              <div className="flex justify-center gap-4">
                <a href="#" className="w-10 h-10 bg-slate-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <p className="text-center text-slate-500 text-xs mt-8">
              © 2026 StayEasy. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 2: Listings ───────────────────────────────────────────────────────

function ListingsScreen({
  onNavigate,
  onSelectHostel,
  studentName,
  setStudentName,
}: {
  onNavigate: (screen: Screen) => void;
  onSelectHostel: (hostel: Hostel) => void;
  studentName: string;
  setStudentName: (name: string) => void;
}) {
  const [activeFilter, setActiveFilter] = useState<Filter | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const handleViewDetails = (hostel: Hostel) => {
    if (!studentName || !studentName.trim()) {
      alert("Please enter your name in the field above first, then click View Details");
      return;
    }
    onSelectHostel(hostel);
    onNavigate("details");
  }

  const sortedHostels = [...HOSTELS]
    .sort((a, b) => {
      if (activeFilter === "price") return a.price - b.price;
      if (activeFilter === "distance") return parseFloat(a.distance) - parseFloat(b.distance);
      if (activeFilter === "availability") return b.available ? 1 : -1;
      return 0;
    })
    .filter(
      (h) =>
        h.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        h.location.toLowerCase().includes(searchValue.toLowerCase())
    );

  return (
    <div className="flex flex-col flex-1">
      {/* Header bar */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 px-6 lg:px-12 pt-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <BackButton onBack={() => onNavigate("home")} />
          <span className="text-white text-xs font-medium opacity-80">
            {HOSTELS.length} hostels found
          </span>
        </div>
        <h2 className="text-white font-bold text-2xl lg:text-3xl mb-4">Hostels in Mukono</h2>
        
        {/* Student Name Input */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-orange-200 uppercase tracking-wide block mb-1">
            Enter Your Name
          </label>
          <input
            type="text"
            className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/60 outline-none focus:bg-white/30 focus:border-white"
            placeholder="Enter your full name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
          {/* Search */}
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <IconSearch />
            </div>
            <input
              className="w-full bg-white rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none"
              placeholder="Filter by name or location..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          {/* Filter pills */}
          <div className="flex gap-2 shrink-0">
            {(["price", "distance", "availability"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(activeFilter === f ? null : f)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                  activeFilter === f
                    ? "bg-white text-indigo-700"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="px-6 lg:px-12 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {sortedHostels.map((hostel) => (
            <div
              key={hostel.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              {/* Image */}
              <div
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${hostel.images[0]})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-3 right-3">
                  <AvailabilityBadge available={hostel.available} />
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1">
                  <IconStar />
                  <span className="text-white text-xs font-bold">{hostel.rating}</span>
                </div>
              </div>
              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">{hostel.name}</h3>
                    <div className="flex items-center gap-1 mt-1 text-slate-500">
                      <IconMapPin />
                      <span className="text-xs">{hostel.distance}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-indigo-600 font-black text-base">
                      UGX {hostel.price.toLocaleString()}
                    </p>
                    <p className="text-slate-400 text-xs">/semester</p>
                  </div>
                </div>
                {/* Amenities */}
                <div className="flex gap-3 mt-3 text-slate-500">
                  {hostel.amenities.slice(0, 4).map((a) => (
                    <div key={a} title={a}>
                      <AmenityIcon name={a} />
                    </div>
                  ))}
                  {hostel.amenities.length > 4 && (
                    <span className="text-xs text-slate-400">+{hostel.amenities.length - 4}</span>
                  )}
                </div>
                <button
                  onClick={() => handleViewDetails(hostel)}
                  disabled={!hostel.available}
                  className={`w-full mt-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    hostel.available
                      ? "bg-orange-500 text-white hover:bg-orange-600 active:scale-95"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {hostel.available ? "View Details →" : "Fully Booked"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Screen 3: Details ────────────────────────────────────────────────────────

function DetailsScreen({
  hostel,
  onNavigate,
  studentName,
  setStudentName,
}: {
  hostel: Hostel;
  onNavigate: (screen: Screen) => void;
  studentName: string;
  setStudentName: (name: string) => void;
}) {
  const [activeImg, setActiveImg] = useState(0);

  const handleBookNow = () => {
    onNavigate("payment");
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Breadcrumb / Back */}
      <div className="px-6 lg:px-12 pt-5 pb-3 border-b border-slate-100 bg-white flex items-center justify-between">
        <BackButton onBack={() => onNavigate("listings")} label="Back to Listings" />
        <AvailabilityBadge available={hostel.available} />
      </div>

      {/* Two-column on desktop */}
      <div className="flex-1 flex flex-col lg:flex-row gap-0">
        {/* Left: image carousel */}
        <div className="lg:w-1/2 lg:sticky lg:top-0 lg:self-start">
          <div className="relative overflow-hidden" style={{ minHeight: "300px" }}>
            <div
              className="w-full h-72 lg:h-96 bg-cover bg-center transition-all duration-300"
              style={{ backgroundImage: `url(${hostel.images[activeImg]})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {hostel.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === activeImg ? "bg-white w-6" : "bg-white/50 w-2"
                  }`}
                />
              ))}
            </div>
          </div>
          {/* Thumbnail strip */}
          <div className="flex gap-2 px-4 py-3 bg-slate-800">
            {hostel.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-16 h-12 rounded-lg bg-cover bg-center border-2 transition-all ${
                  i === activeImg ? "border-indigo-400" : "border-transparent opacity-60 hover:opacity-100"
                }`}
                style={{ backgroundImage: `url(${img})` }}
              />
            ))}
          </div>
        </div>

        {/* Right: details */}
        <div className="lg:w-1/2 px-6 lg:px-10 py-6 overflow-y-auto">
          {/* Title */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <h2 className="text-2xl font-black text-slate-800">{hostel.name}</h2>
              <div className="flex items-center gap-1.5 mt-1.5 text-slate-500">
                <IconMapPin />
                <span className="text-sm">{hostel.location}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-indigo-600 font-black text-2xl">
                UGX {hostel.price.toLocaleString()}
              </p>
              <p className="text-slate-400 text-xs">/semester</p>
            </div>
          </div>

          {/* Rating & Distance pills */}
          <div className="flex gap-2 flex-wrap mb-4">
            <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full">
              <IconStar />
              <span className="text-xs font-bold text-amber-700">{hostel.rating} Rating</span>
            </div>
            <div className="flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-full">
              <IconMapPin />
              <span className="text-xs font-bold text-indigo-600">{hostel.distance}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-5">
            <h3 className="text-sm font-bold text-slate-700 mb-2">About this Hostel</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{hostel.description}</p>
          </div>

          {/* Amenities */}
          <div className="mb-5">
            <h3 className="text-sm font-bold text-slate-700 mb-3">Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {hostel.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2.5"
                >
                  <div className="text-indigo-500">
                    <AmenityIcon name={amenity} />
                  </div>
                  <span className="text-xs font-medium text-slate-600">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Room grid */}
          <div className="mb-6 bg-indigo-50 rounded-2xl p-4">
            <h3 className="text-sm font-bold text-indigo-800 mb-3">Room Availability</h3>
            <div className="flex gap-1 flex-wrap">
              {Array.from({ length: hostel.totalRooms }).map((_, i) => (
                <div
                  key={i}
                  title={i < hostel.rooms ? "Available" : "Occupied"}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                    i < hostel.rooms ? "bg-emerald-500 text-white" : "bg-red-400 text-white"
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <p className="text-xs text-indigo-600 mt-2">
              {hostel.rooms} of {hostel.totalRooms} rooms available
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={handleBookNow}
            disabled={!hostel.available}
            className={`w-full py-4 rounded-2xl text-base font-black shadow-lg transition-all ${
              hostel.available
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-xl active:scale-95"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            {hostel.available ? "Book Now →" : "Fully Booked"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 4: Payment ────────────────────────────────────────────────────────

function PaymentScreen({
  hostel,
  onNavigate,
  studentName,
}: {
  hostel: Hostel;
  onNavigate: (screen: Screen) => void;
  studentName: string;
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState(studentName);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    if (phone.length < 10 || name.trim().length < 2) return;
    setStep(2);
    setTimeout(() => setStep(3), 2000);
  };

  return (
    <div className="flex flex-col flex-1 bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 px-6 lg:px-12 pt-6 pb-7">
        <BackButton onBack={() => onNavigate("details")} />
        <h2 className="text-white font-bold text-2xl lg:text-3xl mt-3">Complete Booking</h2>
        <p className="text-indigo-200 text-sm mt-1">Secure payment via Mobile Money</p>
      </div>

      {/* Centered content */}
      <div className="flex-1 px-6 lg:px-12 py-6">
        <div className="max-w-3xl mx-auto space-y-5">
          {/* Two-column on large screens: summary + USSD */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Booking Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-indigo-50 px-4 py-3 border-b border-indigo-100">
                <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wide">Booking Summary</h3>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { label: "Hostel", value: hostel.name, bold: true },
                  { label: "Location", value: hostel.location },
                  { label: "Duration", value: "1 semester" },
                ].map(({ label, value, bold }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-sm text-slate-500">{label}</span>
                    <span className={`text-sm text-right ${bold ? "font-bold text-slate-800" : "text-slate-700"}`}>{value}</span>
                  </div>
                ))}
                <div className="h-px bg-slate-100" />
                <div className="flex justify-between">
                  <span className="text-sm font-bold text-slate-700">Total Amount</span>
                  <span className="text-base font-black text-indigo-600">
                    UGX {hostel.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* USSD */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-emerald-50 px-4 py-3 border-b border-emerald-100 flex items-center gap-2">
                <IconPhone />
                <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                  USSD Mobile Money Payment
                </h3>
              </div>
              <div className="p-4">
                <div className="bg-slate-900 rounded-xl p-4 font-mono mb-3">
                  <p className="text-slate-400 text-xs mb-1">Dial on your phone:</p>
                  <p className="text-2xl font-bold text-white">*165#</p>
                  <p className="text-xs text-slate-400 mt-0.5">MTN Mobile Money</p>
                </div>
                <ol className="space-y-2">
                  {[
                    "Dial *165# on your MTN line",
                    'Select "4" → Pay Bill / Send Money',
                    'Enter Business No: "StayEasy" or 123456',
                    `Enter Amount: ${hostel.price.toLocaleString()}`,
                    "Enter your Mobile Money PIN",
                    "Confirm payment and wait for SMS",
                  ].map((s, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-600">
                      <span className="flex-shrink-0 w-5 h-5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* SMS preview + phone input side-by-side on lg */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* SMS */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-blue-50 px-4 py-3 border-b border-blue-100 flex items-center gap-2">
                <IconMessage />
                <h3 className="text-xs font-bold text-blue-700 uppercase tracking-wide">SMS Confirmation</h3>
              </div>
              <div className="p-4">
                <div className="bg-slate-800 rounded-xl p-4 mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">S</span>
                    </div>
                    <div>
                      <p className="text-white text-xs font-bold">StayEasy</p>
                      <p className="text-slate-400 text-xs">SMS Notification</p>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    &quot;Your StayEasy booking is confirmed. Hostel: {hostel.name}. Amount: UGX {hostel.price.toLocaleString()}. Ref: SE{hostel.id}2026. Thank you!&quot;
                  </p>
                </div>
                <p className="text-xs text-slate-500 text-center">
                  You will receive this SMS after successful payment
                </p>
              </div>
            </div>

            {/* Phone input */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex flex-col justify-between">
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block mb-2">
                  Student Name
                </label>
                <input
                  type="text"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block mb-2 mt-4">
                  Your Mobile Money Number
                </label>
                <input
                  type="tel"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
                  placeholder="e.g. 0771234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <div className="flex items-center gap-2 mt-3">
                  <input
                    id="sms-confirm"
                    type="checkbox"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="sms-confirm" className="text-xs text-slate-500">
                    Send SMS confirmation to this number
                  </label>
                </div>
              </div>

              <div className="mt-5">
                {step === 1 && (
                  <button
                    onClick={handleConfirm}
                    disabled={phone.length < 10 || name.trim().length < 2}
                    className={`w-full py-4 rounded-2xl text-base font-black shadow-lg transition-all ${
                      phone.length >= 10 && name.trim().length >= 2
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-xl active:scale-95"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    Confirm Payment →
                  </button>
                )}
                {step === 2 && (
                  <div className="w-full py-4 rounded-2xl bg-amber-100 text-amber-700 font-bold text-center text-sm flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Verifying payment...
                  </div>
                )}
                {step === 3 && (
                  <button
                    onClick={() => onNavigate("confirmation")}
                    className="w-full py-4 rounded-2xl text-base font-black bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl active:scale-95 transition-all"
                  >
                    Payment Verified ✓ — Continue →
                  </button>
                )}
                <p className="text-center text-xs text-slate-400 mt-2">
                  Dial *165# → Pay Bill → Enter amount → Confirm
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Receipt Template (off-screen, captured by html2canvas) ──────────────────

function ReceiptTemplate({
  innerRef,
  hostel,
  bookingRef,
  bookingDate,
}: {
  innerRef: React.Ref<HTMLDivElement>;
  hostel: Hostel;
  bookingRef: string;
  bookingDate: string;
}) {
  return (
    <div
      ref={innerRef}
      style={{
        position: "fixed",
        top: "-9999px",
        left: "-9999px",
        width: "360px",
        backgroundColor: "#ffffff",
        fontFamily: "system-ui, -apple-system, sans-serif",
        overflow: "hidden",
      }}
    >
      <div style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)", padding: "28px 24px 20px", color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <div style={{ width: 36, height: 36, backgroundColor: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#4f46e5", fontWeight: 900, fontSize: 18 }}>S</span>
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18 }}>StayEasy</div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>Student Hostel Booking · Mukono</div>
          </div>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, opacity: 0.9 }}>OFFICIAL BOOKING RECEIPT</div>
      </div>

      <div style={{ backgroundColor: "#f0fdf4", borderBottom: "2px dashed #86efac", borderTop: "2px dashed #86efac", padding: "12px 24px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 36, height: 36, backgroundColor: "#10b981", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ color: "#fff", fontWeight: 900, fontSize: 18 }}>✓</span>
        </div>
        <div>
          <div style={{ fontWeight: 800, color: "#065f46", fontSize: 14 }}>Payment Confirmed</div>
          <div style={{ color: "#059669", fontSize: 12 }}>Booking Ref: #{bookingRef}</div>
        </div>
      </div>

      <div style={{ padding: "20px 24px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Booking Details</div>
        {[
          { label: "Hostel Name", value: hostel.name },
          { label: "Location", value: hostel.location },
          { label: "Duration", value: "1 Month" },
          { label: "Check-in Date", value: bookingDate },
          { label: "Payment Method", value: "MTN Mobile Money (*165#)" },
        ].map(({ label, value }) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f1f5f9" }}>
            <span style={{ color: "#64748b", fontSize: 12 }}>{label}</span>
            <span style={{ color: "#1e293b", fontSize: 12, fontWeight: 600, textAlign: "right", maxWidth: 180 }}>{value}</span>
          </div>
        ))}
      </div>

      <div style={{ margin: "0 24px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#475569", fontSize: 13, fontWeight: 600 }}>Total Amount Paid</span>
        <span style={{ color: "#4f46e5", fontSize: 22, fontWeight: 900 }}>UGX {hostel.price.toLocaleString()}</span>
      </div>

      <div style={{ padding: "16px 24px" }}>
        <div style={{ backgroundColor: "#d1fae5", border: "1px solid #6ee7b7", borderRadius: 8, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#065f46", fontSize: 12, fontWeight: 600 }}>Payment Status</span>
          <span style={{ backgroundColor: "#10b981", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 100 }}>✓ PAID</span>
        </div>
      </div>

      <div style={{ borderTop: "2px dashed #e2e8f0", margin: "4px 24px 16px" }} />
      <div style={{ padding: "0 24px 16px", fontSize: 11, color: "#94a3b8", lineHeight: 1.6 }}>
        This receipt serves as proof of booking for <strong style={{ color: "#475569" }}>{hostel.name}</strong> via StayEasy. Present this receipt to the hostel management upon arrival.
      </div>

      <div style={{ backgroundColor: "#1e293b", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#94a3b8", fontSize: 10 }}>stayeasy.app · Mukono, Uganda</span>
        <span style={{ color: "#94a3b8", fontSize: 10 }}>Ref: #{bookingRef}</span>
      </div>
    </div>
  );
}

// ─── Screen 5: Confirmation ───────────────────────────────────────────────────

function ConfirmationScreen({
  hostel,
  onNavigate,
}: {
  hostel: Hostel;
  onNavigate: (screen: Screen) => void;
}) {
  const [bookingRef] = useState(() => `SE${hostel.id}${Math.floor(Math.random() * 900000 + 100000)}`);
  const [bookingDate] = useState(() =>
    new Date().toLocaleDateString("en-UG", { year: "numeric", month: "long", day: "numeric" })
  );
  const [downloading, setDownloading] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    if (!receiptRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `StayEasy-Receipt-${bookingRef}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setDownloading(false);
    }
  }, [bookingRef]);

  return (
    <div className="flex flex-col flex-1 bg-gradient-to-b from-white to-emerald-50">
      {/* Hidden receipt */}
      <ReceiptTemplate
        innerRef={receiptRef}
        hostel={hostel}
        bookingRef={bookingRef}
        bookingDate={bookingDate}
      />

      <div className="flex-1 flex flex-col items-center justify-center px-6 lg:px-12 py-12">
        <div className="w-full max-w-2xl">
          {/* Success badge */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-200">
                <div className="text-white"><IconCheck /></div>
              </div>
              <div className="absolute inset-0 rounded-full bg-emerald-400 opacity-20 scale-125 animate-ping" />
            </div>
            <h2 className="text-3xl font-black text-slate-800 mt-5 text-center">Booking Successful!</h2>
            <p className="text-emerald-600 font-semibold text-sm mt-1 text-center">
              Welcome to {hostel.name}
            </p>
          </div>

          {/* Two-col on lg: details + SMS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            {/* Booking details card */}
            <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
              <div className="bg-emerald-500 px-4 py-3">
                <p className="text-white font-bold text-sm">Booking Confirmation</p>
                <p className="text-emerald-100 text-xs">Ref: #{bookingRef}</p>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { label: "Hostel", value: hostel.name, bold: true },
                  { label: "Location", value: hostel.location },
                  { label: "Date", value: bookingDate },
                  { label: "Amount Paid", value: `UGX ${hostel.price.toLocaleString()}`, green: true },
                  { label: "Duration", value: "1 Month" },
                ].map(({ label, value, bold, green }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">{label}</span>
                    <span className={`text-sm text-right ${bold ? "font-bold text-slate-800" : green ? "font-black text-emerald-600" : "text-slate-700"}`}>
                      {value}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-1">
                  <span className="text-sm text-slate-500">Payment Status</span>
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                    ✓ Paid
                  </span>
                </div>
              </div>
            </div>

            {/* SMS preview */}
            <div className="flex flex-col gap-4">
              <div className="bg-slate-800 rounded-2xl p-5 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <IconMessage />
                  <p className="text-slate-300 text-xs font-bold">SMS Sent to Your Phone</p>
                </div>
                <p className="text-emerald-400 text-sm font-mono leading-relaxed">
                  &quot;Your StayEasy booking is confirmed. Hostel: {hostel.name}. Ref: #{bookingRef}. Welcome!&quot;
                </p>
              </div>

              {/* Download + Go Home */}
              <button
                onClick={handleDownload}
                disabled={downloading}
                className={`w-full py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all border-2 ${
                  downloading
                    ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-white border-emerald-500 text-emerald-600 hover:bg-emerald-50 active:scale-95 shadow-sm"
                }`}
              >
                {downloading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Generating Receipt...
                  </>
                ) : (
                  <>
                    <IconDownload />
                    Download Receipt (PNG)
                  </>
                )}
              </button>

              <button
                onClick={() => onNavigate("home")}
                className="w-full py-4 rounded-2xl text-base font-black bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl active:scale-95 transition-all"
              >
                Go Home
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-400 text-center">
            Save your receipt as proof of booking. Present it to hostel management on arrival.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [selectedHostel, setSelectedHostel] = useState<Hostel>(HOSTELS[0]);
  const [studentName, setStudentName] = useState("");

  const navigate = (s: Screen) => setScreen(s);

  const screenContent = (() => {
    switch (screen) {
      case "welcome":
        return <WelcomeScreen onNavigate={navigate} />;
      case "home":
        return <HomeScreen onNavigate={navigate} />;
      case "listings":
        return <ListingsScreen onNavigate={navigate} onSelectHostel={setSelectedHostel} studentName={studentName} setStudentName={setStudentName} />;
      case "details":
        return <DetailsScreen hostel={selectedHostel} onNavigate={navigate} studentName={studentName} setStudentName={setStudentName} />;
      case "payment":
        return <PaymentScreen hostel={selectedHostel} onNavigate={navigate} studentName={studentName} />;
      case "confirmation":
        return <ConfirmationScreen hostel={selectedHostel} onNavigate={navigate} />;
    }
  })();

  if (screen === "welcome") {
    return <WelcomeScreen onNavigate={navigate} />;
  }

  return (
    <Layout currentScreen={screen} onNavigate={navigate}>
      {screenContent}
    </Layout>
  );
}
