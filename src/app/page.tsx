"use client";

import Link from "next/link";

function RoleSelectionScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-500/10 rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-lg">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/30">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        
        <h1 className="text-white font-black text-4xl mb-2">StayEasy</h1>
        <p className="text-slate-400 text-lg font-medium mb-8">Student Hostel Management System</p>
        
        <div className="space-y-4">
          <Link
            href="/admin/login"
            className="w-full block py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:from-orange-600 hover:to-orange-700 active:scale-95 transition-all"
          >
            Admin Dashboard
            <span className="block text-xs font-normal text-orange-100 mt-1">Add and manage hostels</span>
          </Link>
          
          <Link
            href="/custodian/login"
            className="w-full block py-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition-all"
          >
            Custodian Dashboard
            <span className="block text-xs font-normal text-indigo-100 mt-1">Sign in to manage rooms</span>
          </Link>
          
          <Link
            href="/student"
            className="w-full block py-5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:from-emerald-600 hover:to-teal-700 active:scale-95 transition-all"
          >
            Student Dashboard
            <span className="block text-xs font-normal text-emerald-100 mt-1">Find hostels and available rooms</span>
          </Link>
        </div>
        
        <p className="text-slate-500 text-xs mt-10">
          Uganda Christian University · Mukono
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return <RoleSelectionScreen />;
}