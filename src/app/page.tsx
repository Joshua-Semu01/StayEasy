"use client";

import Link from "next/link";

const LOGO_URL = "https://assets.kiloapps.io/user_e36bb1a3-2840-4d55-a410-fda7687ef308/ddc1b378-fff3-4a8c-89b8-1c8be6fbe2d2/e23a92f2-c404-4f22-8678-b168d3c6ff5f.jpg";

function RoleSelectionScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-500/10 rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-lg">
        <div className="w-24 h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30 overflow-hidden">
          <img src={LOGO_URL} alt="StayEasy Logo" className="w-full h-full object-contain bg-white" />
        </div>
        
        <h1 className="text-white font-black text-4xl mb-2">StayEasy</h1>
        <p className="text-blue-200 text-lg font-medium mb-8">Student Hostel Management System</p>
        
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
            className="w-full block py-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:from-blue-600 hover:to-blue-700 active:scale-95 transition-all"
          >
            Custodian Dashboard
            <span className="block text-xs font-normal text-blue-100 mt-1">Sign in to manage rooms</span>
          </Link>
          
          <Link
            href="/student"
            className="w-full block py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:from-orange-600 hover:to-orange-700 active:scale-95 transition-all"
          >
            Student Dashboard
            <span className="block text-xs font-normal text-orange-100 mt-1">Find hostels and available rooms</span>
          </Link>
        </div>
        
        <p className="text-blue-400 text-xs mt-10">
          Uganda Christian University · Mukono
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return <RoleSelectionScreen />;
}