"use client";

import { useState, useRef, useCallback } from "react";
import html2canvas from "html2canvas";

// ─── Types ──────────────────────────────────────────────────────────────────

type Screen = "home" | "listings" | "details" | "payment" | "confirmation";
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

// ─── Data ────────────────────────────────────────────────────────────────────

const HOSTELS: Hostel[] = [
  {
    id: 1,
    name: "UCU Gateway Hostel",
    price: 50000,
    distance: "0.3 km from UCU",
    available: true,
    rating: 4.5,
    description:
      "A modern, secure hostel right next to Uganda Christian University. Fully furnished rooms with 24/7 security, reliable Wi-Fi, and clean shared bathrooms. Popular with first-year students.",
    amenities: ["Wi-Fi", "Security", "Water", "Electricity", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    ],
    location: "Mukono, near UCU Main Gate",
    rooms: 4,
    totalRooms: 20,
  },
  {
    id: 2,
    name: "Mukono Student Hub",
    price: 35000,
    distance: "0.8 km from UCU",
    available: true,
    rating: 4.2,
    description:
      "Budget-friendly rooms with essential amenities. Great community atmosphere with a shared kitchen, lounge area, and study room. Ideal for students on a tight budget.",
    amenities: ["Wi-Fi", "Security", "Water", "Study Room", "Kitchen"],
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=600&q=80",
    ],
    location: "Mukono Town, 5 min walk to UCU",
    rooms: 2,
    totalRooms: 15,
  },
  {
    id: 3,
    name: "Lakeview Residence",
    price: 75000,
    distance: "1.2 km from UCU",
    available: false,
    rating: 4.8,
    description:
      "Premium student accommodation with lake views. En-suite rooms, high-speed internet, gym access, and a rooftop terrace. Perfect for students who want comfort and style.",
    amenities: ["Wi-Fi", "Security", "En-Suite", "Gym", "Rooftop", "Water"],
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80",
      "https://images.unsplash.com/photo-1592229506151-845940174bb0?w=600&q=80",
    ],
    location: "Mukono, Lake Victoria Road",
    rooms: 0,
    totalRooms: 12,
  },
  {
    id: 4,
    name: "Canaan Heights",
    price: 45000,
    distance: "0.6 km from UCU",
    available: true,
    rating: 4.0,
    description:
      "Comfortable shared and private rooms in a quiet, safe environment. Close to UCU with easy boda-boda access. Includes a common TV lounge and laundry facilities.",
    amenities: ["Wi-Fi", "Security", "Water", "Laundry", "TV Lounge"],
    images: [
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80",
    ],
    location: "Mukono, Canaan Road",
    rooms: 6,
    totalRooms: 18,
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconHome = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);
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

// ─── Amenity Icon Map ─────────────────────────────────────────────────────────

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

