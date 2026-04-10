# Active Context: Next.js Starter Template

## Current State

**Template Status**: ✅ Ready for development

The template is a clean Next.js 16 starter with TypeScript and Tailwind CSS 4. It's ready for AI-assisted expansion to build any type of application.

## Recently Completed

- [x] Base Next.js 16 setup with App Router
- [x] TypeScript configuration with strict mode
- [x] Tailwind CSS 4 integration
- [x] ESLint configuration
- [x] Memory bank documentation
- [x] Recipe system for common features
- [x] **StayEasy** student hostel booking app — full 5-screen mobile UI

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | StayEasy app (all 5 screens) | ✅ Complete |
| `src/app/layout.tsx` | Root layout (StayEasy metadata) | ✅ Ready |
| `src/app/globals.css` | Global styles | ✅ Ready |
| `.kilocode/` | AI context & recipes | ✅ Ready |

## Current Application: StayEasy

A student hostel booking mobile web app for UCU Mukono students.

### Screens
1. **Home** — Logo, search bar, quick filters (price/distance/availability), stats row, featured hostel preview, "View All Hostels" CTA
2. **Listings** — Searchable/filterable hostel cards with name, price, distance, star rating, availability badge, amenity icons
3. **Details** — Image carousel, room grid availability, amenities, description, "Book Now" CTA
4. **Payment** — Booking summary, USSD *165# step-by-step instructions, SMS confirmation preview, phone input with payment verification flow
5. **Confirmation** — Animated success state, booking reference, SMS receipt, "Go Home" button

### Design Tokens
- Primary: indigo-600 → purple-700 gradient
- Success: emerald-500 (#10B981)
- Available badge: emerald-100/700
- Booked badge: red-100/600
- Font: Geist Sans
- Phone frame wrapper at 390×844px

### Data
- 4 sample hostels (UCU Gateway, Mukono Student Hub, Lakeview Residence, Canaan Heights)
- Prices: UGX 35,000–75,000/month
- All data is static / client-side only

## Quick Start Guide

### To add a new page:

Create a file at `src/app/[route]/page.tsx`:
```tsx
export default function NewPage() {
  return <div>New page content</div>;
}
```

### To add components:

Create `src/components/` directory and add components:
```tsx
// src/components/ui/Button.tsx
export function Button({ children }: { children: React.ReactNode }) {
  return <button className="px-4 py-2 bg-blue-600 text-white rounded">{children}</button>;
}
```

### To add a database:

Follow `.kilocode/recipes/add-database.md`

### To add API routes:

Create `src/app/api/[route]/route.ts`:
```tsx
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello" });
}
```

## Available Recipes

| Recipe | File | Use Case |
|--------|------|----------|
| Add Database | `.kilocode/recipes/add-database.md` | Data persistence with Drizzle + SQLite |

## Pending Improvements

- [ ] Add more recipes (auth, email, etc.)
- [ ] Add example components
- [ ] Add testing setup recipe

## Session History

| Date | Changes |
|------|---------|
| Initial | Template created with base setup |
| 2026-04-10 | StayEasy student hostel booking app built — 5 screens, full navigation, USSD/SMS payment flow |
