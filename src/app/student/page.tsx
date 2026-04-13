"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import html2canvas from "html2canvas";

const LOGO_URL = "https://assets.kiloapps.io/user_e36bb1a3-2840-4d55-a410-fda7687ef308/ddc1b378-fff3-4a8c-89b8-1c8be6fbe2d2/e23a92f2-c404-4f22-8678-b168d3c6ff5f.jpg";

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
    images: ["https://assets.kiloapps.io/user_e36bb1a3-2840-4d55-a410-fda7687ef308/ddc1b378-fff3-4a8c-89b8-1c8be6fbe2d2/bcf623fc-72aa-43c4-8691-6a60e6a57e77.jpg"],
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
    images: ["https://assets.kiloapps.io/user_e36bb1a3-2840-4d55-a410-fda7687ef308/ddc1b378-fff3-4a8c-89b8-1c8be6fbe2d2/d107fb98-8dd1-46d1-945f-2718eb5d1ace.jpg"],
    location: "Mukono Town, 5 min walk to UCU",
    rooms: 2,
    totalRooms: 15,
  },
  {
    id: 3,
    name: "Pameja Girls Hostel",
    price: 1500000,
    distance: "1.2 km from UCU",
    available: true,
    rating: 4.8,
    description: "Quality standard hostel accommodation near Lake Victoria in Mukono. Clean rooms with essential amenities.",
    amenities: ["Wi-Fi", "Security", "En-Suite", "Gym", "Rooftop", "Water"],
    images: ["https://assets.kiloapps.io/user_e36bb1a3-2840-4d55-a410-fda7687ef308/ddc1b378-fff3-4a8c-89b8-1c8be6fbe2d2/23160cab-6a5e-4131-8da9-c1251a8cc1df.jpg"],
    location: "Mukono, Lake Victoria Road",
    rooms: 3,
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
    images: ["https://assets.kiloapps.io/user_e36bb1a3-2840-4d55-a410-fda7687ef308/ddc1b378-fff3-4a8c-89b8-1c8be6fbe2d2/798bcdc3-ebab-4233-9700-7610e91cfd80.jpg"],
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
  amountPaid,
}: {
  innerRef: React.Ref<HTMLDivElement>;
  hostel: Hostel;
  bookingRef: string;
  bookingDate: string;
  studentName: string;
  studentPhone: string;
  amountPaid: number;
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
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="https://assets.kiloapps.io/user_e36bb1a3-2840-4d55-a410-fda7687ef308/ddc1b378-fff3-4a8c-89b8-1c8be6fbe2d2/e23a92f2-c404-4f22-8678-b168d3c6ff5f.jpg" alt="StayEasy" style={{ width: 40, height: 40, borderRadius: 10, objectFit: "cover", backgroundColor: "#fff", padding: 3 }} />
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
        <span style={{ color: "#065f46", fontSize: 13, fontWeight: 600 }}>Amount Paid</span>
        <span style={{ color: "#059669", fontSize: 22, fontWeight: 900 }}>UGX {amountPaid.toLocaleString()}</span>
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
  const [paymentType, setPaymentType] = useState<"full" | "half">("full");
  const [amountPaid, setAmountPaid] = useState(0);
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
      const amount = paymentType === "half" ? selectedHostel!.price / 2 : selectedHostel!.price;
      setAmountPaid(amount);
      setPaymentStep(2);
      setTimeout(() => {
        setPaymentStep(4);
        setView("success");
      }, 2000);
    }
  };

  if (view === "success" && selectedHostel) {
    return (
      <div className="min-h-screen flex flex-col relative">
        <img src="https://assets.kiloapps.io/user_e36bb1a3-2840-4d55-a410-fda7687ef308/ddc1b378-fff3-4a8c-89b8-1c8be6fbe2d2/9080b4ef-f6dc-4a32-bedf-3c3242db6398.jpg" alt="" className="fixed inset-0 w-full h-full object-cover -z-10" />
        <div className="fixed inset-0 bg-blue-900/80 -z-10" />
        <ReceiptTemplate
          innerRef={receiptRef}
          hostel={selectedHostel}
          bookingRef={bookingRef}
          bookingDate={bookingDate}
          studentName={studentName}
          studentPhone={studentPhone}
          amountPaid={amountPaid}
        />

        <header className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1">
              <img src={LOGO_URL} alt="StayEasy" className="w-full h-full object-contain" />
            </Link>
            <div>
              <h1 className="text-white font-bold text-lg">Student Dashboard</h1>
              <p className="text-blue-100 text-xs">Booking Confirmed</p>
            </div>
          </div>
          <Link href="/student" className="px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/30 transition">
            Logout
          </Link>
        </header>

        <main className="flex-1 flex items-center justify-center p-6 relative z-10">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-black text-white mb-2">Booking Successful!</h2>
            <p className="text-green-400 font-medium mb-6">Welcome to {selectedHostel.name}</p>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20 mb-6 text-left">
              <p className="text-xs text-blue-100 mb-2">Booking Reference</p>
              <p className="text-lg font-bold text-white">#{bookingRef}</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full py-3 rounded-xl font-medium bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50 transition flex items-center justify-center gap-2"
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
                className="block w-full py-3 rounded-xl font-medium bg-orange-500 text-white hover:bg-orange-600 transition"
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
        <header className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1">
              <img src={LOGO_URL} alt="StayEasy" className="w-full h-full object-contain" />
            </Link>
            <div>
              <h1 className="text-white font-bold text-lg">Booking</h1>
              <p className="text-blue-100 text-xs">Complete Payment</p>
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
              
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => { setPaymentType("full"); setAmountPaid(selectedHostel.price); }}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                    paymentType === "full" ? "bg-green-600 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  Full: UGX {selectedHostel.price.toLocaleString()}
                </button>
                <button
                  onClick={() => { setPaymentType("half"); setAmountPaid(selectedHostel.price / 2); }}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                    paymentType === "half" ? "bg-green-600 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  Half: UGX {(selectedHostel.price / 2).toLocaleString()}
                </button>
              </div>
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
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400"
                    placeholder="Full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Mobile Money Number *</label>
                  <input
                    type="tel"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400"
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
                        ? "bg-orange-500 text-white hover:bg-orange-600"
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
                <li>3. Enter amount: {(paymentType === "half" ? selectedHostel.price / 2 : selectedHostel.price).toLocaleString()}</li>
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
        <header className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 sticky top-0 z-50 shadow-lg">
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
                  <p className="text-green-600 font-black text-2xl">UGX {selectedHostel.price.toLocaleString()}</p>
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

              <div className="mb-4 bg-blue-50 rounded-xl p-3">
                <h4 className="text-sm font-bold text-blue-800 mb-2">Room Availability</h4>
                <div className="flex gap-1 flex-wrap">
                  {Array.from({ length: selectedHostel.totalRooms }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                        i < selectedHostel.rooms ? "bg-orange-500 text-white" : "bg-red-400 text-white"
                      }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-blue-600 mt-2">{selectedHostel.rooms} of {selectedHostel.totalRooms} rooms available</p>
              </div>

              <button
                onClick={() => setView("payment")}
                disabled={!selectedHostel.available || selectedHostel.rooms === 0}
                className={`w-full py-3 rounded-xl font-medium transition ${
                  selectedHostel.available && selectedHostel.rooms > 0
                    ? "bg-orange-500 text-white hover:bg-orange-600"
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
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-3">
          <Link href="/" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <img src={LOGO_URL} alt="StayEasy" className="w-full h-full object-contain" />
          </Link>
          <div>
            <h1 className="text-white font-bold text-lg">Student Dashboard</h1>
            <p className="text-blue-100 text-xs">Find Your Hostel</p>
          </div>
        </div>
        <Link href="/" className="px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/30 transition">
          Logout
        </Link>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          {/* UVP Section */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 mb-6 text-center shadow-xl shadow-orange-500/20">
            <h2 className="text-white font-black text-2xl mb-3">Find and Book Trusted Hostels in Mukono Easily</h2>
            <p className="text-orange-100 text-lg font-medium">Without the stress of moving around physically.</p>
            <div className="mt-4 flex justify-center gap-2">
              <span className="w-2 h-2 bg-white/50 rounded-full animate-pulse"></span>
              <span className="w-2 h-2 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-2 h-2 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <IconSearch />
            </div>
            <input
              className="w-full bg-white rounded-xl py-3 pl-12 pr-4 text-sm outline-none shadow-sm border border-slate-200 focus:border-blue-400"
              placeholder="Search hostels..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-center">
              <p className="text-2xl font-black text-green-600">{HOSTELS.length}</p>
              <p className="text-xs text-slate-500">Hostels</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-center">
              <p className="text-2xl font-black text-green-600">{HOSTELS.filter(h => h.available).length}</p>
              <p className="text-xs text-slate-500">Available</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-center">
              <p className="text-2xl font-black text-green-600">{HOSTELS.reduce((s, h) => s + h.rooms, 0)}</p>
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
                      hostel.available ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-600"
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
                      <p className="text-green-600 font-black">UGX {hostel.price.toLocaleString()}</p>
                      <p className="text-slate-400 text-xs">/semester</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-700">{hostel.rooms}/{hostel.totalRooms}</p>
                      <p className="text-xs text-slate-400">rooms</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setSelectedHostel(hostel); setView("details"); }}
                    className="w-full mt-3 py-2.5 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800')] bg-cover bg-center rounded-xl" />
          <div className="absolute inset-0 bg-blue-900/80 rounded-xl" />
          <div className="relative p-6">
            <h3 className="text-white font-bold mb-3 text-center">Contact Us</h3>
            <p className="text-blue-200 text-sm mb-4 text-center">Phone/WhatsApp: 0789781923</p>
            <div className="flex justify-center gap-4 mb-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
            </div>
            <p className="text-blue-300 text-xs text-center">
              StayEasy &copy; 2026 · Uganda Christian University · Mukono
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}