// ─── Shared Components ────────────────────────────────────────────────────────

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-[3rem] shadow-2xl overflow-hidden"
        style={{ width: "390px", minHeight: "844px", maxWidth: "100vw" }}
      >
        {/* Status bar */}
        <div className="bg-slate-900 text-white text-xs flex justify-between items-center px-8 py-2">
          <span className="font-semibold">9:41</span>
          <div className="flex gap-1 items-center">
            <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24"><path d="M1.333 7.802C4.72 4.413 9.11 2.5 13.667 2.5s8.946 1.913 12.333 5.302L24.333 9.47A14.96 14.96 0 0013.667 5C8.612 5 4.054 7.036.667 10.47L-.667 9.136l2-1.334z"/></svg>
            <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 18a8 8 0 110-16 8 8 0 010 16z"/></svg>
            <div className="flex items-center gap-0.5">
              <div className="w-1 h-2 bg-white rounded-sm opacity-40"></div>
              <div className="w-1 h-3 bg-white rounded-sm opacity-60"></div>
              <div className="w-1 h-4 bg-white rounded-sm opacity-80"></div>
              <div className="w-1 h-5 bg-white rounded-sm"></div>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="flex flex-col" style={{ minHeight: "800px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function BackButton({ onBack, label = "Back" }: { onBack: () => void; label?: string }) {
  return (
    <button
      onClick={onBack}
      className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
    >
      <IconArrowLeft />
      <span>{label}</span>
    </button>
  );
}

function AvailabilityBadge({ available }: { available: boolean }) {
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
        available
          ? "bg-emerald-100 text-emerald-700"
          : "bg-red-100 text-red-600"
      }`}
    >
      {available ? "● Available" : "● Booked"}
    </span>
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
    <PhoneFrame>
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 px-6 pt-6 pb-10 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full" />
        <div className="absolute -bottom-12 -left-6 w-32 h-32 bg-white/10 rounded-full" />

        {/* Logo */}
        <div className="flex items-center gap-2 mb-6 relative">
          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-indigo-700 font-black text-lg">S</span>
          </div>
          <div>
            <h1 className="text-white font-black text-xl tracking-tight">StayEasy</h1>
            <p className="text-indigo-200 text-xs">Student Hostels · Mukono</p>
          </div>
        </div>

        {/* Greeting */}
        <div className="relative mb-5">
          <h2 className="text-white font-bold text-2xl leading-tight">
            Find Your Perfect<br />Student Home
          </h2>
          <p className="text-indigo-200 text-sm mt-1">Affordable hostels near UCU Mukono</p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <IconSearch />
          </div>
          <input
            className="w-full bg-white rounded-2xl py-3 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 outline-none shadow-lg"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 -mt-5 relative z-10">
        <div className="bg-white rounded-2xl shadow-md p-4">
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
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="px-6 mt-4 grid grid-cols-3 gap-3">
        {[
          { label: "Hostels", value: "12+", color: "text-indigo-600" },
          { label: "Available", value: "8", color: "text-emerald-600" },
          { label: "Avg Price", value: "50K", color: "text-amber-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-3 shadow-sm text-center">
            <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Featured Preview */}
      <div className="px-6 mt-4">
        <h3 className="text-sm font-bold text-slate-700 mb-3">Featured Hostels</h3>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {HOSTELS.filter((h) => h.available).slice(0, 2).map((h) => (
            <div
              key={h.id}
              className="flex-shrink-0 w-44 bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            >
              <div
                className="h-24 bg-cover bg-center"
                style={{ backgroundImage: `url(${h.images[0]})` }}
              />
              <div className="p-3">
                <p className="text-xs font-bold text-slate-800 truncate">{h.name}</p>
                <p className="text-xs text-indigo-600 font-semibold mt-0.5">
                  UGX {h.price.toLocaleString()}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{h.distance}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="px-6 mt-auto pt-4 pb-8">
        <button
          onClick={() => onNavigate("listings")}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all text-base"
        >
          View All Hostels →
        </button>
        <p className="text-center text-xs text-slate-400 mt-3">
          Trusted by 500+ UCU students
        </p>
      </div>
    </PhoneFrame>
  );
}

// ─── Screen 2: Listings ───────────────────────────────────────────────────────

function ListingsScreen({
  onNavigate,
  onSelectHostel,
}: {
  onNavigate: (screen: Screen) => void;
  onSelectHostel: (hostel: Hostel) => void;
}) {
  const [activeFilter, setActiveFilter] = useState<Filter | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const sortedHostels = [...HOSTELS].sort((a, b) => {
    if (activeFilter === "price") return a.price - b.price;
    if (activeFilter === "distance") return parseFloat(a.distance) - parseFloat(b.distance);
    if (activeFilter === "availability") return b.available ? 1 : -1;
    return 0;
  }).filter((h) =>
    h.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    h.location.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <PhoneFrame>
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 px-6 pt-4 pb-5">
        <div className="flex items-center justify-between mb-4">
          <BackButton onBack={() => onNavigate("home")} />
          <span className="text-white text-xs font-medium opacity-80">
            {HOSTELS.length} hostels found
          </span>
        </div>
        <h2 className="text-white font-bold text-xl mb-3">Hostels in Mukono</h2>
        {/* Search */}
        <div className="relative">
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
      </div>

      {/* Filter Pills */}
      <div className="px-6 py-3 flex gap-2 bg-slate-50 border-b border-slate-100">
        {(["price", "distance", "availability"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(activeFilter === f ? null : f)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
              activeFilter === f
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Hostel Cards */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {sortedHostels.map((hostel) => (
          <div
            key={hostel.id}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
          >
            {/* Image */}
            <div
              className="h-36 bg-cover bg-center relative"
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
                  <p className="text-slate-400 text-xs">/month</p>
                </div>
              </div>

              {/* Amenity Icons */}
              <div className="flex gap-3 mt-3 text-slate-400">
                {hostel.amenities.slice(0, 4).map((a) => (
                  <div key={a} title={a} className="text-slate-500">
                    <AmenityIcon name={a} />
                  </div>
                ))}
                {hostel.amenities.length > 4 && (
                  <span className="text-xs text-slate-400">+{hostel.amenities.length - 4}</span>
                )}
              </div>

              {/* Button */}
              <button
                onClick={() => {
                  onSelectHostel(hostel);
                  onNavigate("details");
                }}
                className={`w-full mt-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  hostel.available
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
                disabled={!hostel.available}
              >
                {hostel.available ? "View Details →" : "Fully Booked"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </PhoneFrame>
  );
}

