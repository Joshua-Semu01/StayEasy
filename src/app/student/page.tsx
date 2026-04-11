"use client";

import { useState } from "react";
import Link from "next/link";

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

const HOSTELS: Hostel[] = [
  {
    id: 1,
    name: "Carleton Hostel",
    price: 1000000,
    distance: "0.3 km from UCU",
    available: true,
    rating: 4.5,
    description: "Standard and affordable hostel rooms in Mukono for UCU students. Clean, secure, and convenient location near the university.",
    amenities: ["Wi-Fi", "Security", "Water", "Electricity", "Parking"],
    images: ["https://images.unsplash.com/photo-1555854877-bab0e564d8e5?w=800"],
    location: "Mukono, near UCU Main Gate",
    rooms: 4,
    totalRooms: 20,
  },
  {
    id: 2,
    name: "Premium Hostel",
    price: 1500000,
    distance: "0.8 km from UCU",
    available: true,
    rating: 4.2,
    description: "Affordable standard hostel rooms in Mukono town. Great community atmosphere with shared kitchen and study area.",
    amenities: ["Wi-Fi", "Security", "Water", "Study Room", "Kitchen"],
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6a6f3f?w=800"],
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
    description: "Quality standard hostel accommodation near Lake Victoria in Mukono. Clean rooms with essential amenities.",
    amenities: ["Wi-Fi", "Security", "En-Suite", "Gym", "Rooftop", "Water"],
    images: ["https://images.unsplash.com/photo-1512918728678-edcb2f899f5f?w=800"],
    location: "Mukono, Lake Victoria Road",
    rooms: 0,
    totalRooms: 12,
  },
  {
    id: 4,
    name: "Highfield Hostel",
    price: 1000000,
    distance: "0.6 km from UCU",
    available: true,
    rating: 4.0,
    description: "Comfortable standard hostel rooms in a quiet and safe area in Mukono. Easy access to UCU with convenient transportation.",
    amenities: ["Wi-Fi", "Security", "Water", "Laundry", "TV Lounge"],
    images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800"],
    location: "Mukono, Canaan Road",
    rooms: 6,
    totalRooms: 18,
  },
];

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

function AmenityIcon({ name }: { name: string }) {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function StudentDashboard() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedHostel, setSelectedHostel] = useState<Hostel | null>(null);
  const [view, setView] = useState<"list" | "details">("list");

  const filteredHostels = HOSTELS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      h.location.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-3">
          <Link href="/" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <span className="text-emerald-600 font-black text-xl">S</span>
          </Link>
          <div>
            <h1 className="text-white font-bold text-lg">Student Dashboard</h1>
            <p className="text-emerald-100 text-xs">Find Your Hostel</p>
          </div>
        </div>
        <Link href="/" className="px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/30 transition">
          Logout
        </Link>
      </header>

      <main className="flex-1 p-6">
        {view === "list" ? (
          <div className="max-w-5xl mx-auto">
            {/* Search */}
            <div className="relative mb-6">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <IconSearch />
              </div>
              <input
                className="w-full bg-white rounded-xl py-3 pl-12 pr-4 text-sm text-slate-700 placeholder:text-slate-400 outline-none shadow-sm border border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                placeholder="Search hostels by name or location..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-center">
                <p className="text-2xl font-black text-emerald-600">{HOSTELS.length}</p>
                <p className="text-xs text-slate-500">Total Hostels</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-center">
                <p className="text-2xl font-black text-emerald-600">{HOSTELS.filter(h => h.available).length}</p>
                <p className="text-xs text-slate-500">Available</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-center">
                <p className="text-2xl font-black text-emerald-600">{HOSTELS.reduce((sum, h) => sum + h.rooms, 0)}</p>
                <p className="text-xs text-slate-500">Rooms Available</p>
              </div>
            </div>

            {/* Hostels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredHostels.map((hostel) => (
                <div
                  key={hostel.id}
                  className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                  onClick={() => { setSelectedHostel(hostel); setView("details"); }}
                >
                  <div
                    className="h-40 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${hostel.images[0]})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        hostel.available ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
                      }`}>
                        {hostel.available ? "Available" : "Full"}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1">
                      <IconStar />
                      <span className="text-white text-xs font-bold">{hostel.rating}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-800 text-base">{hostel.name}</h3>
                    <div className="flex items-center gap-1 mt-1 text-slate-500">
                      <IconMapPin />
                      <span className="text-xs">{hostel.distance}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <p className="text-emerald-600 font-black text-lg">UGX {hostel.price.toLocaleString()}</p>
                        <p className="text-slate-400 text-xs">/semester</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-slate-700">{hostel.rooms}/{hostel.totalRooms}</p>
                        <p className="text-xs text-slate-400">rooms free</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredHostels.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-500">No hostels found matching your search.</p>
              </div>
            )}
          </div>
        ) : (
          /* Details View */
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setView("list")}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-600 mb-4 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Hostels
            </button>

            {selectedHostel && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div
                  className="h-64 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${selectedHostel.images[0]})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h2 className="text-white font-black text-2xl">{selectedHostel.name}</h2>
                    <div className="flex items-center gap-1 mt-1 text-white/80">
                      <IconMapPin />
                      <span className="text-sm">{selectedHostel.location}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`text-sm font-semibold px-3 py-1.5 rounded-full ${
                      selectedHostel.available ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                    }`}>
                      {selectedHostel.available ? "Available" : "Fully Booked"}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Price & Rating */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-emerald-600 font-black text-3xl">UGX {selectedHostel.price.toLocaleString()}</p>
                      <p className="text-slate-400 text-sm">per semester</p>
                    </div>
                    <div className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-lg">
                      <IconStar />
                      <span className="font-bold text-amber-700">{selectedHostel.rating} Rating</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-slate-700 mb-2">About this Hostel</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{selectedHostel.description}</p>
                  </div>

                  {/* Amenities */}
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-slate-700 mb-3">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedHostel.amenities.map((amenity) => (
                        <div
                          key={amenity}
                          className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2"
                        >
                          <div className="text-emerald-500">
                            <AmenityIcon name={amenity} />
                          </div>
                          <span className="text-xs font-medium text-slate-600">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Room Availability */}
                  <div className="mb-6 bg-emerald-50 rounded-xl p-4">
                    <h3 className="text-sm font-bold text-emerald-800 mb-3">Room Availability</h3>
                    <div className="flex gap-1 flex-wrap mb-2">
                      {Array.from({ length: selectedHostel.totalRooms }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                            i < selectedHostel.rooms ? "bg-emerald-500 text-white" : "bg-red-400 text-white"
                          }`}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-emerald-600">
                      {selectedHostel.rooms} of {selectedHostel.totalRooms} rooms available
                    </p>
                  </div>

                  {/* Book Button */}
                  {selectedHostel.available && selectedHostel.rooms > 0 && (
                    <button className="w-full py-4 rounded-xl text-base font-black bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg hover:shadow-xl active:scale-95 transition-all">
                      Book This Hostel
                    </button>
                  )}
                  {(!selectedHostel.available || selectedHostel.rooms === 0) && (
                    <button className="w-full py-4 rounded-xl text-base font-black bg-slate-200 text-slate-400 cursor-not-allowed">
                      No Rooms Available
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}