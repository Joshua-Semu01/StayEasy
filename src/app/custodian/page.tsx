"use client";

import { useState } from "react";
import Link from "next/link";

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
}

interface Hostel {
  id: number;
  name: string;
  totalRooms: number;
  available: number;
}

const INITIAL_HOSTELS: Hostel[] = [
  { id: 1, name: "Carleton Hostel", totalRooms: 20, available: 4 },
  { id: 2, name: "Premium Hostel", totalRooms: 15, available: 2 },
];

const INITIAL_ROOMS: Room[] = [
  { id: 1, hostelId: 1, hostelName: "Carleton Hostel", roomNumber: 101, type: "single", status: "occupied", studentName: "John Kato", studentPhone: "0771234567", studentCourse: "BSC Computer Science", checkInDate: "2026-01-15", rentPaid: true },
  { id: 2, hostelId: 1, hostelName: "Carleton Hostel", roomNumber: 102, type: "double", status: "available", rentPaid: false },
  { id: 3, hostelId: 1, hostelName: "Carleton Hostel", roomNumber: 103, type: "single", status: "occupied", studentName: "Sarah Nakato", studentPhone: "0782345678", studentCourse: "BA Law", checkInDate: "2026-02-01", rentPaid: true },
  { id: 4, hostelId: 2, hostelName: "Premium Hostel", roomNumber: 201, type: "shared", status: "maintenance", rentPaid: false },
  { id: 5, hostelId: 2, hostelName: "Premium Hostel", roomNumber: 202, type: "double", status: "occupied", studentName: "Peter Okello", studentPhone: "0753456789", studentCourse: "BSC Engineering", checkInDate: "2026-01-20", rentPaid: false },
];

export default function CustodianDashboard() {
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [hostels] = useState<Hostel[]>(INITIAL_HOSTELS);
  const [selectedHostel, setSelectedHostel] = useState<number>(0);
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [showAssignStudent, setShowAssignStudent] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  
  const [roomForm, setRoomForm] = useState({
    hostelId: "1",
    roomNumber: "",
    type: "single" as "single" | "double" | "shared",
  });

  const [studentForm, setStudentForm] = useState({
    studentName: "",
    studentPhone: "",
    studentCourse: "",
    checkInDate: "",
  });

  const filteredRooms = selectedHostel 
    ? rooms.filter(r => r.hostelId === selectedHostel)
    : rooms;

  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRoom: Room = {
      id: Date.now(),
      hostelId: parseInt(roomForm.hostelId),
      hostelName: hostels.find(h => h.id === parseInt(roomForm.hostelId))?.name || "",
      roomNumber: parseInt(roomForm.roomNumber),
      type: roomForm.type,
      status: "available",
      rentPaid: false,
    };

    setRooms([...rooms, newRoom]);
    setRoomForm({ hostelId: "1", roomNumber: "", type: "single" });
    setShowAddRoom(false);
    alert("Room added successfully!");
  };

  const handleAssignStudent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRoom) return;

    setRooms(rooms.map(r => {
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
    }));

    setStudentForm({ studentName: "", studentPhone: "", studentCourse: "", checkInDate: "" });
    setShowAssignStudent(false);
    setSelectedRoom(null);
    alert("Student assigned to room successfully!");
  };

  const handleCheckOut = (roomId: number) => {
    if (confirm("Are you sure you want to check out this student?")) {
      setRooms(rooms.map(r => {
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
      }));
    }
  };

  const toggleRentPaid = (roomId: number) => {
    setRooms(rooms.map(r => {
      if (r.id === roomId) {
        return { ...r, rentPaid: !r.rentPaid };
      }
      return r;
    }));
  };

  const markMaintenance = (roomId: number) => {
    setRooms(rooms.map(r => {
      if (r.id === roomId) {
        return { ...r, status: r.status === "maintenance" ? "available" : "maintenance" };
      }
      return r;
    }));
  };

  const getStatusColor = (status: Room["status"]) => {
    switch (status) {
      case "available": return "bg-emerald-100 text-emerald-700";
      case "occupied": return "bg-amber-100 text-amber-700";
      case "maintenance": return "bg-red-100 text-red-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-3">
          <Link href="/" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <span className="text-indigo-600 font-black text-xl">S</span>
          </Link>
          <div>
            <h1 className="text-white font-bold text-lg">Custodian Dashboard</h1>
            <p className="text-indigo-100 text-xs">Manage Rooms & Records</p>
          </div>
        </div>
        <Link href="/" className="px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/30 transition">
          Logout
        </Link>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
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

          {/* Filters & Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-600">Hostel:</label>
              <select
                value={selectedHostel}
                onChange={(e) => setSelectedHostel(Number(e.target.value))}
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400"
              >
                <option value={0}>All Hostels</option>
                {hostels.map(h => (
                  <option key={h.id} value={h.id}>{h.name}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowAddRoom(true)}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition flex items-center gap-2"
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
                    <label className="block text-sm font-medium text-slate-600 mb-1">Hostel</label>
                    <select
                      value={roomForm.hostelId}
                      onChange={(e) => setRoomForm({ ...roomForm, hostelId: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                    >
                      {hostels.map(h => (
                        <option key={h.id} value={h.id}>{h.name}</option>
                      ))}
                    </select>
                  </div>
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
                      className="flex-1 py-3 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600 transition"
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
                  <p className="text-sm text-slate-500">{selectedRoom.hostelName}</p>
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
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">Hostel</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">Room</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">Type</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">Status</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">Student</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">Rent</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRooms.map((room) => (
                    <tr key={room.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4 text-sm text-slate-600">{room.hostelName}</td>
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
                  {filteredRooms.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                        No rooms found. Click &quot;Add Room&quot; to create one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}