"use client";

import Link from "next/link";

const LOGO_URL = "https://assets.kiloapps.io/user_e36bb1a3-2840-4d55-a410-fda7687ef308/ddc1b378-fff3-4a8c-89b8-1c8be6fbe2d2/e23a92f2-c404-4f22-8678-b168d3c6ff5f.jpg";

function RoleSelectionScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://assets.kiloapps.io/user_e36bb1a3-2840-4d55-a410-fda7687ef308/ddc1b378-fff3-4a8c-89b8-1c8be6fbe2d2/0154ed98-14b7-4881-9883-e1eb7f6e070a.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-green-900/60" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-500/20 rounded-full pointer-events-none blur-xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-green-600/20 rounded-full pointer-events-none blur-xl" />
      <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-blue-500/15 rounded-full pointer-events-none blur-lg" />
      
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
        
        {/* Footer */}
        <div className="mt-12 pt-6 relative">
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
      </div>
    </div>
  );
}

export default function Home() {
  return <RoleSelectionScreen />;
}