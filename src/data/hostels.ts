export interface Hostel {
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

export const INITIAL_HOSTELS: Hostel[] = [
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
    images: ["https://assets.kiloapps.io/user_e36bb1a3-2840-4d55-a410-fda7687ef308/ddc1b378-fff3-4a8c-89b8-1c8be6fbe2d2/d107fb98-8dd1-46d1-945f-2718eb5d1ace.jpg"],
    location: "Mukono Town, 5 min walk to UCU",
    rooms: 2,
    totalRooms: 15,
    custodianName: "Mrs. Sarah Akello",
    custodianEmail: "premium@hostel.com",
    custodianPassword: "premium123",
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
    custodianName: "",
    custodianEmail: "",
    custodianPassword: "",
  },
];

let hostelsData: Hostel[] = [...INITIAL_HOSTELS];

export function getHostels() {
  return hostelsData;
}

export function addHostel(hostel: Hostel) {
  const exists = hostelsData.find(h => h.id === hostel.id);
  if (exists) {
    hostelsData = hostelsData.map(h => h.id === hostel.id ? hostel : h);
  } else {
    hostelsData = [...hostelsData, hostel];
  }
}

export function updateHostel(id: number, updates: Partial<Hostel>) {
  hostelsData = hostelsData.map(h => h.id === id ? { ...h, ...updates } : h);
}

export function deleteHostel(id: number) {
  hostelsData = hostelsData.filter(h => h.id !== id);
}

let nextId = 4;

export function getNextId() {
  return nextId++;
}