// ─── Screen 3: Details ────────────────────────────────────────────────────────

function DetailsScreen({
  hostel,
  onNavigate,
}: {
  hostel: Hostel;
  onNavigate: (screen: Screen) => void;
}) {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <PhoneFrame>
      {/* Image Carousel */}
      <div className="relative h-56 bg-slate-200 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-300"
          style={{ backgroundImage: `url(${hostel.images[activeImg]})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Back button */}
        <div className="absolute top-4 left-4">
          <button
            onClick={() => onNavigate("listings")}
            className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-slate-700 shadow"
          >
            <IconArrowLeft />
            <span>Back</span>
          </button>
        </div>

        {/* Image dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {hostel.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === activeImg ? "bg-white w-4" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Badge */}
        <div className="absolute top-4 right-4">
          <AvailabilityBadge available={hostel.available} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-6 pt-5 pb-4">
          {/* Title row */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="text-xl font-black text-slate-800">{hostel.name}</h2>
              <div className="flex items-center gap-1 mt-1 text-slate-500">
                <IconMapPin />
                <span className="text-sm">{hostel.location}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-indigo-600 font-black text-xl">
                UGX {hostel.price.toLocaleString()}
              </p>
              <p className="text-slate-400 text-xs">/month</p>
            </div>
          </div>

          {/* Rating & Distance */}
          <div className="flex gap-3 mt-3">
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
          <div className="mt-4">
            <h3 className="text-sm font-bold text-slate-700 mb-2">About this Hostel</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{hostel.description}</p>
          </div>

          {/* Amenities */}
          <div className="mt-4">
            <h3 className="text-sm font-bold text-slate-700 mb-3">Amenities</h3>
            <div className="grid grid-cols-2 gap-2">
              {hostel.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2"
                >
                  <div className="text-indigo-500">
                    <AmenityIcon name={amenity} />
                  </div>
                  <span className="text-xs font-medium text-slate-600">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Room Availability */}
          <div className="mt-4 bg-indigo-50 rounded-2xl p-4">
            <h3 className="text-sm font-bold text-indigo-800 mb-2">Room Availability</h3>
            <div className="flex gap-1 flex-wrap">
              {Array.from({ length: hostel.totalRooms }).map((_, i) => (
                <div
                  key={i}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                    i < hostel.rooms
                      ? "bg-emerald-500 text-white"
                      : "bg-red-400 text-white"
                  }`}
                  title={i < hostel.rooms ? "Available" : "Occupied"}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <p className="text-xs text-indigo-600 mt-2">
              {hostel.rooms} of {hostel.totalRooms} rooms available
            </p>
          </div>
        </div>
      </div>

      {/* Book Now Button */}
      <div className="px-6 py-4 bg-white border-t border-slate-100">
        <button
          onClick={() => onNavigate("payment")}
          disabled={!hostel.available}
          className={`w-full py-4 rounded-2xl text-base font-black shadow-lg transition-all ${
            hostel.available
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-xl active:scale-95"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          {hostel.available ? "Book Now →" : "Fully Booked"}
        </button>
      </div>
    </PhoneFrame>
  );
}

// ─── Screen 4: Payment ────────────────────────────────────────────────────────

function PaymentScreen({
  hostel,
  onNavigate,
}: {
  hostel: Hostel;
  onNavigate: (screen: Screen) => void;
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    if (phone.length < 10) return;
    setStep(2);
    setTimeout(() => {
      setStep(3);
    }, 2000);
  };

  const handleComplete = () => {
    onNavigate("confirmation");
  };

  return (
    <PhoneFrame>
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 px-6 pt-4 pb-6">
        <BackButton onBack={() => onNavigate("details")} />
        <h2 className="text-white font-bold text-xl mt-3">Complete Booking</h2>
        <p className="text-indigo-200 text-sm">Secure payment via Mobile Money</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {/* Booking Summary Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-indigo-50 px-4 py-3 border-b border-indigo-100">
            <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wide">Booking Summary</h3>
          </div>
          <div className="p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Hostel</span>
              <span className="text-sm font-bold text-slate-800">{hostel.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Location</span>
              <span className="text-sm text-slate-700">{hostel.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Duration</span>
              <span className="text-sm text-slate-700">1 month</span>
            </div>
            <div className="h-px bg-slate-100 my-1" />
            <div className="flex justify-between">
              <span className="text-sm font-bold text-slate-700">Total Amount</span>
              <span className="text-base font-black text-indigo-600">
                UGX {hostel.price.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* USSD Payment Instructions */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-emerald-50 px-4 py-3 border-b border-emerald-100 flex items-center gap-2">
            <IconPhone />
            <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
              USSD Mobile Money Payment
            </h3>
          </div>
          <div className="p-4">
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-emerald-400 mb-3">
              <p className="text-slate-400 text-xs mb-2">Dial on your phone:</p>
              <p className="text-2xl font-bold text-white mb-1">*165#</p>
              <p className="text-xs text-slate-400">MTN Mobile Money</p>
            </div>
            <ol className="space-y-2">
              {[
                "Dial *165# on your MTN line",
                'Select "4" → Pay Bill / Send Money',
                'Enter Business No: "StayEasy" or 123456',
                `Enter Amount: ${hostel.price.toLocaleString()}`,
                "Enter your Mobile Money PIN",
                "Confirm payment and wait for SMS",
              ].map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600">
                  <span className="flex-shrink-0 w-5 h-5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* SMS Confirmation */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-blue-50 px-4 py-3 border-b border-blue-100 flex items-center gap-2">
            <IconMessage />
            <h3 className="text-xs font-bold text-blue-700 uppercase tracking-wide">
              SMS Confirmation
            </h3>
          </div>
          <div className="p-4">
            <div className="bg-slate-800 rounded-xl p-4 mb-4">
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
                &quot;Your StayEasy booking is confirmed. Hostel: {hostel.name}. Amount: UGX {hostel.price.toLocaleString()}. Ref: SE{hostel.id}2024. Thank you!&quot;
              </p>
            </div>
            <p className="text-xs text-slate-500 text-center">
              You will receive this SMS after successful payment
            </p>
          </div>
        </div>

        {/* Phone Input */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block mb-2">
            Your Mobile Money Number
          </label>
          <input
            type="tel"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
            placeholder="e.g. 0771234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="flex items-center gap-2 mt-2">
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
      </div>

      {/* Confirm Button */}
      <div className="px-6 py-4 bg-white border-t border-slate-100">
        {step === 1 && (
          <button
            onClick={handleConfirm}
            disabled={phone.length < 10}
            className={`w-full py-4 rounded-2xl text-base font-black shadow-lg transition-all ${
              phone.length >= 10
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
            onClick={handleComplete}
            className="w-full py-4 rounded-2xl text-base font-black bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl active:scale-95 transition-all"
          >
            Payment Verified ✓ — Continue →
          </button>
        )}
        <p className="text-center text-xs text-slate-400 mt-2">
          Dial *165# → Pay Bill → Enter amount → Confirm
        </p>
      </div>
    </PhoneFrame>
  );
}

