"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getHostels, Hostel } from "../../../data/hostels";

const LOGO_URL = "https://assets.kiloapps.io/user_e36bb1a3-2840-4d55-a410-fda7687ef308/ddc1b378-fff3-4a8c-89b8-1c8be6fbe2d2/e23a92f2-c404-4f22-8678-b168d3c6ff5f.jpg";

interface Room {
  id: number;
  hostelId: number;
  hostelName: string;
  roomNumber: number;
  type: "single" | "double" | "shared";
  status: "available" | "occupied" | "maintenance";
  studentName?: string;
  studentPhone?: string;
  studentCourse?: string;
  checkInDate?: string;
  rentPaid: boolean;
  image: string;
}

let nextRoomId = 10;

// prettier-ignore
const ROOM_IMAGES = [
  "https://assets.kiloapps.io/user_e36bb1a3-2840-4d55-a410-fda7687ef308/ddc1b378-fff3-4a8c-89b8-1c8be6fbe2d2/20257eac-637c-42d7-9cc1-ed8e54cecb92.jpg",
  "https://assets.kiloapps.io/user_e36bb1a3-2840-4d55-a410-fda7687ef308/ddc1b378-fff3-4a8c-89b8-1c8be6fbe2d2/4e036ba3-1ae3-4c34-a3c5-f0c2874006c9.jpg",
  "https://assets.kiloapps.io/user_e36bb1a3-2840-4d55-a410-fda7687ef308/ddc1b378-fff3-4a8c-89b8-1c8be6fbe2d2/20b8d574-bf15-48f4-9155-7156496430a9.jpg",
  "https://assets.kiloapps.io/user_e36bb1a3-2840-4d55-a410-fda7687ef308/ddc1b378-fff3-4a8c-89b8-1c8be6fbe2d2/ed7f8287-8d18-43be-98ba-a1cd00d4be91.jpg",
  "https://assets.kiloapps.io/user_e36bb1a3-2840-4d55-a410-fda7687ef308/ddc1b378-fff3-4a8c-89b8-1c8be6fbe2d2/67983956-74c0-4774-832b-b509bb5ce839.jpg",
  "https://assets.kiloapps.io/user_e36bb1a3-2840-4d55-a410-fda7687ef308/ddc1b378-fff3-4a8c-89b8-1c8be6fbe2d2/dfc84048-a593-4589-9d23-21f5ec44a7f0.jpg",
];

let roomsData: Room[] = [
  { id: 1, hostelId: 1, hostelName: "Carleton Hostel", roomNumber: 101, type: "single", status: "occupied", studentName: "John Kato", studentPhone: "0771234567", studentCourse: "BSC Computer Science", checkInDate: "2026-01-15", rentPaid: true, image: ROOM_IMAGES[0] },
  { id: 2, hostelId: 1, hostelName: "Carleton Hostel", roomNumber: 102, type: "double", status: "available", rentPaid: false, image: ROOM_IMAGES[1] },
  { id: 3, hostelId: 1, hostelName: "Carleton Hostel", roomNumber: 103, type: "single", status: "occupied", studentName: "Sarah Nakato", studentPhone: "0782345678", studentCourse: "BA Law", checkInDate: "2026-02-01", rentPaid: true, image: ROOM_IMAGES[2] },
  { id: 4, hostelId: 1, hostelName: "Carleton Hostel", roomNumber: 104, type: "single", status: "available", rentPaid: false, image: ROOM_IMAGES[3] },
  { id: 5, hostelId: 1, hostelName: "Carleton Hostel", roomNumber: 105, type: "double", status: "available", rentPaid: false, image: ROOM_IMAGES[0] },
  { id: 6, hostelId: 2, hostelName: "Premium Hostel", roomNumber: 201, type: "shared", status: "maintenance", rentPaid: false, image: ROOM_IMAGES[1] },
  { id: 7, hostelId: 2, hostelName: "Premium Hostel", roomNumber: 202, type: "double", status: "occupied", studentName: "Peter Okello", studentPhone: "0753456789", studentCourse: "BSC Engineering", checkInDate: "2026-01-20", rentPaid: false, image: ROOM_IMAGES[2] },
  { id: 8, hostelId: 2, hostelName: "Premium Hostel", roomNumber: 203, type: "single", status: "available", rentPaid: false, image: ROOM_IMAGES[3] },
];

