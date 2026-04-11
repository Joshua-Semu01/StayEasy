"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import html2canvas from "html2canvas";

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

type View = "list" | "details" | "payment" | "success";

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
const IconArrowLeft = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

function AmenityIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ReceiptTemplate({
  innerRef,
  hostel,
  bookingRef,
  bookingDate,
  studentName,
  studentPhone,
}: {
  innerRef: React.Ref<HTMLDivElement>;
  hostel: Hostel;
  bookingRef: string;
  bookingDate: string;
  studentName: string;
  studentPhone: string;
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
      }}
    >
      <div style={{ background: "linear-gradient(135deg,#10b981,#059669)", padding: "24px", color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: 36, height: 36, backgroundColor: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#10b981", fontWeight: 900, fontSize: 18 }}>S</span>
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18 }}>StayEasy</div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>Booking Receipt</div>
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 24px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Booking Details</div>
        {[
          { label: "Hostel", value: hostel.name },
          { label: "Location", value: hostel.location },
          { label: "Duration", value: "1 Semester" },
          { label: "Check-in Date", value: bookingDate },
          { label: "Student Name", value: studentName },
          { label: "Phone", value: studentPhone },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f1f5f9" }}>
            <span style={{ color: "#64748b", fontSize: 12 }}>{item.label}</span>
            <span style={{ color: "#1e293b", fontSize: 12, fontWeight: 600 }}>{item.value}</span>
          </div>
        ))}
      </div>

      <div style={{ margin: "0 24px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#065f46", fontSize: 13, fontWeight: 600 }}>Total Paid</span>
        <span style={{ color: "#059669", fontSize: 22, fontWeight: 900 }}>UGX {hostel.price.toLocaleString()}</span>
      </div>

      <div style={{ margin: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#065f46", fontSize: 12, fontWeight: 600 }}>Payment Status</span>
        <span style={{ backgroundColor: "#10b981", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 100 }}>PAID</span>
      </div>

      <div style={{ backgroundColor: "#1e293b", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#94a3b8", fontSize: 10 }}>Ref: #{bookingRef}</span>
        <span style={{ color: "#94a3b8", fontSize: 10 }}>stayeasy.app</span>
      </div>
    </div>
  );
}

export default function StudentDashboard() {
  const [view, setView] = useState<View>("list");
  const [selectedHostel, setSelectedHostel] = useState<Hostel | null>(null);
  const [searchValue, setSearchValue] = useState("");
  
  const [paymentStep, setPaymentStep] = useState<1 | 2 | 4>(1);
  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [downloading, setDownloading] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);
  const [bookingRef] = useState(() => `SE${Math.floor(Math.random() * 900000 + 100000)}`);
  const [bookingDate] = useState(() => new Date().toLocaleDateString("en-UG", { year: "numeric", month: "long", day: "numeric" }));

  const filteredHostels = HOSTELS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      h.location.toLowerCase().includes(searchValue.toLowerCase())
  );

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

  const handlePayment = () => {
    if (studentName && studentPhone) {
      setPaymentStep(2);
      setTimeout(() => {
        setPaymentStep(4);
        setView("success");
      }, 2000);
    }
  };

  if (view === "success" && selectedHostel) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <ReceiptTemplate
          innerRef={receiptRef}
          hostel={selectedHostel}
          bookingRef={bookingRef}
          bookingDate={bookingDate}
          studentName={studentName}
          studentPhone={studentPhone}
        />

        <header className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="text-emerald-600 font-black text-xl">S</span>
            </Link>
            <div>
              <h1 className="text-white font-bold text-lg">Student Dashboard</h1>
              <p className="text-emerald-100 text-xs">Booking Confirmed</p>
            </div>
          </div>
          <Link href="/student" className="px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/30 transition">
            Logout
          </Link>
        </header>

        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-black text-slate-800 mb-2">Booking Successful!</h2>
            <p className="text-emerald-600 font-medium mb-6">Welcome to {selectedHostel.name}</p>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-6 text-left">
              <p className="text-xs text-slate-500 mb-2">Booking Reference</p>
              <p className="text-lg font-bold text-slate-800">#{bookingRef}</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full py-3 rounded-xl font-medium bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 transition flex items-center justify-center gap-2"
              >
                {downloading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Receipt
                  </>
                )}
              </button>

              <Link
                href="/student"
                className="block w-full py-3 rounded-xl font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition"
              >
                Book Another Hostel
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (view === "payment" && selectedHostel) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <header className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="text-emerald-600 font-black text-xl">S</span>
            </Link>
            <div>
              <h1 className="text-white font-bold text-lg">Booking</h1>
              <p className="text-emerald-100 text-xs">Complete Payment</p>
            </div>
          </div>
          <button onClick={() => setView("list")} className="px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/30 transition">
            Cancel
          </button>
        </header>

        <main className="flex-1 p-6">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-6">
              <h3 className="font-bold text-slate-800">{selectedHostel.name}</h3>
              <p className="text-sm text-slate-500">{selectedHostel.location}</p>
              <p className="text-emerald-600 font-black text-xl mt-2">UGX {selectedHostel.price.toLocaleString()}</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4">Payment Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Your Name *</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-400"
                    placeholder="Full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Mobile Money Number *</label>
                  <input
                    type="tel"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-400"
                    placeholder="e.g. 0771234567"
                  />
                </div>

                {paymentStep === 2 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <p className="text-sm text-amber-700 mb-2">Processing payment...</p>
                  </div>
                )}

                {paymentStep < 2 && (
                  <button
                    onClick={handlePayment}
                    disabled={!studentName || !studentPhone}
                    className={`w-full py-3 rounded-xl font-medium transition ${
                      studentName && studentPhone
                        ? "bg-emerald-500 text-white hover:bg-emerald-600"
                        : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    Proceed to Pay
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4 bg-slate-800 rounded-xl p-4">
              <p className="text-slate-300 text-xs">How to Pay</p>
              <ol className="text-slate-400 text-xs mt-2 space-y-1">
                <li>1. Dial *165# on MTN</li>
                <li>2. Select &quot;Pay Bill&quot;</li>
                <li>3. Enter amount: {selectedHostel.price.toLocaleString()}</li>
                <li>4. Enter PIN to confirm</li>
              </ol>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (view === "details" && selectedHostel) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <header className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 sticky top-0 z-50 shadow-lg">
          <button onClick={() => setView("list")} className="flex items-center gap-2 text-white">
            <IconArrowLeft />
            <span className="font-medium">Back</span>
          </button>
        </header>

        <main className="flex-1 p-6">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${selectedHostel.images[0]})` }}
            >
              <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <div>
                  <h2 className="text-white font-black text-xl">{selectedHostel.name}</h2>
                  <div className="flex items-center gap-1 text-white/80 text-sm">
                    <IconMapPin />
                    <span>{selectedHostel.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-emerald-600 font-black text-2xl">UGX {selectedHostel.price.toLocaleString()}</p>
                  <p className="text-slate-400 text-xs">per semester</p>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded">
                  <IconStar />
                  <span className="text-amber-700 font-medium text-sm">{selectedHostel.rating}</span>
                </div>
              </div>

              <p className="text-sm text-slate-500 mb-4">{selectedHostel.description}</p>

              <div className="mb-4">
                <h4 className="text-sm font-bold text-slate-700 mb-2">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedHostel.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded text-xs">
                      <AmenityIcon />
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4 bg-emerald-50 rounded-xl p-3">
                <h4 className="text-sm font-bold text-emerald-800 mb-2">Room Availability</h4>
                <div className="flex gap-1 flex-wrap">
                  {Array.from({ length: selectedHostel.totalRooms }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                        i < selectedHostel.rooms ? "bg-emerald-500 text-white" : "bg-red-400 text-white"
                      }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-emerald-600 mt-2">{selectedHostel.rooms} of {selectedHostel.totalRooms} rooms available</p>
              </div>

              <button
                onClick={() => setView("payment")}
                disabled={!selectedHostel.available || selectedHostel.rooms === 0}
                className={`w-full py-3 rounded-xl font-medium transition ${
                  selectedHostel.available && selectedHostel.rooms > 0
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : "bg-slate-200 text-slate-400"
                }`}
              >
                {selectedHostel.available && selectedHostel.rooms > 0 ? "Book Now" : "Not Available"}
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
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
        <div className="max-w-5xl mx-auto">
          <div className="relative mb-6">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <IconSearch />
            </div>
            <input
              className="w-full bg-white rounded-xl py-3 pl-12 pr-4 text-sm outline-none shadow-sm border border-slate-200 focus:border-emerald-400"
              placeholder="Search hostels..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-center">
              <p className="text-2xl font-black text-emerald-600">{HOSTELS.length}</p>
              <p className="text-xs text-slate-500">Hostels</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-center">
              <p className="text-2xl font-black text-emerald-600">{HOSTELS.filter(h => h.available).length}</p>
              <p className="text-xs text-slate-500">Available</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-center">
              <p className="text-2xl font-black text-emerald-600">{HOSTELS.reduce((s, h) => s + h.rooms, 0)}</p>
              <p className="text-xs text-slate-500">Rooms</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredHostels.map((hostel) => (
              <div
                key={hostel.id}
                className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition cursor-pointer"
                onClick={() => { setSelectedHostel(hostel); setView("details"); }}
              >
                <div
                  className="h-36 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${hostel.images[0]})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      hostel.available ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
                    }`}>
                      {hostel.available ? "Available" : "Full"}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-800">{hostel.name}</h3>
                  <div className="flex items-center gap-1 text-slate-500 text-sm">
                    <IconMapPin />
                    <span>{hostel.distance}</span>
                  </div>
                  <div className="flex justify-between mt-3">
                    <div>
                      <p className="text-emerald-600 font-black">UGX {hostel.price.toLocaleString()}</p>
                      <p className="text-slate-400 text-xs">/semester</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-700">{hostel.rooms}/{hostel.totalRooms}</p>
                      <p className="text-xs text-slate-400">rooms</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}