// ─── Receipt Template (rendered off-screen, captured as image) ───────────────

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
        padding: "0",
        borderRadius: "0",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
          padding: "28px 24px 20px",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#4f46e5", fontWeight: 900, fontSize: "18px" }}>S</span>
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: "18px", letterSpacing: "-0.5px" }}>StayEasy</div>
            <div style={{ fontSize: "11px", opacity: 0.8 }}>Student Hostel Booking · Mukono</div>
          </div>
        </div>
        <div style={{ fontSize: "13px", fontWeight: 700, opacity: 0.9 }}>OFFICIAL BOOKING RECEIPT</div>
      </div>

      {/* Stamp area */}
      <div
        style={{
          backgroundColor: "#f0fdf4",
          borderBottom: "2px dashed #86efac",
          borderTop: "2px dashed #86efac",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            backgroundColor: "#10b981",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span style={{ color: "#fff", fontWeight: 900, fontSize: "18px" }}>✓</span>
        </div>
        <div>
          <div style={{ fontWeight: 800, color: "#065f46", fontSize: "14px" }}>Payment Confirmed</div>
          <div style={{ color: "#059669", fontSize: "12px" }}>Booking Ref: #{bookingRef}</div>
        </div>
      </div>

      {/* Booking Details */}
      <div style={{ padding: "20px 24px" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
          Booking Details
        </div>
        {[
          { label: "Hostel Name", value: hostel.name },
          { label: "Location", value: hostel.location },
          { label: "Duration", value: "1 Month" },
          { label: "Check-in Date", value: bookingDate },
          { label: "Payment Method", value: "MTN Mobile Money (*165#)" },
        ].map(({ label, value }) => (
          <div
            key={label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: "8px 0",
              borderBottom: "1px solid #f1f5f9",
            }}
          >
            <span style={{ color: "#64748b", fontSize: "12px" }}>{label}</span>
            <span style={{ color: "#1e293b", fontSize: "12px", fontWeight: 600, textAlign: "right", maxWidth: "180px" }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Amount box */}
      <div
        style={{
          margin: "0 24px",
          backgroundColor: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ color: "#475569", fontSize: "13px", fontWeight: 600 }}>Total Amount Paid</span>
        <span style={{ color: "#4f46e5", fontSize: "22px", fontWeight: 900 }}>
          UGX {hostel.price.toLocaleString()}
        </span>
      </div>

      {/* Status */}
      <div style={{ padding: "16px 24px" }}>
        <div
          style={{
            backgroundColor: "#d1fae5",
            border: "1px solid #6ee7b7",
            borderRadius: "8px",
            padding: "10px 14px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ color: "#065f46", fontSize: "12px", fontWeight: 600 }}>Payment Status</span>
          <span
            style={{
              backgroundColor: "#10b981",
              color: "#fff",
              fontSize: "11px",
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: "100px",
            }}
          >
            ✓ PAID
          </span>
        </div>
      </div>

      {/* Dashed divider */}
      <div style={{ borderTop: "2px dashed #e2e8f0", margin: "4px 24px 16px" }} />

      {/* Student note */}
      <div style={{ padding: "0 24px 16px" }}>
        <div style={{ fontSize: "11px", color: "#94a3b8", lineHeight: 1.6 }}>
          This receipt serves as proof of booking for{" "}
          <strong style={{ color: "#475569" }}>{hostel.name}</strong> via StayEasy.
          Present this receipt to the hostel management upon arrival.
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: "#1e293b",
          padding: "14px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ color: "#94a3b8", fontSize: "10px" }}>stayeasy.app · Mukono, Uganda</span>
        <span style={{ color: "#94a3b8", fontSize: "10px" }}>Ref: #{bookingRef}</span>
      </div>
    </div>
  );
}

// ─── Download Icon ────────────────────────────────────────────────────────────

function IconDownload() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
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
  const [ref] = useState(() => `SE${hostel.id}${Math.floor(Math.random() * 900000 + 100000)}`);
  const [bookingDate] = useState(() => new Date().toLocaleDateString("en-UG", { year: "numeric", month: "long", day: "numeric" }));
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
      link.download = `StayEasy-Receipt-${ref}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setDownloading(false);
    }
  }, [ref]);

  return (
    <PhoneFrame>
      {/* Hidden receipt for capture */}
      <ReceiptTemplate
        innerRef={receiptRef}
        hostel={hostel}
        bookingRef={ref}
        bookingDate={bookingDate}
      />

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 bg-gradient-to-b from-white to-emerald-50">
        {/* Success Icon */}
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-200">
            <div className="text-white">
              <IconCheck />
            </div>
          </div>
          {/* Ripple rings */}
          <div className="absolute inset-0 rounded-full bg-emerald-400 opacity-20 scale-125 animate-ping" />
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-black text-slate-800 mb-1 text-center">
          Booking Successful!
        </h2>
        <p className="text-emerald-600 font-semibold text-sm mb-6">
          Welcome to {hostel.name}
        </p>

        {/* Booking Details Card */}
        <div className="w-full bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden mb-4">
          <div className="bg-emerald-500 px-4 py-3">
            <p className="text-white font-bold text-sm">Booking Confirmation</p>
            <p className="text-emerald-100 text-xs">Ref: #{ref}</p>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Hostel</span>
              <span className="text-sm font-bold text-slate-800">{hostel.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Location</span>
              <span className="text-sm text-slate-700">{hostel.location}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Date</span>
              <span className="text-sm text-slate-700">{bookingDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Amount Paid</span>
              <span className="text-sm font-black text-emerald-600">
                UGX {hostel.price.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Payment Status</span>
              <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                ✓ Paid
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Duration</span>
              <span className="text-sm text-slate-700">1 Month</span>
            </div>
          </div>
        </div>

        {/* SMS Preview */}
        <div className="w-full bg-slate-800 rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <IconMessage />
            <p className="text-slate-300 text-xs font-bold">SMS Sent to Your Phone</p>
          </div>
          <p className="text-emerald-400 text-sm font-mono leading-relaxed">
            &quot;Your StayEasy booking is confirmed. Hostel: {hostel.name}. Ref: #{ref}. Welcome!&quot;
          </p>
        </div>

        {/* Download Receipt Button */}
        <button
          onClick={handleDownload}
          disabled={downloading}
          className={`w-full py-3.5 rounded-2xl text-sm font-bold mb-3 flex items-center justify-center gap-2 transition-all border-2 ${
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

        {/* Go Home Button */}
        <button
          onClick={() => onNavigate("home")}
          className="w-full py-4 rounded-2xl text-base font-black bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl active:scale-95 transition-all"
        >
          Go Home
        </button>

        <p className="text-xs text-slate-400 mt-3 text-center">
          Save your receipt as proof of booking
        </p>
      </div>
    </PhoneFrame>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedHostel, setSelectedHostel] = useState<Hostel>(HOSTELS[0]);

  const navigate = (s: Screen) => setScreen(s);

  return (
    <>
      {screen === "home" && <HomeScreen onNavigate={navigate} />}
      {screen === "listings" && (
        <ListingsScreen onNavigate={navigate} onSelectHostel={setSelectedHostel} />
      )}
      {screen === "details" && (
        <DetailsScreen hostel={selectedHostel} onNavigate={navigate} />
      )}
      {screen === "payment" && (
        <PaymentScreen hostel={selectedHostel} onNavigate={navigate} />
      )}
      {screen === "confirmation" && (
        <ConfirmationScreen hostel={selectedHostel} onNavigate={navigate} />
      )}
    </>
  );
}
