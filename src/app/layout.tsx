import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StayEasy - Student Hostel Booking in Mukono",
  description: "Find and book affordable student hostels near UCU Mukono. Simple, fast, and student-friendly hostel booking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "Trebuchet MS, sans-serif" }} className="antialiased">
        {children}
      </body>
    </html>
  );
}