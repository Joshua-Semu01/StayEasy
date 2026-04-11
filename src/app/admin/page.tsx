"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  custodianName: string;
  custodianEmail: string;
  custodianPassword: string;
}

const INITIAL_HOSTELS: Hostel[] = [
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
    description: "Affordable standard hostel rooms in Mukono town. Great community atmosphere with shared kitchen and study area.",
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

const AVAILABLE_AMENITIES = ["Wi-Fi", "Security", "Water", "Electricity", "Parking", "Study Room", "Kitchen", "En-Suite", "Gym", "Rooftop", "Laundry", "TV Lounge"];

let nextId = 3;

export default function AdminDashboard() {
  const [hostels, setHostels] = useState<Hostel[]>(INITIAL_HOSTELS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    distance: "",
    location: "",
    description: "",
    totalRooms: "",
    amenities: [] as string[],
    imageUrl: "",
    custodianName: "",
    custodianEmail: "",
    custodianPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const existingHostel = editingId ? hostels.find(h => h.id === editingId) : null;
    
    const newHostel: Hostel = {
      id: editingId || nextId++,
      name: formData.name,
      price: parseInt(formData.price) || 0,
      distance: formData.distance,
      location: formData.location,
      description: formData.description,
      totalRooms: parseInt(formData.totalRooms) || 0,
      rooms: existingHostel?.rooms || 0,
      available: true,
      rating: 4.0,
      amenities: formData.amenities,
      images: formData.imageUrl ? [formData.imageUrl] : ["https://images.unsplash.com/photo-1555854877-bab0e564d8e5?w=800"],
      custodianName: formData.custodianName,
      custodianEmail: formData.custodianEmail,
      custodianPassword: formData.custodianPassword,
    };

    if (editingId) {
      setHostels(hostels.map(h => h.id === editingId ? newHostel : h));
    } else {
      setHostels([...hostels, newHostel]);
    }

    resetForm();
    alert(editingId ? "Hostel updated successfully!" : "Hostel added successfully!");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      distance: "",
      location: "",
      description: "",
      totalRooms: "",
      amenities: [],
      imageUrl: "",
      custodianName: "",
      custodianEmail: "",
      custodianPassword: "",
    });
    setShowAddForm(false);
    setEditingId(null);
  };

  const handleEdit = (hostel: Hostel) => {
    setFormData({
      name: hostel.name,
      price: hostel.price.toString(),
      distance: hostel.distance,
      location: hostel.location,
      description: hostel.description,
      totalRooms: hostel.totalRooms.toString(),
      amenities: hostel.amenities,
      imageUrl: hostel.images[0] || "",
      custodianName: hostel.custodianName || "",
      custodianEmail: hostel.custodianEmail || "",
      custodianPassword: hostel.custodianPassword || "",
    });
    setEditingId(hostel.id);
    setShowAddForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this hostel?")) {
      setHostels(hostels.filter(h => h.id !== id));
    }
  };

  const toggleAvailability = (id: number) => {
    setHostels(hostels.map(h => h.id === id ? { ...h, available: !h.available } : h));
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
            <h1 className="text-white font-bold text-lg">Admin Dashboard</h1>
            <p className="text-blue-100 text-xs">Manage Hostels</p>
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
              { label: "Total Hostels", value: hostels.length, color: "text-orange-600" },
              { label: "Available", value: hostels.filter(h => h.available).length, color: "text-emerald-600" },
              { label: "Total Rooms", value: hostels.reduce((sum, h) => sum + h.totalRooms, 0), color: "text-indigo-600" },
              { label: "Avg Price", value: `UGX ${Math.round(hostels.reduce((sum, h) => sum + h.price, 0) / (hostels.length || 1) / 1000) * 1000}`, color: "text-amber-600" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Add/Edit Button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">Hostels</h2>
            <button
              onClick={() => { resetForm(); setShowAddForm(true); }}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Hostel
            </button>
          </div>

          {/* Add/Edit Form Modal */}
          {showAddForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="text-xl font-bold text-slate-800">{editingId ? "Edit Hostel" : "Add New Hostel"}</h3>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1">Hostel Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400"
                        placeholder="e.g. Carleton Hostel"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1">Price (UGX) *</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400"
                        placeholder="e.g. 1000000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1">Distance from UCU</label>
                      <input
                        type="text"
                        name="distance"
                        value={formData.distance}
                        onChange={handleInputChange}
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400"
                        placeholder="e.g. 0.5 km from UCU"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1">Location *</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400"
                        placeholder="e.g. Mukono, near UCU"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1">Total Rooms *</label>
                      <input
                        type="number"
                        name="totalRooms"
                        value={formData.totalRooms}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400"
                        placeholder="e.g. 20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1">Image URL</label>
                      <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 resize-none"
                      placeholder="Describe the hostel..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Amenities</label>
                    <div className="flex flex-wrap gap-2">
                      {AVAILABLE_AMENITIES.map((amenity) => (
                        <button
                          key={amenity}
                          type="button"
                          onClick={() => toggleAmenity(amenity)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                            formData.amenities.includes(amenity)
                              ? "bg-orange-500 text-white"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {amenity}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-slate-200 pt-4">
                    <h4 className="text-sm font-bold text-slate-700 mb-3">Custodian Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Custodian Name</label>
                        <input
                          type="text"
                          name="custodianName"
                          value={formData.custodianName}
                          onChange={handleInputChange}
                          className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400"
                          placeholder="e.g. Mr. John Odea"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
                        <input
                          type="email"
                          name="custodianEmail"
                          value={formData.custodianEmail}
                          onChange={handleInputChange}
                          className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400"
                          placeholder="e.g. carleton@hostel.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Password</label>
                        <input
                          type="password"
                          name="custodianPassword"
                          value={formData.custodianPassword}
                          onChange={handleInputChange}
                          className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400"
                          placeholder="Password"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex-1 py-3 border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition"
                    >
                      {editingId ? "Update Hostel" : "Add Hostel"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Hostels Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">Hostel</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">Location</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">Price</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">Rooms</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">Status</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {hostels.map((hostel) => (
                    <tr key={hostel.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-12 h-12 rounded-lg bg-cover bg-center"
                            style={{ backgroundImage: `url(${hostel.images[0]})` }}
                          />
                          <div>
                            <p className="font-medium text-slate-800">{hostel.name}</p>
                            <p className="text-xs text-slate-500">{hostel.distance}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{hostel.location}</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-800">UGX {hostel.price.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{hostel.rooms}/{hostel.totalRooms}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleAvailability(hostel.id)}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            hostel.available
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {hostel.available ? "Available" : "Unavailable"}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(hostel)}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(hostel.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {hostels.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                        No hostels added yet. Click &quot;Add Hostel&quot; to create one.
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