export default function CustodianDashboard() {
  const params = useParams();
  const router = useRouter();
  const hostelId = parseInt(params.id as string);
  const [hostels, setHostels] = useState<Hostel[]>(getHostels());
  
  const hostel = hostels.find(h => h.id === hostelId);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [showAssignStudent, setShowAssignStudent] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  
  useEffect(() => {
    setRooms(roomsData.filter(r => r.hostelId === hostelId));
  }, [hostelId]);
  
  const [roomForm, setRoomForm] = useState({
    roomNumber: "",
    type: "single" as "single" | "double" | "shared",
  });

  const [studentForm, setStudentForm] = useState({
    studentName: "",
    studentPhone: "",
    studentCourse: "",
    checkInDate: "",
  });

  if (!hostel) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 mb-4">Hostel not found</p>
          <Link href="/custodian/login" className="text-indigo-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRoom: Room = {
      id: nextRoomId++,
      hostelId: hostel.id,
      hostelName: hostel.name,
      roomNumber: parseInt(roomForm.roomNumber),
      type: roomForm.type,
      status: "available",
      rentPaid: false,
      image: ROOM_IMAGES[Math.floor(Math.random() * ROOM_IMAGES.length)],
    };

    roomsData = [...roomsData, newRoom];
    setRooms([...roomsData.filter(r => r.hostelId === hostelId)]);
    setRoomForm({ roomNumber: "", type: "single" });
    setShowAddRoom(false);
    alert("Room added successfully!");
  };

  const handleAssignStudent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRoom) return;

    roomsData = roomsData.map(r => {
      if (r.id === selectedRoom.id) {
        return {
          ...r,
          status: "occupied" as const,
          studentName: studentForm.studentName,
          studentPhone: studentForm.studentPhone,
          studentCourse: studentForm.studentCourse,
          checkInDate: studentForm.checkInDate || new Date().toISOString().split("T")[0],
          rentPaid: false,
        };
      }
      return r;
    });

    setStudentForm({ studentName: "", studentPhone: "", studentCourse: "", checkInDate: "" });
    setShowAssignStudent(false);
    setSelectedRoom(null);
    setRooms([...roomsData.filter(r => r.hostelId === hostelId)]);
    alert("Student assigned to room successfully!");
  };

  const handleCheckOut = (roomId: number) => {
    if (confirm("Are you sure you want to check out this student?")) {
      roomsData = roomsData.map(r => {
        if (r.id === roomId) {
          return {
            ...r,
            status: "available" as const,
            studentName: undefined,
            studentPhone: undefined,
            studentCourse: undefined,
            checkInDate: undefined,
            rentPaid: false,
          };
        }
        return r;
      });
      setRooms([...roomsData.filter(r => r.hostelId === hostelId)]);
    }
  };

  const toggleRentPaid = (roomId: number) => {
    roomsData = roomsData.map(r => {
      if (r.id === roomId) {
        return { ...r, rentPaid: !r.rentPaid };
      }
      return r;
    });
    setRooms([...roomsData.filter(r => r.hostelId === hostelId)]);
  };

  const markMaintenance = (roomId: number) => {
    roomsData = roomsData.map(r => {
      if (r.id === roomId) {
        return { ...r, status: r.status === "maintenance" ? "available" : "maintenance" };
      }
      return r;
    });
    setRooms([...roomsData.filter(r => r.hostelId === hostelId)]);
  };

  const getStatusColor = (status: Room["status"]) => {
    switch (status) {
      case "available": return "bg-emerald-100 text-emerald-700";
      case "occupied": return "bg-amber-100 text-amber-700";
      case "maintenance": return "bg-red-100 text-red-700";
    }
  };

  const logout = () => {
    router.push("/custodian/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-3">
          <Link href="/" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1">
            <img src={LOGO_URL} alt="StayEasy" className="w-full h-full object-contain" />
          </Link>
          <div>
            <h1 className="text-white font-bold text-lg">{hostel.name}</h1>
            <p className="text-blue-100 text-xs">Custodian Dashboard</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/30 transition"
        >
          Logout
        </button>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Hostel Info */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-800">{hostel.name}</h2>
                <p className="text-sm text-slate-500">{hostel.location}</p>
                <p className="text-xs text-slate-400 mt-1">Custodian: {hostel.custodianName}</p>
              </div>
              <div className="text-right">
                <p className="text-indigo-600 font-black text-2xl">UGX {hostel.price.toLocaleString()}</p>
                <p className="text-slate-400 text-xs">per semester</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Rooms", value: rooms.length, color: "text-indigo-600" },
              { label: "Available", value: rooms.filter(r => r.status === "available").length, color: "text-emerald-600" },
              { label: "Occupied", value: rooms.filter(r => r.status === "occupied").length, color: "text-amber-600" },
              { label: "Maintenance", value: rooms.filter(r => r.status === "maintenance").length, color: "text-red-600" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Add Room Button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">Rooms</h2>
            <button
              onClick={() => setShowAddRoom(true)}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Room
            </button>
          </div>

          {/* Add Room Modal */}
          {showAddRoom && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl w-full max-w-md">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="text-xl font-bold text-slate-800">Add New Room</h3>
                </div>
                <form onSubmit={handleAddRoom} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Room Number</label>
                    <input
                      type="text"
                      value={roomForm.roomNumber}
                      onChange={(e) => setRoomForm({ ...roomForm, roomNumber: e.target.value })}
                      required
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                      placeholder="e.g. 101"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Room Type</label>
                    <select
                      value={roomForm.type}
                      onChange={(e) => setRoomForm({ ...roomForm, type: e.target.value as any })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                    >
                      <option value="single">Single</option>
                      <option value="double">Double</option>
                      <option value="shared">Shared</option>
                    </select>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddRoom(false)}
                      className="flex-1 py-3 border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition"
                    >
                      Add Room
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Assign Student Modal */}
          {showAssignStudent && selectedRoom && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl w-full max-w-md">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="text-xl font-bold text-slate-800">Assign Student to Room {selectedRoom.roomNumber}</h3>
                  <p className="text-sm text-slate-500">{hostel.name}</p>
                </div>
                <form onSubmit={handleAssignStudent} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Student Name *</label>
                    <input
                      type="text"
                      value={studentForm.studentName}
                      onChange={(e) => setStudentForm({ ...studentForm, studentName: e.target.value })}
                      required
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={studentForm.studentPhone}
                      onChange={(e) => setStudentForm({ ...studentForm, studentPhone: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                      placeholder="e.g. 0771234567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Course</label>
                    <input
                      type="text"
                      value={studentForm.studentCourse}
                      onChange={(e) => setStudentForm({ ...studentForm, studentCourse: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                      placeholder="e.g. BSC Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Check-in Date</label>
                    <input
                      type="date"
                      value={studentForm.checkInDate}
                      onChange={(e) => setStudentForm({ ...studentForm, checkInDate: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => { setShowAssignStudent(false); setSelectedRoom(null); }}
                      className="flex-1 py-3 border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600 transition"
                    >
                      Assign Student
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Rooms Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">Room</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">Type</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">Status</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">Student</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">Rent</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rooms.map((room) => (
                    <tr key={room.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4">
                        <span className="font-medium text-slate-800">Room {room.roomNumber}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 capitalize">{room.type}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
                          {room.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {room.studentName ? (
                          <div>
                            <p className="text-sm font-medium text-slate-800">{room.studentName}</p>
                            <p className="text-xs text-slate-500">{room.studentCourse}</p>
                          </div>
                        ) : (
                          <span className="text-sm text-slate-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {room.status === "occupied" && (
                          <button
                            onClick={() => toggleRentPaid(room.id)}
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                              room.rentPaid
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {room.rentPaid ? "Paid" : "Unpaid"}
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {room.status === "available" && (
                            <button
                              onClick={() => { setSelectedRoom(room); setShowAssignStudent(true); }}
                              className="px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-medium hover:bg-indigo-200 transition"
                            >
                              Assign
                            </button>
                          )}
                          {room.status === "occupied" && (
                            <button
                              onClick={() => handleCheckOut(room.id)}
                              className="px-2.5 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-medium hover:bg-red-200 transition"
                            >
                              Check Out
                            </button>
                          )}
                          <button
                            onClick={() => markMaintenance(room.id)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                              room.status === "maintenance"
                                ? "bg-slate-100 text-slate-600"
                                : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                            }`}
                          >
                            {room.status === "maintenance" ? "Fix" : "Repair"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {rooms.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                        No rooms yet. Click &quot;Add Room&quot; to create one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
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